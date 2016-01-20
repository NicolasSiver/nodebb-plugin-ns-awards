var React          = require('react'),
    bootbox        = require('bootbox'),
    ReactPropTypes = React.PropTypes,
    classNames     = require('classnames'),
    ImageUpdate    = require('./ImageUpdate.react'),
    pathUtils      = require('../utils/PathUtils'),
    noop           = require('lodash/utility/noop'),
    Actions        = require('../actions/Actions');


var AwardsListItemView = React.createClass({
    propTypes: {
        award         : ReactPropTypes.object.isRequired,
        edit          : ReactPropTypes.bool.isRequired,
        itemWillEdit  : ReactPropTypes.func.isRequired,
        itemWillCancel: ReactPropTypes.func.isRequired,
        itemWillSave  : ReactPropTypes.func.isRequired
    },

    getInitialState: function () {
        return {
            name     : this.props.award.name,
            desc     : this.props.award.desc,
            dataUrl  : '',
            initImage: this.props.award.image
        }
    },

    render: function () {
        var self     = this,
            controls = getControls(this.props.edit),
            content  = getContent(this.props.edit),
            image    = getImage(this.props.edit);

        function getContent(edit) {
            if (edit) {
                return (
                    <div className="award-edit">
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                value={self.state.name}
                                onChange={self._nameDidChange}/>
                        </div>
                        <div>
                            <textarea className="form-control" rows="4"
                                      placeholder="Enter description"
                                      value={self.state.desc}
                                      onChange={self._descriptionDidChange}></textarea>
                        </div>
                    </div>
                );
            } else {
                return (
                    <dl>
                        <dt>{self.props.award.name}</dt>
                        <dd>{self.props.award.desc}</dd>
                    </dl>
                );
            }
        }

        function getControls(edit) {
            if (edit) {
                var controlOkClass = classNames({
                    'fa'           : true,
                    'fa-check'     : true,
                    'icon-control' : true,
                    'icon-ok'      : true,
                    'icon-disabled': !self._isValid()
                });

                return (
                    <div>
                        <i className={controlOkClass}
                           onClick={self._save}></i>
                        <i className="fa fa-remove icon-danger icon-control"
                           onClick={self._cancel}></i>
                    </div>
                );
            } else {
                return (
                    <div>
                        <i className="fa fa-pencil icon-control"
                           onClick={self.props.itemWillEdit}></i>
                        <i className="fa fa-trash-o icon-danger icon-control"
                           onClick={self._deleteItem}></i>
                    </div>
                );
            }
        }

        function getImage(edit) {
            if (edit) {
                return (
                    <ImageUpdate
                        action={pathUtils.getApiImages()}
                        currentImageUrl={self.state.initImage}
                        dataUrl={self.state.dataUrl}
                        resetImage={self._resetImage}
                        imageDidSelect={self._newImageDidSelect}
                        success={self._newImageUploadSuccess}
                        uploadProgress={noop}/>
                );
            } else {
                var imageUrl = pathUtils.getAwardImageUri(self.props.award.image);
                return (
                    <img className="img-responsive" src={imageUrl}/>
                );
            }
        }

        return (
            <li className="awards-item">
                <div className="row">
                    <div className="col-md-2">
                        {image}
                    </div>
                    <div className="col-md-8">
                        {content}
                    </div>
                    <div className="col-md-2">
                        <div className="pull-right item-controls">{controls}</div>
                    </div>
                </div>
            </li>
        );
    },

    _cancel: function () {
        this.replaceState(this.getInitialState());
        this.props.itemWillCancel();
    },

    _deleteItem: function () {
        var self = this;
        bootbox.confirm({
            size    : 'small',
            title   : 'Attention: Award Deletion',
            message : 'You are going to delete Award. Are you sure?',
            callback: function (result) {
                if (result) {
                    Actions.deleteAward(self.props.award);
                }
            }
        })
    },

    _descriptionDidChange: function (e) {
        this.setState({
            desc: e.currentTarget.value
        });
    },

    _nameDidChange: function (e) {
        this.setState({
            name: e.currentTarget.value
        });
    },

    _newImageDidSelect: function (file, dataUrl) {
        this.setState({
            dataUrl: dataUrl
        });
    },

    _newImageUploadSuccess: function (fileClient, fileServer) {
        this.setState({
            fileClient: fileClient,
            fileServer: fileServer
        });
    },

    _isValid: function () {
        return (this.state.name && this.state.name !== this.props.award.name)
            || (this.state.desc && this.state.desc !== this.props.award.desc)
            || this.state.fileServer;
    },

    _resetImage: function () {
        this.setState({
            initImage: '',
            dataUrl  : ''
        })
    },

    _save: function () {
        if (this._isValid()) {
            this.props.itemWillSave(this.state.name, this.state.desc, this.state.fileServer);
        }
    }
});

module.exports = AwardsListItemView;
