import * as ActionTypes from './action-types';

export function awards(state, action) {
    switch (action.type) {
        case ActionTypes.AWARDS_DID_UPDATE:
            return action.payload;
        default:
            return state;
    }
}

export function creation(state, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export function creationActive(state, action) {
    switch (action.type) {
        case ActionTypes.AWARD_CREATION_STATE_DID_UPDATE:
            return action.payload;
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
    let edits;

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
