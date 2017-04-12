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

}
