import * as ActionTypes from './action-types';

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
    switch (action.type){
        case ActionTypes.AWARD_EDIT_DID_CANCEL:
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
