var React        = require('react'),
    ReactTooltip = require('react-tooltip');

var UserAwardList = React.createClass({
    propTypes: {
        itemDidSelect: React.PropTypes.func.isRequired,
        items        : React.PropTypes.array.isRequired
    },

    render: function () {
        return (
            <div className="awards-granted">
                {this.props.items.map(function (grant, index) {
                    var id = 'award' + grant.gid;
                    return (
                        <div onClick={this.props.itemDidSelect.bind(this, grant)} key={index} className="award-badge" data-tip data-for={id}>
                            <img className="img-responsive" src={grant.award.picture}/>
                            <ReactTooltip id={id}>
                                <p><b>{grant.award.name}</b></p>
                                <p>{grant.reason}</p>
                                <p>Awarded by {grant.fromuser.username}</p>
                            </ReactTooltip>
                        </div>
                    );
                }, this)}
            </div>
        );
    }

});

module.exports = UserAwardList;
