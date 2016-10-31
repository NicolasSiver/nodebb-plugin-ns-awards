import * as SocketActions from '../model/socket-actions';

export default class SocketService {
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
}
