var awardsDirectory = '../../uploads/awards/';

var PathUtils = {
    getAwardImageUri: function (imageName) {
        if (imageName) {
            return awardsDirectory + imageName;
        }
        return null;
    }
};

module.exports = PathUtils;