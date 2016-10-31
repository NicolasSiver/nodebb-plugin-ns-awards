/**
 * Flux Standard Actions
 *
 * Human-friendly. FSA actions should be easy to read and write by humans.
 * Useful. FSA actions should enable the creation of useful tools and abstractions.
 * Simple. FSA should be simple, straightforward, and flexible in its design.
 */
import * as ActionTypes from '../model/action-types';

export function cancelAwardEdit() {
    return {
        type: ActionTypes.AWARD_EDIT_DID_CANCEL
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

export function setSection(sectionName) {
    return {
        type   : ActionTypes.SECTION_DID_UPDATE,
        payload: sectionName
    };
}
