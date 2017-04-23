import * as SocketActions from '../model/socket-actions';

export default class SocketService {

    static awardUsers(awardId, userIds, reason) {
        return new Promise((resolve, reject) => {
            window.socket.emit(SocketActions.AWARD_USERS, {
                awardId,
                reason,
                userIds
            }, (error) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });
    }

    static createAward(name, description) {
        return new Promise((resolve, reject) => {
            window.socket.emit(SocketActions.CREATE_AWARD, {
                name,
                description
            }, (error, award) => {
                if (error) {
                    return reject(error);
                }
                resolve(award);
            });
        });
    }

    static deleteAward(id) {
        return new Promise((resolve, reject) => {
            window.socket.emit(SocketActions.DELETE_AWARD, {
                id
            }, error => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });
    }

    static deleteGrant(id){
        return new Promise((resolve, reject) => {
            window.socket.emit(SocketActions.DELETE_GRANT, {
                id
            }, error => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });
    }

    static editAward(id, name, description) {
        return new Promise((resolve, reject) => {
            window.socket.emit(SocketActions.EDIT_AWARD, {
                id,
                name,
                description
            }, (error, award) => {
                if (error) {
                    return reject(error);
                }
                resolve(award);
            });
        });
    }

    static getAwards() {
        return new Promise((resolve, reject) => {
            window.socket.emit(SocketActions.GET_AWARDS, (error, awards) => {
                if (error) {
                    return reject(error);
                }
                resolve(awards);
            });
        });
    }

    static getConfig() {
        return new Promise((resolve, reject) => {
            window.socket.emit(SocketActions.GET_CONFIG, (error, config) => {
                if (error) {
                    return reject(error);
                }
                resolve(config);
            });
        });
    }

    static getGrants() {
        return new Promise((resolve, reject) => {
            window.socket.emit(SocketActions.GET_GRANTS, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    }

    static getSettings() {
        return new Promise((resolve, reject) => {
            window.socket.emit(SocketActions.GET_SETTINGS, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    }

    static getUserGrants(id) {
        return new Promise((resolve, reject) => {
            window.socket.emit(SocketActions.GET_USER_GRANTS, {
                id
            }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    }

    static searchUser(username) {
        return new Promise((resolve, reject) => {
            window.socket.emit(SocketActions.SEARCH_USER, {
                username
            }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    }

    static saveSettings(settings) {
        return new Promise((resolve, reject) => {
            window.socket.emit(SocketActions.SAVE_SETTINGS, {
                settings
            }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    }

}
