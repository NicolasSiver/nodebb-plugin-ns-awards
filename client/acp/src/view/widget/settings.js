import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import SectionLoading from '../display/section-loading';
import {getSettings} from '../../model/selector/selectors';

class Settings extends React.Component {

    render() {
        if (this.props.settings === null) {
            return <SectionLoading/>;
        }

        return (
            <div className="settings">
            </div>
        );
    }

}

Settings.propTypes = {
    settings: PropTypes.object
};

export default connect(
    state => {
        return {
            settings: getSettings(state)
        };
    },
    dispatch => {
        return {};
    }
)(Settings);
