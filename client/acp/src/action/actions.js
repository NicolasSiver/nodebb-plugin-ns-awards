import * as ActionTypes from '../model/action-types';
import * as Constants from '../model/constants';
import {
    getAwardForGrant,
    getEditAwards,
    getGrantReason,
    getSettings,
    getUserHighlight,
    getUserInspect,
    getUsername,
    getUsers,
    getUsersForGrant
} from '../model/selector/selectors';
import SocketService from '../service/socket-service';
import UploadService from '../service/upload-service';
import {awardUidToId, compareUsers, getItemIndex} from '../util/utils';

/**
 * Flux Standard Actions
 *
 * Human-friendly. FSA actions should be easy to read and write by humans.
 * Useful. FSA actions should enable the creation of useful tools and abstractions.
 * Simple. FSA should be simple, straightforward, and flexible in its design.
 */

export function addUserForGrant(user) {
    return (dispatch, getState) => {
        let state = getState();
        let userForGrant = user ? user : getUserHighlight(state);
        let usersForGrant = getUsersForGrant(state);

        if (userForGrant) {
            if (getItemIndex(usersForGrant, userForGrant, compareUsers) !== -1) {
                window.app.alertError(`User "${userForGrant.username}" has already been added for rewarding.`, 2000);
            } else {
                dispatch(resetUsername());
                dispatch(setUserForGrant(userForGrant));
            }
        }
    };
}

export function cancelAwardEdit(aid) {
    return {
        type   : ActionTypes.AWARD_EDIT_DID_CANCEL,
        payload: aid
    };
}

export function changeSettingField(field, value) {
    return (dispatch, getState) => {
        let settings = getSettings(getState());
        dispatch(setSettings(Object.assign({}, settings, {[field]: value})));
    };
}

export function changeUserForInspect(user) {
    return (dispatch, getState) => {
        let userInspect = user ? user : getUserHighlight(getState());
        dispatch(resetUsername());
        dispatch(setUserForInspect(userInspect));
        dispatch(getUserGrants(userInspect));
    };
}

export function createApiTokenWithPrompt() {
    return dispatch => {
        window.bootbox.prompt({
            size    : 'small',
            title   : 'What is the name of new API token?',
            buttons : {
                confirm: {
                    label: 'Create'
                }
            },
            callback: name => {
                if (name && name.length > 0) {
                    SocketService.createApiToken(name)
                        .then(() => {
                            dispatch(getApiTokens());
                        })
                        .then(() => {
                            window.app.alertSuccess(`API Token "${name}" is successfully created.`);
                        })
                        .catch(error => {
                            window.app.alertError('Error did occur: ' + JSON.stringify(error));
                        });
                }
            }
        });
    };
}

export function createAward(name, description) {
    return dispatch => {
        UploadService.sharedInstance().start(Constants.NEW_AWARD_ID)
            .then(() => SocketService.createAward(name, description))
            .then(() => {
                dispatch(resetNewAward());
                dispatch(getAwardsAll());
            })
            .then(() => {
                window.app.alertSuccess(`Award "${name}" is successfully created.`);
            })
            .catch(error => {
                window.app.alertError('Error did occur: ' + JSON.stringify(error));
            });
    };
}

export function deleteAward(aid) {
    return dispatch => {
        window.bootbox.confirm({
            size    : 'small',
            title   : 'Delete Award?',
            message : 'You are going to delete an award. It will not be possible to recover an award, and every user will lose this award.',
            buttons : {
                confirm: {
                    label: 'Delete'
                }
            },
            callback: result => {
                if (result === true) {
                    SocketService.deleteAward(awardUidToId(aid))
                        .then(() => {
                            dispatch(getAwardsAll());
                        })
                        .then(() => {
                            window.app.alertSuccess('Award is deleted.');
                        })
                        .catch(error => {
                            window.app.alertError('Error did occur: ' + JSON.stringify(error));
                        });
                }
            }
        });
    };
}

export function deleteUserGrant(grant) {
    return (dispatch, getState) => {
        window.bootbox.confirm({
            size    : 'small',
            title   : 'Take Away Award?',
            message : 'You are going to take away an award from the user.',
            buttons : {
                confirm: {
                    label: 'Take Away'
                }
            },
            callback: result => {
                if (result === true) {
                    SocketService.deleteGrant(grant.gid)
                        .then(() => {
                            dispatch(getUserGrants(getUserInspect(getState())));
                        })
                        .then(() => {
                            window.app.alertSuccess('The award is taken away.');
                        })
                        .catch(error => {
                            window.app.alertError('Error did occur: ' + JSON.stringify(error));
                        });
                }
            }
        });
    };
}

export function editAward(aid, award) {
    return {
        type   : ActionTypes.AWARD_DID_EDIT,
        payload: {aid, award}
    };
}

export function getApiTokens() {
    return dispatch => {
        SocketService.getApiTokens().then(tokens => {
            dispatch(setApiTokens(tokens));
        });
    };
}

export function getAwardsAll() {
    return dispatch => {
        SocketService.getAwards().then(({awards}) => {
            dispatch(setAwards(awards));
        });
    };
}

export function getAwardGrants() {
    return dispatch => {
        SocketService.getGrants().then(({grants}) => {
            dispatch(setGrants(grants));
        });
    };
}

export function getConfig() {
    return dispatch => {
        SocketService.getConfig().then(config => {
            dispatch(setConfig(config));
        });
    };
}

export function getUserGrants({uid}) {
    return dispatch => {
        SocketService.getUserGrants(uid).then(grants => {
            dispatch(setUserForInspectGrants(grants));
        });
    };
}

export function highlightUser(direction) {
    return (dispatch, getState) => {
        let state = getState();
        let users = getUsers(state);
        let userHighlight = getUserHighlight(state);
        let position;

        if (users.length > 0) {
            position = getItemIndex(users, userHighlight, compareUsers);
            position += direction;
            if (position < 0) {
                position = users.length - 1;
            } else if (position >= users.length) {
                position = 0;
            }

            dispatch(setUserHighlight(users[position]));
        }
    };
}

export function loadSettings() {
    return dispatch => {
        SocketService.getSettings().then(settings => {
            dispatch(setSettings(settings));
        });
    };
}

export function pickAward(award) {
    return {
        type   : ActionTypes.AWARD_FOR_GRANT_DID_CHANGE,
        payload: award
    };
}

export function removeUserForGrant(user) {
    return {
        type   : ActionTypes.USER_FOR_GRANT_DID_REMOVE,
        payload: user
    };
}

export function resetAwardGrant() {
    return dispatch => {
        dispatch(pickAward(null));
        dispatch(setGrantReason(null));
        dispatch(resetUsername());
        dispatch(resetUsersForGrant());
    };
}

export function resetNewAward() {
    return {
        type: ActionTypes.NEW_AWARD_WILL_RESET
    };
}

export function resetNewAwardPreview() {
    return dispatch => {
        let loader = UploadService.sharedInstance().getLoader(Constants.NEW_AWARD_ID);
        if (loader !== undefined) {
            loader.removeAllFiles();
        }
        dispatch(setNewAwardPreview(null));
    };
}

export function resetUsername() {
    return dispatch => {
        dispatch(setUsername(null));
        dispatch(setUsers([]));
        dispatch(setUserHighlight(null));
    };
}

export function resetUsersForGrant() {
    return {
        type: ActionTypes.USERS_FOR_GRANT_WILL_RESET
    };
}

export function rewardUsers() {
    return (dispatch, getState) => {
        let state = getState();
        let award = getAwardForGrant(state);
        let users = getUsersForGrant(state);
        let reason = getGrantReason(state);

        SocketService.awardUsers(award.aid, users.map(user => user.uid), reason)
            .then(() => {
                dispatch(resetAwardGrant());
                window.app.alertSuccess('Users have been awarded.');
            })
            .catch(error => {
                window.app.alertError('Error did occur: ' + JSON.stringify(error));
            });
    };
}

export function saveAward(aid) {
    return (dispatch, getState) => {
        let awards = getEditAwards(getState());
        let {aid: id, name, desc, preview} = awards[aid];

        Promise.resolve()
            .then(() => {
                if (preview) {
                    return UploadService.sharedInstance().start(aid);
                }
            })
            .then(() => SocketService.editAward(id, name, desc))
            .then(() => {
                dispatch(cancelAwardEdit(aid));
                dispatch(getAwardsAll());
            })
            .then(() => {
                window.app.alertSuccess(`Award "${name}" is successfully updated.`);
            })
            .catch(error => {
                window.app.alertError('Error did occur: ' + JSON.stringify(error));
            });
    };
}

export function saveSettings() {
    return (dispatch, getState) => {
        let settings = getSettings(getState());
        SocketService.saveSettings(settings)
            .then(() => {
                dispatch(loadSettings());
            })
            .then(() => {
                window.app.alertSuccess('Settings are successfully saved.');
            })
            .catch(error => {
                window.app.alertError('Error did occur: ' + JSON.stringify(error));
            });
    };
}

export function searchUser() {
    return (dispatch, getState) => {
        let username = getUsername(getState());
        if (username) {
            // Search Result:
            // {matchCount: 1, pagination: PaginationMeta, pageCount: 1, timing: "0.01", users: Array[User]}
            SocketService.searchUser(username).then(({users}) => {
                // At most, show only 6 users
                dispatch(setUsers(users.slice(0, 6)));
                dispatch(setUserHighlight(users[0]));
            }).catch(error => {
                window.app.alertError('Error did occur: ' + JSON.stringify(error));
            });
        } else {
            dispatch(setUsers([]));
        }
    };
}

export function setApiTokens(tokens) {
    return {
        type   : ActionTypes.API_TOKENS_DID_UPDATE,
        payload: tokens
    };
}

export function setAwardCreationState(state) {
    return {
        type   : ActionTypes.AWARD_CREATION_STATE_DID_UPDATE,
        payload: state
    };
}

export function setAwardPreview(aid, value) {
    return {
        type   : ActionTypes.AWARD_PREVIEW_DID_CHANGE,
        payload: {aid, value}
    };
}

export function setAwards(list) {
    return {
        type   : ActionTypes.AWARDS_DID_UPDATE,
        payload: list
    };
}

export function setConfig(config) {
    return {
        type   : ActionTypes.CONFIG_DID_UPDATE,
        payload: config
    };
}

export function setGrantReason(text) {
    return {
        type   : ActionTypes.GRANT_REASON_DID_CHANGE,
        payload: text
    };
}

export function setGrants(list) {
    return {
        type   : ActionTypes.GRANTS_DID_UPDATE,
        payload: list
    };
}

export function setNewAwardDescription(value) {
    return {
        type   : ActionTypes.NEW_AWARD_DESCRIPTION_DID_CHANGE,
        payload: value
    };
}

export function setNewAwardName(value) {
    return {
        type   : ActionTypes.NEW_AWARD_NAME_DID_CHANGE,
        payload: value
    };
}

export function setNewAwardPreview(value) {
    return {
        type   : ActionTypes.NEW_AWARD_PREVIEW_DID_CHANGE,
        payload: value
    };
}

export function setSection(sectionName) {
    return {
        type   : ActionTypes.SECTION_DID_UPDATE,
        payload: sectionName
    };
}

export function setSettings(settings) {
    return {
        type   : ActionTypes.SETTINGS_DID_UPDATE,
        payload: settings
    };
}

export function setUserForGrant(user) {
    return {
        type   : ActionTypes.USER_FOR_GRANT_DID_ADD,
        payload: user
    };
}

export function setUserForInspect(user) {
    return {
        type   : ActionTypes.USER_FOR_INSPECT_DID_CHANGE,
        payload: user
    };
}

export function setUserForInspectGrants(grants) {
    return {
        type   : ActionTypes.USER_FOR_INSPECT_GRANTS_DID_CHANGE,
        payload: grants
    };
}

export function setUserHighlight(user) {
    return {
        type   : ActionTypes.USER_HIGHLIGHT_DID_CHANGE,
        payload: user
    };
}

export function setUsername(value) {
    return {
        type   : ActionTypes.USERNAME_DID_CHANGE,
        payload: value
    };
}

export function setUsers(list) {
    return {
        type   : ActionTypes.SEARCH_USERS_DID_CHANGE,
        payload: list
    };
}

export function setUserSearchFocus(state) {
    return {
        type   : ActionTypes.USER_SEARCH_FOCUS_DID_CHANGE,
        payload: state
    };
}

export function startAwardEdit(aid, award) {
    return {
        type   : ActionTypes.AWARD_EDIT_DID_START,
        payload: {aid, award}
    };
}
