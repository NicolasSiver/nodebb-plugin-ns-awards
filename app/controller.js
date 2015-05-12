(function (Controller) {
    'use strict';

    var async      = require('async'),
        fse        = require('fs-extra'),
        path       = require('path'),

        database   = require('./database'),
        settings   = require('./settings'),
        controller = require('./controller'),
        constants  = require('./constants'),
        uploads    = require('./uploads'),

        nodebb     = require('./nodebb'),
        utils      = nodebb.utils,
        helpers    = nodebb.helpers,
        user       = nodebb.user,
        nconf      = nodebb.nconf;

    Controller.deleteUserGrants = function (uid, done) {
        async.waterfall([
            async.apply(database.getGrantIdsByUser, uid),
            function (grantIds, next) {
                async.each(grantIds, function (gid, next) {
                    database.deleteGrant(gid, next);
                }, next);
            }
        ], done);
    };

    /**
     * Edit award.
     *
     * @param aid - award identifier
     * @param name - award name
     * @param description - award description
     * @param upload - optional file descriptor, to get filename, 'uploads' module should be used
     * @param done {function}
     */
    Controller.editAward = function (aid, name, description, upload, done) {
        var update = {
            name: name,
            desc: description
        };

        upload = upload || {};

        async.waterfall([
            async.apply(uploads.getFileById, upload.id),
            function (image, next) {
                if (image) {
                    Controller.editImage(aid, image, function (error, imageName) {
                        if (error) {
                            return next(error);
                        }
                        update.image = imageName;
                        next(null);
                    });
                } else {
                    next(null);
                }
            },
            async.apply(database.editAward, aid, update)
        ], done);
    };

    /**
     * Update image. Delete old one if any.
     *
     * @param aid {number} award identifier
     * @param newImage {object} file descriptor from 'uploads' module
     * @param done {function} returns image name if operation was successful
     */
    Controller.editImage = function (aid, newImage, done) {
        async.waterfall([
            async.apply(database.getAward, aid),
            function (award, next) {
                if (!award) {
                    next(new Error('Award can not be found'));
                }

                //Remove old image
                fse.remove(getUploadImagePath(award.image), next);
            },
            async.apply(fse.copy, newImage.path, getUploadImagePath(newImage.name)),
            function (next) {
                next(null, newImage.name);
            }
        ], done);
    };

    Controller.getAllAwards = function (done) {
        async.waterfall([
            async.apply(database.getAllAwards),
            function (awards, next) {
                async.map(awards, function (award, next) {

                    award.picture = nconf.get('upload_url') + constants.UPLOAD_DIR + '/' + award.image;

                    Controller.getAwardRecipients(award.aid, function (error, grants) {
                        if (error) {
                            return next(error);
                        }

                        award.grants = grants;
                        next(null, award);
                    });
                }, function (error, awards) {
                    if (error) {
                        return next(error);
                    }

                    next(null, {
                        awards     : awards,
                        breadcrumbs: helpers.buildBreadcrumbs([{text: 'Awards'}])
                    });
                });
            }
        ], done);
    };

    Controller.getAwardRecipients = function (aid, done) {
        async.waterfall([
            async.apply(database.getGrantIdsByAward, aid),
            function (grantIds, next) {
                grantIds = grantIds || [];
                database.getGrantsByIds(grantIds, next);
            },
            function (grants, next) {
                async.map(grants, function (grant, next) {
                    user.getUserFields(grant.uid, ['username', 'userslug'], function (error, user) {
                        if (error) {
                            return next(error);
                        }
                        grant.user = user;
                        next(null, grant);
                    });
                }, next);
            }
        ], done);
    };

    Controller.getAwardsTopic = function (payload, done) {
        async.waterfall([
            async.apply(settings.get),
            function (settings, postsDidProcess) {
                if (settings.renderTopic) {

                    async.map(payload.posts, function (post, next) {

                        Controller.getUserAwards(post.uid, settings.maxAwardsTopic, function (error, grants) {
                            if (error) {
                                return next(error);
                            }
                            post.grants = grants;
                            next(null, post);
                        });
                    }, function (error, postsWithGrants) {
                        if (error) {
                            return postsDidProcess(error);
                        }
                        payload.posts = postsWithGrants;
                        postsDidProcess(null, payload);
                    });

                } else {
                    //Skip render
                    postsDidProcess(null, payload);
                }
            }
        ], done);
    };

    Controller.getUserAwards = function (uid, limit, done) {
        async.waterfall([
            async.apply(database.getGrantIdsByUser, uid, limit),
            function (grantIds, next) {
                if (!grantIds) {
                    return next(null, []);
                }

                database.getGrantsByIds(grantIds, next);
            },
            function (grants, next) {
                async.map(grants, function (grant, next) {

                    grant.createtimeiso = utils.toISOString(grant.createtime);

                    async.parallel({
                        award: async.apply(database.getAward, grant.aid),
                        user : async.apply(user.getUserFields, grant.fromuid, ['username', 'userslug'])
                    }, function (error, result) {
                        if (error) {
                            return next(error);
                        }

                        var award = result.award, user = result.user;

                        award.picture = nconf.get('upload_url') + constants.UPLOAD_DIR + '/' + award.image;

                        grant.award = award;
                        grant.fromuser = user;
                        next(null, grant);
                    });
                }, next);
            }
        ], done);
    };

    Controller.saveValidSettings = function (data, done) {
        settings.get(function (error, values) {
            if (error) {
                return done(error);
            }
            var newSettings = getValidFields(values, data);
            settings.save(newSettings, done);
        });

    };

    function getValidFields(fields, object) {
        var shallowCopy = {};
        for (var field in fields) {
            if (field in object) {
                shallowCopy[field] = object[field];
            }
        }
        return shallowCopy;
    }

    function getUploadImagePath(fileName) {
        return path.join(nconf.get('base_dir'), nconf.get('upload_path'), constants.UPLOAD_DIR, fileName);
    }

})(module.exports);