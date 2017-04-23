import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {} from '../../action/actions';
import Grant from '../display/grant';
import RoundButton from '../display/round-button';
import {getUserInspectGrants} from '../../model/selector/selectors';

class GrantsList extends React.Component {
    render() {
        let items;

        if (this.props.userInspectGrants === null) {
            return null;
        }

        if (this.props.userInspectGrants.length === 0) {
            items = <div>The user did not receive any awards. Maybe it's time to grant some awards?</div>;
        } else {
            items = this.props.userInspectGrants.map(grant => {
                return (
                    <div className="grants-list__item" key={grant.gid}>
                        <Grant
                            controlViews={[
                                <RoundButton
                                    icon="fa-trash"
                                    animate={true}
                                    role="danger"
                                    clickListener={() => undefined}/>
                            ]}
                            grant={grant}/>
                    </div>
                );
            });
        }

        return (
            <div className="grants-list">
                {items}
            </div>
        );
    }
}

GrantsList.propTypes = {
    userInspectGrants: PropTypes.array
};

export default connect(
    state => {
        return {
            userInspectGrants: getUserInspectGrants(state)
        };
    },
    dispatch => {
        return {};
    }
)(GrantsList);
