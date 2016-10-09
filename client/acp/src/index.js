import Inferno from 'inferno';
import InfernoDom from 'inferno-dom';

import AwardsAcp from './awards-acp';


export default {
    init: function () {
        InfernoDom.render(
            <AwardsAcp />,
            document.getElementsByClassName('manage-awards')[0]
        );
    }
};
