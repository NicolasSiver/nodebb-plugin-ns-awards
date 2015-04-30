(function (Database) {
    'use strict';

    var async     = require('async'),

        nodebb    = require('./nodebb'),
        db        = nodebb.db,
        constants = require('./constants'),
        namespace = constants.NAMESPACE;

    Database.createAward = function (name, description, image, done) {
        async.waterfall([
            function (next) {
                db.incrObjectField('global', 'nextNsAwardId', next);
            }, function (id, next) {
                //Where score as id will work as index position value for sorting
                db.sortedSetAdd(namespace, id, id, function (error) {
                    if (error) {
                        return next(error);
                    }
                    next(null, id);
                });
            }, function (id, next) {
                var awardModel = {
                    aid  : id,
                    name : name,
                    desc : description,
                    image: image
                };
                db.setObject(namespace + ':' + id, awardModel, function (error) {
                    if (error) {
                        return next(error);
                    }

                    next(null, awardModel);
                });
            }
        ], done);
    };


})(module.exports);