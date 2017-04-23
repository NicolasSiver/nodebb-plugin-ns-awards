(function (Controller) {
    'use strict';

    var async = require('async'),
        path  = require('path'),
        util  = require('util');

    var constants  = require('./constants'),
        controller = require('./controller'),
        database   = require('./database'),
        nodebb     = require('./nodebb'),
        settings   = require('./settings'),
        uploads    = require('./uploads');


    var nconf         = nodebb.nconf,
        notifications = nodebb.notifications,
        user          = nodebb.user,
        utils         = nodebb.utils;

    Controller.augmentGrant = function (grant, done) {
        async.parallel({
            award  : async.apply(Controller.getAward, grant.aid),
            granter: async.apply(Controller.getUser, grant.fromuid),
            grantee: async.apply(Controller.getUser, grant.uid)
        }, function (error, results) {
            if (error) {
                return done(error);
            }

            done(null, Object.assign(grant, results));
        });
    };

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

    Controller.deleteAwardById = function (aid, done) {
        async.waterfall([
            async.apply(database.getAward, aid),
            function (award, next) {
                if (!award) {
                    return done(new Error('Award with id - ' + aid + ' can not be found.'));
                }

                async.parallel([
                    async.apply(uploads.deleteImage, award.image),
                    async.apply(database.deleteAward, award.aid),
                    async.apply(Controller.deleteAwardGrants, award.aid)
                ], next);
            }
        ], done);
    };

    /**
     * Delete Grants/Rewards associated with an award
     *
     * @param {number} aid award identifier
     * @param {function} done
     */
    Controller.deleteAwardGrants = function (aid, done) {
        database.getGrantIdsByAward(aid, function (error, grantIds) {
            async.each(grantIds, function (gid, next) {
                database.deleteGrant(gid, next);
            }, done);
        });
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
            async.apply(database.getAwards, true),
            function (awards, callback) {
                async.map(awards, function (award, next) {
                    uploads.getImageUrl(award.image, function (error, url) {
                        if (error) {
                            return next(error);
                        }
                        next(null, Object.assign(award, {url: url}));
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

    Controller.getAwardsWithGrants = function (done) {
        async.waterfall([
            async.apply(Controller.getAwards),
            function (awards, callback) {
                async.map(awards, function (award, next) {
                    Controller.getAwardRecipients(award.aid, function (error, grants) {
                        if (error) {
                            return next(error);
                        }
                        next(null, Object.assign(award, {grants: grants}));
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
            async.apply(settings.get),
            function (settings, callback) {
                database.getGrants(true, settings.activityLimit, callback);
            },
            function (grants, callback) {
                async.map(grants, function (grant, next) {
                    Controller.augmentGrant(grant, next);
                }, function (error, result) {
                    if (error) {
                        return callback(error);
                    }

                    callback(null, {grants: result});
                });
            }
        ], done);
    };

    Controller.getPostsWithRewards = function (posts, done) {
        async.waterfall([
            async.apply(settings.get),
            function (settings, callback) {
                // Feature is disabled, Skip it.
                if (settings.maxRewardsPerPost === 0) {
                    callback(null, posts);
                } else {
                    async.map(posts, function (post, next) {
                        Controller.getUserGrants(post.uid, settings.maxRewardsPerPost, function (error, grants) {
                            if (error) {
                                return next(error);
                            }
                            next(null, Object.assign(post, {nsRewards: grants}));
                        });
                    }, callback);
                }
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

    Controller.getUserGrants = function (uid, limit, done) {
        async.waterfall([
            async.apply(database.getGrantIdsByUser, uid, limit),
            function (grantIds, callback) {
                if (!grantIds) {
                    return callback(null, []);
                }

                database.getGrantsByIds(grantIds, callback);
            },
            function (grants, callback) {
                async.map(grants, function (grant, next) {
                    Controller.augmentGrant(grant, next);
                }, callback);
            }
        ], done);
    };

    Controller.saveSettings = function (data, done) {
        async.waterfall([
            async.apply(settings.filterKnownProperties, data),
            function (validFields, callback) {
                settings.validate(validFields, callback);
            },
            function (validData, callback) {
                settings.save(validData, callback);
            }
        ], done);
    };

    // FIXME Deprecate/Remove
    function getImagePath(image) {
        return path.join(nconf.get('relative_path'), nconf.get('upload_url'), constants.UPLOAD_DIR, image);
    }

})(module.exports);
