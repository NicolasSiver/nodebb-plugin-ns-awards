var React            = require('react'),
    LinkedStateMixin = require('react/lib/LinkedStateMixin'),

    AwardImageDrop   = require('./AwardImageDrop.react'),
    PromptView       = require('./PromptView.react'),
    Actions          = require('../actions/Actions');

var AwardCreator = React.createClass({
    mixins: [LinkedStateMixin],

    getInitialState: function () {
        return {
            action : '/api/admin/plugins/awards/images',
            dataUrl: '',
            name   : '',
            desc   : '',
            open   : false
        };
    },

    render: function () {
        var panelContent;

        if (this.state.open) {
            panelContent = <form className="create-award-form">
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
                            dataUrl={this.state.dataUrl}
                            imageDidSelect={this._imageDidSelect}
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
            panelContent = <PromptView
                label="Create Award..."
                hint="Give short and clear names for awards, treat them like medals, for example: 'Four-Way Medal' or 'Miss Universe'"
                labelDidClick={this._promptViewDidClick}/>;
        }

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    {panelContent}
                </div>
            </div>
        );
    },

    _cancelAwardForm: function () {
        this.replaceState(this.getInitialState());
    },

    _createAward: function () {
        Actions.createAward(this.state.name, this.state.desc, this.state.fileServer.id);
        this._cancelAwardForm();
    },

    _imageDidSelect: function (file, dataUrl) {
        this.setState({
            dataUrl: dataUrl
        });
    },

    _isValid: function () {
        return !!this.state.name && !!this.state.desc && !!this.state.fileServer;
    },

    _promptViewDidClick: function () {
        this.setState({
            open: true
        });
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