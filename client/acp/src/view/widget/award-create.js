import React from 'react';
import {connect} from 'react-redux';

import PromptView from '../display/prompt-view';
import {isCreationActive} from '../../model/selector/selectors';

class AwardCreator extends React.Component {
    activateCreationFrom() {
    }

    render() {
        return (
            (this.props.creationActive) ? null
                : <PromptView
                label="Create Award..."
                hint="Give short and clear names for awards, treat them like medals, for example: 'Four-Way Medal' or 'Miss Universe'"
                labelDidClick={() => this.activateCreationFrom()}/>
        );
    }
}

export default connect((state) => {
    return {
        creationActive: isCreationActive(state)
    };
})(AwardCreator);
