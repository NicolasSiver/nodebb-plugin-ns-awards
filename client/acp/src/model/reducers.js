import * as ActionTypes from './action-types';
import {compareUsers, getItemIndex} from '../util/utils';

export function awardForGrant(state, action) {
    switch (action.type) {
        case ActionTypes.AWARD_FOR_GRANT_DID_CHANGE:
            return action.payload;
        default:
            return state;
    }
}

export function awards(state, action) {
    switch (action.type) {
        case ActionTypes.AWARDS_DID_UPDATE:
            return action.payload;
        default:
            return state;
    }
}

export function creationActive(state, action) {
    switch (action.type) {
        case ActionTypes.AWARD_CREATION_STATE_DID_UPDATE:
            return action.payload;
        case ActionTypes.NEW_AWARD_WILL_RESET:
            return false;
        default:
            return state;
    }
}

export function editAt(state, action) {
    switch (action.type) {
        case ActionTypes.AWARD_EDIT_INDEX_DID_UPDATE:
            return action.payload;
        case ActionTypes.AWARD_EDIT_DID_CANCEL:
            return null;
        default:
            return state;
    }
}

export function editAwards(state, action) {
    let edits, award;

    switch (action.type) {
        case ActionTypes.AWARD_DID_EDIT:
        case ActionTypes.AWARD_EDIT_DID_START:
            edits = Object.assign({}, state);
            edits[action.payload.aid] = action.payload.award;
            return edits;
        case ActionTypes.AWARD_EDIT_DID_CANCEL:
            edits = Object.assign({}, state);
            delete edits[action.payload];
            return edits;
        case ActionTypes.AWARD_PREVIEW_DID_CHANGE:
            edits = Object.assign({}, state);
            award = Object.assign({}, edits[action.payload.aid], {preview: action.payload.value});
            edits[action.payload.aid] = award;
            return edits;
        default:
            return state;
    }
}

export function newAwardName(state, action) {
    switch (action.type) {
        case ActionTypes.NEW_AWARD_NAME_DID_CHANGE:
            return action.payload;
        case ActionTypes.NEW_AWARD_WILL_RESET:
            return null;
        default:
            return state;
    }
}

export function newAwardDescription(state, action) {
    switch (action.type) {
        case ActionTypes.NEW_AWARD_DESCRIPTION_DID_CHANGE:
            return action.payload;
        case ActionTypes.NEW_AWARD_WILL_RESET:
            return null;
        default:
            return state;
    }
}

export function newAwardPreview(state, action) {
    switch (action.type) {
        case ActionTypes.NEW_AWARD_PREVIEW_DID_CHANGE:
            return action.payload;
        case ActionTypes.NEW_AWARD_WILL_RESET:
            return null;
        default:
            return state;
    }
}

export function section(state, action) {
    switch (action.type) {
        case ActionTypes.SECTION_DID_UPDATE:
            return action.payload;
        default:
            return state;
    }
}

export function userHighlight(state, action) {
    switch (action.type) {
        case ActionTypes.USER_HIGHLIGHT_DID_CHANGE:
            return action.payload;
        default:
            return state;
    }
}

export function username(state, action) {
    switch (action.type) {
        case ActionTypes.USERNAME_DID_CHANGE:
            return action.payload;
        default:
            return state;
    }
}

export function users(state, action) {
    switch (action.type) {
        case ActionTypes.SEARCH_USERS_DID_CHANGE:
            return action.payload;
        default:
            return state;
    }
}

export function userSearchFocus(state, action) {
    switch (action.type) {
        case ActionTypes.USER_SEARCH_FOCUS_DID_CHANGE:
            return action.payload;
        default:
            return state;
    }
}

export function usersForGrant(state, action) {
    let users, index;

    switch (action.type) {
        case ActionTypes.USER_FOR_GRANT_DID_ADD:
            users = state.slice();
            users.push(action.payload);
            return users;
        case ActionTypes.USER_FOR_GRANT_DID_REMOVE:
            index = getItemIndex(state, action.payload, compareUsers);
            if (index !== -1) {
                users = state.slice();
                users.splice(index, 1);
                return users;
            }
            return state;
        default:
            return state;
    }
}

export function uploadPath(state, action) {
    switch (action.type) {
        case ActionTypes.CONFIG_DID_UPDATE:
            return action.payload.uploadPath;
        default:
            return state;
    }
}
