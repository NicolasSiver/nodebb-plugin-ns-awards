define('admin/plugins/awards', function () {
    var Awards    = {},
        React     = require('react'),
        AwardsApp = require('./components/AwardsApp.react');


    Awards.init = function () {
        React.render(
            <AwardsApp />,
            document.getElementById('manageAwardsApp')
        );
    };

    return Awards;
});