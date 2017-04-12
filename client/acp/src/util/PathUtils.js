var ajaxify = require('ajaxify');

var apiAwardImages  = '/api/admin/plugins/awards/images',
    awardsDirectory = '../../uploads/awards/';

var PathUtils = {

    getApiImages: function () {
        return ajaxify.data.relative_path + apiAwardImages;
    },

    getAwardImageUri: function (imageName) {
        if (imageName) {
            return awardsDirectory + imageName;
        }
        return null;
    }
};

module.exports = PathUtils;