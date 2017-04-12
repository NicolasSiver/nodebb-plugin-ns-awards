import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';

import {
    awards,
    creationActive,
    editAt,
    editAwards,
    newAwardName,
    newAwardDescription,
    newAwardPreview,
    section,
    uploadPath
} from './reducers';
import * as Sections from './sections';

export function createReduxStore(state) {
    return createStore((state, action) => {
        return {
            awards             : awards(state.awards, action),
            creationActive     : creationActive(state.creationActive, action),
            editAt             : editAt(state.editAt, action),
            editAwards         : editAwards(state.editAwards, action),
            newAwardName       : newAwardName(state.newAwardName, action),
            newAwardDescription: newAwardDescription(state.newAwardDescription, action),
            newAwardPreview    : newAwardPreview(state.newAwardPreview, action),
            section            : section(state.section, action),
            sections           : state.sections,
            uploadPath         : uploadPath(state.uploadPath, action)
        };
    }, state, applyMiddleware(ReduxThunk));
}

export function getInitialState() {
    return {
        awards: [],

        creationActive: false,
        editAt        : null,
        editAwards    : {},

        newAwardDescription: null,
        newAwardName       : null,
        newAwardPreview    : null,

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
