function define(name, value) {
    Object.defineProperty(exports, name, {
        value     : value,
        enumerable: true
    });
}

define('GLOBAL_AWARD_COUNTER', 'nextNsAwardId');
define('GLOBAL_GRANT_COUNTER', 'nextNsAwardGrantId');
define('NAMESPACE', 'ns:awards');
define('SOCKETS', 'ns-awards');
define('UPLOAD_DIR', 'awards');