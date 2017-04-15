import * as ActionTypes from '../model/action-types';
import * as Constants from '../model/constants';
import {getEditAwards, getUserHighlight, getUsername, getUsers} from '../model/selector/selectors';
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
        let userForGrant = user ? user : getUserHighlight(getState());

        dispatch(resetUsername());
        dispatch(setUserForGrant(userForGrant));
    };
}

export function cancelAwardEdit(aid) {
    return {
        type   : ActionTypes.AWARD_EDIT_DID_CANCEL,
        payload: aid
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
                window.app.alertError('Error did occur: ' + error);
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

export function editAward(aid, award) {
    return {
        type   : ActionTypes.AWARD_DID_EDIT,
        payload: {aid, award}
    };
}

export function getAwardsAll() {
    return dispatch => {
        SocketService.getAwards().then(({awards}) => {
            dispatch(setAwards(awards));
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

export function pickAward(award) {
    return {
        type   : ActionTypes.AWARD_FOR_GRANT_DID_CHANGE,
        payload: award
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
                window.app.alertError('Error did occur: ' + error);
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
                window.app.alertError('Error did occur: ' + error);
            });
        } else {
            dispatch(setUsers([]));
        }
    };
}

export function setAwardCreationState(state) {
    return {
        type   : ActionTypes.AWARD_CREATION_STATE_DID_UPDATE,
        payload: state
    };
}

export function setAwardEditIndex(index) {
    return {
        type   : ActionTypes.AWARD_EDIT_INDEX_DID_UPDATE,
        payload: index
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

export function setUserForGrant(user) {
    return {
        type   : ActionTypes.USER_FOR_GRANT_DID_ADD,
        payload: user
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

export function startAwardEdit(aid, award) {
    return {
        type   : ActionTypes.AWARD_EDIT_DID_START,
        payload: {aid, award}
    };
}
