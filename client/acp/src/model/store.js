import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';

import {awards, creation, creationActive, editAt, editAwards, section} from './reducers';
import * as Sections from './sections';

export function createReduxStore(state) {
    return createStore((state, action)=> {
        return {
            awards        : awards(state.awards, action),
            creation      : creation(state.creation, action),
            creationActive: creationActive(state.creationActive, action),
            editAt        : editAt(state.editAt, action),
            editAwards    : editAwards(state.editAwards, action),
            section       : section(state.section, action),
            sections      : state.sections
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
        section       : Sections.SECTION_AWARDS,
        sections      : [
            {label: 'Awards', icon: 'fa-trophy', id: Sections.SECTION_AWARDS},
            {label: 'Manage', id: Sections.SECTION_MANAGE},
            {label: 'Activity', id: Sections.SECTION_ACTIVITY},
            {label: 'Settings', id: Sections.SECTION_SETTINGS}
        ]
    };
}
