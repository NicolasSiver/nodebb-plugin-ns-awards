import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {getAwardsAll, getConfig} from './action/actions';
import AwardCreate from './view/widget/award-create';
import Donate from './view/display/donate';
import TabManager from './view/widget/tab-manager';

class AwardsAcp extends React.Component {
    componentDidMount() {
        this.props.getConfig();
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
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <Donate />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AwardsAcp.propTypes = {
    getAwards: PropTypes.func,
    getConfig: PropTypes.func
};

export default connect(
    null,
    dispatch => {
        return {
            getAwards: () => dispatch(getAwardsAll()),
            getConfig: () => dispatch(getConfig())
        };
    }
)(AwardsAcp);
