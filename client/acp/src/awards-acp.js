import Component from 'inferno-component';

import AwardCreate from './view/widget/award-create';
import Donate from './view/display/donate';
import TabManager from './view/widget/tab-manager';

export default class AwardsAcp extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-8">
                    <TabManager />
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
