import * as SocketActions from '../model/socket-actions';

export default class SocketService {

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

}
