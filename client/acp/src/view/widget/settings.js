import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {saveSettings} from '../../action/actions';
import PanelControls from '../display/panel-controls';
import SectionLoading from '../display/section-loading';
import {getSettings} from '../../model/selector/selectors';

class Settings extends React.Component {

    render() {
        if (this.props.settings === null) {
            return <SectionLoading/>;
        }

        return (
            <div className="settings">
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
                                onChange={e => undefined}
                                value={this.props.settings.activityLimit}/>
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
    save    : PropTypes.func,
    settings: PropTypes.object
};

export default connect(
    state => {
        return {
            settings: getSettings(state)
        };
    },
    dispatch => {
        return {
            save: () => dispatch(saveSettings())
        };
    }
)(Settings);
