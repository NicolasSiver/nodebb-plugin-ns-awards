import React from 'react';
import {connect} from 'react-redux';

import {getAwardGrants} from '../../action/actions';
import Grant from '../display/grant';
import {getGrants} from '../../model/selector/selectors';

class ActivityView extends React.Component {
    componentDidMount() {
        this.props.getGrants();
    }

    render() {
        if (this.props.grants.length === 0) {
            return <span>Activity is empty. Give some awards to see an activity.</span>;
        }

        return (
            <div className="activity-view">
                {this.props.grants.map(grant => {
                    return <Grant key={grant.gid} grant={grant}/>;
                })}
            </div>
        );
    }
}

ActivityView.propTypes = {
    getGrants: React.PropTypes.func,
    grants   : React.PropTypes.array
};

export default connect(
    state => {
        return {
            grants: getGrants(state)
        };
    },
    dispatch => {
        return {
            getGrants: () => dispatch(getAwardGrants())
        };
    }
)(ActivityView);
