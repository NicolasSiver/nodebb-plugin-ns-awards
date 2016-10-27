import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';

import {creation, creationActive, section} from './reducers';
import * as Sections from './sections';

export function createReduxStore(state) {
    return createStore((state, action)=> {
        return {
            creation      : creation(state.creation, action),
            creationActive: creationActive(state.creationActive, action),
            section       : section(state.section, action),
            sections      : state.sections
        };
    }, state, applyMiddleware(ReduxThunk));
}

export function getInitialState() {
    return {
        creation: {
            name       : null,
            description: null
        },

        creationActive: false,
        section       : Sections.SECTION_AWARDS,
        sections      : [
            {label: 'Activity', id: Sections.SECTION_ACTIVITY},
            {label: 'Awards', icon: 'fa-trophy', id: Sections.SECTION_AWARDS},
            {label: 'Manage', id: Sections.SECTION_MANAGE},
            {label: 'Settings', id: Sections.SECTION_SETTINGS}
        ]
    };
}
