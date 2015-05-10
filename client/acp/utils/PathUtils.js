var awardsDirectory = '../../uploads/awards/',
    apiAwardImages  = '/api/admin/plugins/awards/images';

var PathUtils = {

    getApiImages: function () {
        return apiAwardImages;
    },

    getAwardImageUri: function (imageName) {
        if (imageName) {
            return awardsDirectory + imageName;
        }
        return null;
    }
};

module.exports = PathUtils;