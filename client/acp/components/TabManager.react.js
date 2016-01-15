var Actions         = require('../actions/Actions'),
    AwardsListView  = require('./AwardsListView.react'),
    classNames      = require('classnames'),
    Constants       = require('../Constants'),
    Donate          = require('./Donate.react'),
    Manage          = require('./Manage.react'),
    NavigationStore = require('../stores/NavigationStore'),
    React           = require('react'),
    Settings        = require('./Settings.react');

var TabManager = React.createClass({
    componentDidMount: function () {
        NavigationStore.addChangeListener(this.navigationDidUpdate);
    },

    componentWillUnmount: function () {
        NavigationStore.removeChangeListener(this.navigationDidUpdate);
    },

    getContent: function (section) {
        switch (section) {
            case Constants.SECTION_MANAGE:
                return <Manage />;
            case Constants.SECTION_AWARDS:
                return <AwardsListView />;
            case Constants.SECTION_SETTINGS:
                return <Settings />;
            case Constants.SECTION_DONATION:
                return <Donate/>;
        }
    },

    getInitialState: function () {
        return NavigationStore.getSectionsMeta();
    },

    render: function () {
        var self = this;

        function renderSection(section, index, sections) {
            var icon, sectionClass = classNames({
                'active': section.id === self.state.current
            });
            if ('icon' in section) {
                icon = <i className={'fa ' + section.icon}></i>;
            }
            return (
                <li key={section.id} className={sectionClass}>
                    <a href="#" onClick={self.sectionDidClick.bind(null, section)}>{icon} {section.label}</a>
                </li>
            );
        }

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div>
                        <ul className="nav nav-tabs">
                            {this.state.list.map(renderSection)}
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane active">
                                {this.getContent(this.state.current)}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    },

    navigationDidUpdate: function () {
        this.replaceState(NavigationStore.getSectionsMeta());
    },

    sectionDidClick: function (section) {
        Actions.setSection(section.id);
    }
});

module.exports = TabManager;
