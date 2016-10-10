import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';

import {creation, creationActive, section} from './reducers';
import * as Sections from './sections';

export function createReduxStore(state) {
    return createStore((state, action)=> {
        return {
            creation: creation(state.creation, action),
            creationActive: creationActive(state.creationActive, action),
            section: section(state.section, action)
        };
    }, state, applyMiddleware(ReduxThunk));
}

export function getInitialState() {
    return {
        creation: {
            name: null,
            description: null
        },
        creationActive: false,
        section: Sections.SECTION_AWARDS
    };
}
