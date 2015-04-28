(function (Module) {
    'use strict';

    var async     = require('async'),

        sockets   = require('./nodebb').pluginSockets,
        settings  = require('./settings'),
        database  = require('./database'),
        constants = require('./constants'),

        namespace = 'ns-custom-fields';

    Module.init = function (callback) {
        sockets[namespace] = {};
        //Acknowledgements
        sockets[namespace].createAward = Module.createAward;

        callback();
    };

    Module.createAward = function (socket, payload, callback) {
        //async.parallel({
        //    fields: async.apply(database.getFields),
        //    data  : async.apply(database.getClientFields, payload.uid)
        //}, function (error, result) {
        //    if (error) {
        //        callback(error);
        //    } else {
        //        callback(null, result);
        //    }
        //});
    };

})(module.exports);