import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';

import {creation, creationActive, editAt, section} from './reducers';
import * as Sections from './sections';

export function createReduxStore(state) {
    return createStore((state, action)=> {
        return {
            creation      : creation(state.creation, action),
            creationActive: creationActive(state.creationActive, action),
            editAt        : editAt(state.editAt, action),
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
        section       : Sections.SECTION_AWARDS,
        sections      : [
            {label: 'Awards', icon: 'fa-trophy', id: Sections.SECTION_AWARDS},
            {label: 'Manage', id: Sections.SECTION_MANAGE},
            {label: 'Activity', id: Sections.SECTION_ACTIVITY},
            {label: 'Settings', id: Sections.SECTION_SETTINGS}
        ]
    };
}
