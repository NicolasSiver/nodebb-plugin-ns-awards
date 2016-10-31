import React from 'react';
import {connect} from 'react-redux';

import {getAwardsAll} from './action/actions';
import AwardCreate from './view/widget/award-create';
import Donate from './view/display/donate';
import TabManager from './view/widget/tab-manager';

class AwardsAcp extends React.Component {
    componentDidMount() {
        this.props.dispatch(getAwardsAll());
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

export default connect()(AwardsAcp);
