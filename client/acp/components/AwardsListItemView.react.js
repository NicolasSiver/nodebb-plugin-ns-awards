var React          = require('react'),
    bootbox        = require('bootbox'),
    ReactPropTypes = React.PropTypes,
    classNames     = require('classnames'),
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
            name: this.props.award.name,
            desc: this.props.award.desc
        }
    },

    render: function () {
        var imageUrl = "../../uploads/awards/" + this.props.award.image, self = this;
        var controls = getControls(this.props.edit),
            content  = getContent(this.props.edit);

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
                        <i className="fa fa-remove icon-danger icon-control"
                           onClick={self._deleteItem}></i>
                    </div>
                );
            }
        }

        return (
            <li className="awards-item">
                <div className="row">
                    <div className="col-md-2"><img className="img-responsive" src={imageUrl}/></div>
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
        this.setState(this.getInitialState());
        this.props.itemWillCancel();
    },

    _deleteItem: function () {
        var self = this;
        bootbox.confirm({
            size    : 'small',
            title   : 'Attention',
            message : 'Are you sure?',
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

    _isValid: function () {
        return (this.state.name && this.state.name !== this.props.award.name)
            || (this.state.desc && this.state.desc !== this.props.award.desc);
    },

    _save: function () {
        this.props.itemWillSave(this.state.name, this.state.desc);
    }
});

module.exports = AwardsListItemView;