import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {getApiTokens, getAwardsAll, getConfig, loadSettings} from './action/actions';
import AwardCreate from './view/widget/award-create';
import TabManager from './view/widget/tab-manager';

class AwardsAcp extends React.Component {
    componentDidMount() {
        this.props.getConfig();
        this.props.getSettings();
        this.props.getApiTokens();
        this.props.getAwards();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <TabManager />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <AwardCreate />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AwardsAcp.propTypes = {
    getApiTokens: PropTypes.func,
    getAwards   : PropTypes.func,
    getConfig   : PropTypes.func,
    getSettings : PropTypes.func
};

export default connect(
    null,
    dispatch => {
        return {
            getApiTokens: () => dispatch(getApiTokens()),
            getAwards   : () => dispatch(getAwardsAll()),
            getConfig   : () => dispatch(getConfig()),
            getSettings : () => dispatch(loadSettings())
        };
    }
)(AwardsAcp);
