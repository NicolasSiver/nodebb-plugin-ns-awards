var React            = require('react'),
    AwardImageDrop   = require('./AwardImageDrop.react'),
    Actions          = require('../actions/Actions'),
    LinkedStateMixin = require('react/lib/LinkedStateMixin');

var AwardCreator = React.createClass({
    mixins: [LinkedStateMixin],

    getInitialState: function () {
        return {
            action  : '/api/admin/plugins/awards/images',
            name    : '',
            desc    : '',
            creating: false
        };
    },

    render: function () {
        var inputState;
        if (this.state.creating) {
            inputState = <form className="create-award-form">
                <div className="media">
                    <div className="media-body" style={{width: '100%'}}>
                        <div className="form-group">
                            <label htmlFor="awardName">Name</label>
                            <input
                                type="text" className="form-control" id="awardName" placeholder="Enter name"
                                valueLink={this.linkState('name')}/>
                        </div>
                    </div>
                    <div className="media-right media-middle">
                        <AwardImageDrop
                            action={this.state.action}
                            success={this._uploadSuccess}
                            uploadProgress={this._uploadProgress}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="awardDesc">Description</label>
                    <textarea className="form-control" rows="4" id="awardDesc"
                              placeholder="Enter full description"
                              valueLink={this.linkState('desc')}></textarea>
                </div>
                <div className="pull-right controls">
                    <button
                        className="btn btn-danger"
                        onClick={this._cancelAwardForm}
                        type="button">Cancel
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={this._createAward}
                        disabled={this._isValid() ? '' : 'disabled'}
                        type="button">Add
                    </button>
                </div>
            </form>;
        } else {
            inputState = <div className="media">
                <div className="media-left media-middle">
                    <button
                        className="btn btn-success"
                        onClick={this._initAwardForm}
                        type="button">Create Award...
                    </button>
                </div>
                <div className="media-body">
                    It is important to give short and clear name, for example: 'Four-Way Medal' or 'Miss Universe'
                </div>
            </div>;
        }
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    {inputState}
                </div>
            </div>
        );
    },

    _cancelAwardForm: function () {
        this.setState({
            creating: false
        })
    },

    _createAward: function () {

    },

    _initAwardForm: function () {
        this.setState({
            creating: true
        });
    },

    _isValid: function () {
        return !!this.state.name && !!this.state.desc && !!this.state.fileServer;
    },

    _uploadProgress: function (file, progress, bytesSent) {
        //noop: could be used in future for indication
    },

    _uploadSuccess: function (fileClient, fileServer) {
        this.setState({
            fileClient: fileClient,
            fileServer: fileServer
        });
    }
});

module.exports = AwardCreator;