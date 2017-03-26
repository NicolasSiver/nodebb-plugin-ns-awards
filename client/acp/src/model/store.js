import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';

import {
    awards,
    creation,
    creationActive,
    editAt,
    editAwards,
    newAwardName,
    newAwardDescription,
    section,
    uploadPath
} from './reducers';
import * as Sections from './sections';

export function createReduxStore(state) {
    return createStore((state, action) => {
        return {
            awards             : awards(state.awards, action),
            creation           : creation(state.creation, action),
            creationActive     : creationActive(state.creationActive, action),
            editAt             : editAt(state.editAt, action),
            editAwards         : editAwards(state.editAwards, action),
            newAwardName       : newAwardName(state.newAwardName, action),
            newAwardDescription: newAwardDescription(state.newAwardDescription, action),
            section            : section(state.section, action),
            sections           : state.sections,
            uploadPath         : uploadPath(state.uploadPath, action)
        };
    }, state, applyMiddleware(ReduxThunk));
}

export function getInitialState() {
    return {
        awards: [],

        creation: {
            name       : null,
            description: null
        },

        creationActive: false,
        editAt        : null,
        editAwards    : {},

        newAwardName       : null,
        newAwardDescription: null,

        section: Sections.SECTION_AWARDS,

        sections: [
            {label: 'Awards', icon: 'fa-trophy', id: Sections.SECTION_AWARDS},
            {label: 'Manage', id: Sections.SECTION_MANAGE},
            {label: 'Activity', id: Sections.SECTION_ACTIVITY},
            {label: 'Settings', id: Sections.SECTION_SETTINGS}
        ],

        uploadPath: null
    };
}
