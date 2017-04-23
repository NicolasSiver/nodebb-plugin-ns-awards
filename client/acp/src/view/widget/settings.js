import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {changeSettingField, saveSettings} from '../../action/actions';
import PanelControls from '../display/panel-controls';
import SectionLoading from '../display/section-loading';
import {getSettings} from '../../model/selector/selectors';
import * as SettingFields from '../../model/setting-fields';

class Settings extends React.Component {

    render() {
        if (this.props.settings === null) {
            return <SectionLoading/>;
        }

        return (
            <div className="settings">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="maxRewardsPerAccount">Max Rewards Per Account</label>
                            <input
                                className="form-control"
                                type="text"
                                id="maxRewardsPerAccount"
                                onChange={e => this.props.changeField(SettingFields.MAX_REWARDS_PER_ACCOUNT, e.target.value)}
                                value={this.props.settings[SettingFields.MAX_REWARDS_PER_ACCOUNT]}/>
                            <p className="help-block">A number of rewards to inject in an account. Specify -1 to remove
                                a limit, or 0 to disable a feature.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="maxRewardsPerPost">Max Rewards Per Post</label>
                            <input
                                className="form-control"
                                type="text"
                                id="maxRewardsPerPost"
                                onChange={e => this.props.changeField(SettingFields.MAX_REWARDS_PER_POST, e.target.value)}
                                value={this.props.settings[SettingFields.MAX_REWARDS_PER_POST]}/>
                            <p className="help-block">A number of rewards to inject in a post. Specify -1 to remove a
                                limit, or 0 to disable a feature.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="activityLimit">Activity Limit</label>
                            <input
                                className="form-control"
                                type="text"
                                id="activityLimit"
                                onChange={e => this.props.changeField(SettingFields.ACTIVITY_LIMIT, e.target.value)}
                                value={this.props.settings[SettingFields.ACTIVITY_LIMIT]}/>
                            <p className="help-block">A number of records to process in the Rewards section.</p>
                        </div>
                    </div>
                </div>

                <PanelControls
                    disableCancel={true}
                    labelSuccess="Save"
                    valid={true}
                    successDidClick={() => this.props.save()}/>
            </div>
        );
    }

}

Settings.propTypes = {
    changeField: PropTypes.func,
    save       : PropTypes.func,
    settings   : PropTypes.object
};

export default connect(
    state => {
        return {
            settings: getSettings(state)
        };
    },
    dispatch => {
        return {
            changeField: (field, value) => dispatch(changeSettingField(field, value)),
            save       : () => dispatch(saveSettings())
        };
    }
)(Settings);
