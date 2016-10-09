import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';

import {creation, section} from './reducers';
import * as Sections from './sections';

export function createReduxStore(state) {
    return createStore((state, action)=> {
        return {
            creation: creation(state, action),
            section: section(state, action)
        };
    }, state, applyMiddleware(ReduxThunk));
}

export function getInitialState() {
    return {
        creation: {
            active: false,
            name: null,
            description: null
        },
        section: Sections.SECTION_AWARDS
    };
}
