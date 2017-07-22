import {createSelector} from 'reselect';

import {getAwardForGrant, getGrantReason, getUsersForGrant} from './selectors';

export default function isAwardGrantValid() {
    return createSelector(
        getAwardForGrant, getGrantReason, getUsersForGrant,
        (award, reason, users) => {
            return !!reason && reason.length > 0 && award !== null && users.length > 0;
        }
    );
}
