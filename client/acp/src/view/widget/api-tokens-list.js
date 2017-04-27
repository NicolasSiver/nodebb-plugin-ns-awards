import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {createApiTokenWithPrompt} from '../../action/actions';
import RoundButton from '../display/round-button';

class ApiTokensList extends React.Component {
    render() {
        return (
            <div className="api-tokens-list">
                <h5>API Tokens</h5>
                <p>This is a list of API tokens. Tokens provide an access to Awards API for other plugins.
                    Remove any tokens that you do not recognize.</p>
                <div>
                    <RoundButton
                        icon="fa-plus"
                        animate={false}
                        role="active"
                        clickListener={() => this.props.createToken()}/> Create API Token...
                </div>
            </div>
        );
    }
}

ApiTokensList.propTypes = {
    createToken: PropTypes.func
};

export default connect(
    state => {
        return {};
    },
    dispatch => {
        return {
            createToken: () => dispatch(createApiTokenWithPrompt())
        };
    }
)(ApiTokensList);
