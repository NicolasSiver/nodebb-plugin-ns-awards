import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {setAwardCreationState} from '../../action/actions';
import NewAwardForm from '../widget/new-award-form';
import PromptView from '../display/prompt-view';
import {isCreationActive} from '../../model/selector/selectors';

class AwardCreate extends React.Component {

    render() {
        return (
            (this.props.creationActive) ? <NewAwardForm />
                : <PromptView
                label="Create Award..."
                hint="Give short and clear names for awards, treat them like medals, for example: 'Four-Way Medal' or 'Miss Universe'"
                labelDidClick={() => this.props.activateForm()}/>
        );
    }
}

AwardCreate.propTypes = {
    activateForm  : PropTypes.func,
    creationActive: PropTypes.bool
};

export default connect(
    (state) => {
        return {
            creationActive: isCreationActive(state)
        };
    },
    (dispatch) => {
        return {
            activateForm: () => dispatch(setAwardCreationState(true))
        };
    }
)(AwardCreate);
