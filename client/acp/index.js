define('admin/plugins/awards', [], function () {
    return {
        init: function () {
            var React     = require('react'),
                ReactDom  = require('react-dom'),
                AwardsApp = require('./components/AwardsApp.react');

            ReactDom.render(
                <AwardsApp />,
                document.getElementsByClassName('manage-awards')[0]
            );
        }
    };
});