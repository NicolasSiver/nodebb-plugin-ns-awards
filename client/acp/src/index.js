import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import AwardsAcp from './awards-acp';
import {createReduxStore, getInitialState} from './model/store';


export default {
    init: function () {
        let store = createReduxStore(getInitialState());
        ReactDom.render(
            <Provider store={ store }>
                <AwardsAcp />
            </Provider>,
            document.getElementsByClassName('manage-awards')[0]
        );
    }
};
