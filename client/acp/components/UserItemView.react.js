var Actions        = require('../actions/Actions'),
    Avatar         = require('./Avatar.react'),
    classNames     = require('classnames'),
    PanelControls  = require('./PanelControls.react'),
    React          = require('react'),
    ReactPropTypes = React.PropTypes,
    UserAwardList  = require('./UserAwardList.react');

var UserItemView = React.createClass({
    propTypes: {
        user: ReactPropTypes.object.isRequired
    },

    awardDidSelect: function (grant) {
        Actions.editReward(this.props.user, grant);
    },

    closeDidClick: function () {
        (this.isEditMode()) ? Actions.cancelEditReward(this.props.user) : Actions.unselectUser(this.props.user);
    },

    getAvatarOverlayComponent: function (award) {
        return (
            <div className="award-overlay">
                <img className="img-responsive" src={award.picture}/>
            </div>
        );
    },

    getDetailsComponent: function () {
        return (
            <div>
                <div className="stats">
                    <div className="metric">
                        <i className="fa fa-file-o"></i> {this.props.user.postcount}
                    </div>
                    <div className="metric">
                        <i className="fa fa-star-o"></i> {this.props.user.reputation}
                    </div>
                    <div className="metric">
                        <i className="fa fa-calendar-o"></i> {new Date(this.props.user.joindate).toDateString()}
                    </div>
                </div>
                <div className="awards">
                    <UserAwardList
                        itemDidSelect={this.awardDidSelect}
                        items={this.props.user.awards}/>
                </div>
            </div>
        );
    },

    getEditComponent: function (grant) {
        return (
            <div>
                <p>Awarded by {grant.fromuser.username}</p>
                <p>Date: {new Date(grant.createtime).toDateString()}</p>
                <textarea
                    className="form-control" rows="2"
                    placeholder="Reason"
                    value={grant.reason}
                    onChange={this.reasonDidChange}></textarea>
                <PanelControls
                    labelCancel="Delete"
                    labelSuccess="Save"
                    cancelDidClick={Actions.deleteGrant.bind(Actions, this.props.user, grant)}
                    successDidClick={Actions.saveGrant.bind(Actions, this.props.user, grant)}
                    valid={this.isSaveAllowed}/>
            </div>
        );
    },

    isEditMode: function () {
        return !!this.props.user.rewardEdit;
    },

    isSaveAllowed: function () {
        return this.props.user.rewardEdit.reason.length > 0;
    },

    reasonDidChange: function (e) {
        Actions.editRewardReason(this.props.user, e.target.value);
    },

    render: function () {
        var detailsComponent, editComponent, title, avatarOverlayComponent, avatarOverlayClass;

        if (!this.isEditMode()) {
            detailsComponent = this.getDetailsComponent();
            title = this.props.user.username;
        } else {
            avatarOverlayComponent = this.getAvatarOverlayComponent(this.props.user.rewardEdit.award);
            editComponent = this.getEditComponent(this.props.user.rewardEdit);
            title = this.props.user.rewardEdit.award.name;
        }

        avatarOverlayClass = classNames('avatar-overlay', {'overlay-active': this.isEditMode()});

        return (
            <div className="user">
                <div className={avatarOverlayClass}>
                    <Avatar user={this.props.user}/>
                    {avatarOverlayComponent}
                </div>
                <div className="details">
                    <h5>{title}</h5>
                    {detailsComponent}
                    {editComponent}
                </div>
                <div className="user-close">
                    <i className="fa fa-times icon-danger icon-control"
                       onClick={this.closeDidClick}></i>
                </div>
            </div>
        );
    }

});

module.exports = UserItemView;
