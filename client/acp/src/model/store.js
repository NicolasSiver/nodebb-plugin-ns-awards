import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';

import {
    awardForGrant,
    awards,
    creationActive,
    editAwards,
    grantReason,
    grants,
    newAwardName,
    newAwardDescription,
    newAwardPreview,
    section,
    userHighlight,
    userInspect,
    userInspectGrants,
    username,
    users,
    userSearchFocus,
    usersForGrant,
    uploadPath
} from './reducers';
import * as Sections from './sections';

export function createReduxStore(state) {
    return createStore((state, action) => {
        return {
            awardForGrant      : awardForGrant(state.awardForGrant, action),
            awards             : awards(state.awards, action),
            creationActive     : creationActive(state.creationActive, action),
            editAwards         : editAwards(state.editAwards, action),
            grantReason        : grantReason(state.grantReason, action),
            grants             : grants(state.grants, action),
            newAwardName       : newAwardName(state.newAwardName, action),
            newAwardDescription: newAwardDescription(state.newAwardDescription, action),
            newAwardPreview    : newAwardPreview(state.newAwardPreview, action),
            section            : section(state.section, action),
            sections           : state.sections,
            userHighlight      : userHighlight(state.userHighlight, action),
            userInspect        : userInspect(state.userInspect, action),
            userInspectGrants  : userInspectGrants(state.userInspectGrants, action),
            username           : username(state.username, action),
            users              : users(state.users, action),
            userSearchFocus    : userSearchFocus(state.userSearchFocus, action),
            usersForGrant      : usersForGrant(state.usersForGrant, action),
            uploadPath         : uploadPath(state.uploadPath, action)
        };
    }, state, applyMiddleware(ReduxThunk));
}

export function getInitialState() {
    return {
        awardForGrant: null,
        awards       : null,

        creationActive: false,
        editAwards    : {},
        grantReason   : null,
        grants        : null,

        newAwardDescription: null,
        newAwardName       : null,
        newAwardPreview    : null,

        section: Sections.SECTION_AWARDS,

        sections: [
            {label: 'Awards', icon: 'fa-trophy', id: Sections.SECTION_AWARDS},
            {label: 'Granting', id: Sections.SECTION_GRANTING},
            {label: 'Management', id: Sections.SECTION_MANAGEMENT},
            {label: 'Rewards', id: Sections.SECTION_REWARDS},
            {label: 'Settings', id: Sections.SECTION_SETTINGS}
        ],

        userHighlight    : null,
        userInspect      : null,
        userInspectGrants: null,
        username         : null,
        users            : [],
        userSearchFocus  : null,
        usersForGrant    : [],

        uploadPath: null
    };
}
