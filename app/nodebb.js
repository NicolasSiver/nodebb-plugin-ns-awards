(function (Module, NodeBB) {
    'use strict';

    Module.exports = {
        adminSockets : NodeBB.require('./src/socket.io/admin').plugins,
        db           : NodeBB.require('./src/database'),
        emitter      : NodeBB.require('./src/emitter'),
        meta         : NodeBB.require('./src/meta'),
        pluginSockets: NodeBB.require('./src/socket.io/plugins'),
        postTools    : NodeBB.require('./src/postTools'),
        settings     : NodeBB.require('./src/settings'),
        socketIndex  : NodeBB.require('./src/socket.io/index'),
        topics       : NodeBB.require('./src/topics'),
        user         : NodeBB.require('./src/user'),

        /**
         * List is incomplete
         *
         * base_dir: '/path/to/NodeBB',
         * themes_path: '/path/to/NodeBB/node_modules',
         * views_dir: '/path/to/NodeBB/public/templates',
         * version: 'NodeBB Version',
         * url: 'http://localhost:4567',
         * core_templates_path: '/path/to/NodeBB/src/views',
         * base_templates_path: '/path/to/NodeBB/node_modules/nodebb-theme-vanilla/templates',
         * upload_path: '/public/uploads',
         * relative_path: '',
         * port: '4567',
         * upload_url: '/uploads/',
         * theme_templates_path: '/path/to/NodeBB/node_modules/nodebb-theme-lavender/templates',
         * theme_config: '/path/to/NodeBB/node_modules/nodebb-theme-lavender/theme.json',
         * NODE_ENV: 'development'
         */
        nconf: NodeBB.require('nconf')
    };

})(module, require.main);