var React              = require('react'),
    AwardsListItemView = require('./AwardsListItemView.react'),
    AwardsStore        = require('../stores/AwardsStore'),
    ReactPropTypes     = React.PropTypes,
    Actions            = require('../actions/Actions');

function getAwards() {
    return {
        awards      : AwardsStore.getAwards(),
        editPosition: -1
    };
}

var AwardsListView = React.createClass({
    componentDidMount: function () {
        AwardsStore.addChangeListener(this.awardsDidChange);
        Actions.getAwards();
    },

    componentWillUnmount: function () {
        AwardsStore.removeChangeListener(this.awardsDidChange);
    },

    awardsDidChange: function () {
        this.setState(getAwards());
    },

    getInitialState: function () {
        return getAwards();
    },

    render: function () {
        var noItems, self = this;

        if (this.state.awards.length == 0) {
            noItems = <li>No Awards. Why not create a new one?</li>;
        }

        function renderItem(award, index, awards) {
            return <AwardsListItemView
                key={award.aid}
                edit={index === self.state.editPosition}
                award={award}
                itemWillEdit={self._itemWillEdit.bind(null, index)}
                itemWillCancel={self._itemWillCancel}
                itemWillSave={self._itemWillSave.bind(null, index, award.aid)}/>
        }

        return (
            <div>
                <ul className="awards-list">
                    {noItems}
                    {this.state.awards.map(renderItem)}
                </ul>
            </div>
        );
    },

    _itemWillCancel: function () {
        this.setState({
            editPosition: -1
        })
    },

    _itemWillEdit: function (index) {
        this.setState({
            editPosition: index
        })
    },

    _itemWillSave: function (index, aid, name, description, file) {
        Actions.editAward(aid, name, description, file);
    }
});

module.exports = AwardsListView;
