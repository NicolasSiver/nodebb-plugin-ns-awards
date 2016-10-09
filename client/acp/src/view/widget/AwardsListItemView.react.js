var React       = require('react'),
    bootbox     = require('bootbox'),
    classNames  = require('classnames'),
    ImageUpdate = require('./ImageUpdate.react'),
    pathUtils   = require('../utils/PathUtils'),
    noop        = require('lodash/noop'),
    Actions     = require('../actions/Actions');


var AwardsListItemView = React.createClass({
    propTypes: {
        award         : React.PropTypes.object.isRequired,
        edit          : React.PropTypes.bool.isRequired,
        itemWillEdit  : React.PropTypes.func.isRequired,
        itemWillCancel: React.PropTypes.func.isRequired,
        itemWillSave  : React.PropTypes.func.isRequired
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
                <div className="awards-item__preview">
                    {image}
                </div>
                <div className="awards-item__info">
                    {content}
                </div>
                <div className="awards-item__controls">
                    <div className="pull-right item-controls">{controls}</div>
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
            message : 'You are going to delete "' + self.props.award.name + '" award. Are you sure?',
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