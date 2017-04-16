(function (Controller) {
    'use strict';

    var async         = require('async'),
        path          = require('path'),
        util          = require('util'),

        database      = require('./database'),
        settings      = require('./settings'),
        controller    = require('./controller'),
        constants     = require('./constants'),
        uploads       = require('./uploads'),

        nodebb        = require('./nodebb'),
        utils         = nodebb.utils,
        helpers       = nodebb.helpers,
        user          = nodebb.user,
        nconf         = nodebb.nconf,
        notifications = nodebb.notifications;

    Controller.awardUsers = function (awardId, fromUid, toUids, reasonText, done) {
        async.waterfall([
            function (callback) {
                async.each(toUids, function (uid, next) {
                    database.createGrant(uid, awardId, reasonText, fromUid, next);
                }, callback);
            },
            async.apply(database.getAward, awardId),
            function (award, callback) {
                notifications.create({
                    bodyShort: util.format('Congratulations! You have been awarded <strong>"%s"</strong> award.', award.name),
                    nid      : 'aid:' + awardId + ':uids:' + toUids.join('-'),
                    aid      : awardId,
                    from     : fromUid,
                    path     : constants.CLIENT_PAGE_PATH
                }, callback);
            },
            function (notification, callback) {
                if (notification) {
                    notifications.push(notification, toUids, callback);
                }
            }
        ], done);
    };

    Controller.createAward = function (awardMeta, done) {
        async.waterfall([
            async.apply(uploads.getFileById, constants.NEW_AWARD_ID),
            async.apply(uploads.getFinalDestination),
            function (awardUri, next) {
                database.createAward(
                    awardMeta.name,
                    awardMeta.description,
                    // Local storage - filename
                    // Cloud storage - fully qualified URL
                    awardUri,
                    next);
            }
        ], done);
    };

    Controller.deleteGrantById = function (gid, done) {
        database.deleteGrant(gid, done);
    };

    Controller.deleteUserGrants = function (uid, done) {
        async.waterfall([
            async.apply(database.getGrantIdsByUser, uid, -1),
            function (grantIds, callback) {
                async.each(grantIds, function (gid, next) {
                    database.deleteGrant(gid, next);
                }, callback);
            }
        ], done);
    };

    /**
     * Edit award.
     *
     * @param {number} id award identifier
     * @param {string} name award name
     * @param {string} description - award description
     * @param {function} done
     */
    Controller.editAward = function (id, name, description, done) {
        var fileId = constants.FILE_PREFIX + ':' + id;
        async.waterfall([
            function (next) {
                async.parallel({
                    award: async.apply(database.getAward, id),
                    file : async.apply(uploads.getFileById, fileId)
                }, function (error, results) {
                    if (error) {
                        return next(error);
                    } else if (!results.award) {
                        return next(new Error(util.format('Award "%d" can not be found', id)));
                    } else if (!results.file) {
                        return next(null, null);
                    } else {
                        return uploads.replaceFile(results.award.image, fileId, results.file, next);
                    }
                });
            },
            function (awardUri, next) {
                var awardData = {name: name, desc: description};
                if (awardUri) {
                    awardData.image = awardUri;
                }
                database.editAward(id, awardData, next);
            }
        ], done);
    };

    Controller.editGrant = function (gid, reason, done) {
        database.editGrant(gid, {reason: reason}, done);
    };

    Controller.getAllAwards = function (done) {
        async.waterfall([
            async.apply(database.getAllAwards),
            function (awards, next) {
                async.map(awards, function (award, next) {

                    award.picture = getImagePath(award.image);

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

    Controller.getAward = function (aid, done) {
        async.waterfall([
            async.apply(database.getAward, aid),
            function (award, callback) {
                uploads.getImageUrl(award.image, function (error, url) {
                    if (error) {
                        return callback(error);
                    }
                    callback(null, Object.assign(award, {url: url}));
                });
            }
        ], done);
    };

    Controller.getAwards = function (done) {
        async.waterfall([
            async.apply(database.getAllAwards),
            function (awards, callback) {
                async.map(awards, function (award, next) {
                    async.parallel({
                        url   : async.apply(uploads.getImageUrl, award.image),
                        grants: async.apply(Controller.getAwardRecipients, award.aid)
                    }, function (error, results) {
                        if (error) {
                            return next(error);
                        }

                        award.url = results.url;
                        award.grants = results.grants;

                        next(null, award);
                    });
                }, function (error, awards) {
                    if (error) {
                        return callback(error);
                    }

                    callback(null, {awards: awards});
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

    Controller.getConfig = function (done) {
        var uploadPath = path.join(
            nconf.get('relative_path'),
            constants.API_PATH,
            constants.PLUGIN_PATH,
            constants.IMAGE_SERVICE_PATH
        );
        done(null, {
            uploadPath: uploadPath
        });
    };

    Controller.getGrants = function (done) {
        async.waterfall([
            async.apply(database.getGrants, true),
            function (grants, callback) {
                async.map(grants, function (grant, next) {
                    async.parallel({
                        award  : async.apply(Controller.getAward, grant.aid),
                        granter: async.apply(Controller.getUser, grant.fromuid),
                        grantee: async.apply(Controller.getUser, grant.uid)
                    }, function (error, results) {
                        if (error) {
                            return next(error);
                        }

                        next(null, Object.assign(grant, results));
                    });
                }, function (error, result) {
                    if (error) {
                        return callback(error);
                    }

                    callback(null, {grants: result});
                });
            }
        ], done);
    };

    Controller.getUser = function (uid, done) {
        user.getUserFields(uid, ['uid', 'picture', 'username', 'userslug'], done);
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

                        award.picture = getImagePath(award.image);

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

    function getImagePath(image) {
        return path.join(nconf.get('relative_path'), nconf.get('upload_url'), constants.UPLOAD_DIR, image);
    }

    function getUploadImagePath(fileName) {
        return path.join(nconf.get('base_dir'), nconf.get('upload_path'), constants.UPLOAD_DIR, fileName);
    }

    function getValidFields(fields, object) {
        var shallowCopy = {};
        for (var field in fields) {
            if (field in object) {
                shallowCopy[field] = object[field];
            }
        }
        return shallowCopy;
    }

})(module.exports);