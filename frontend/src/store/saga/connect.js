import Constants from 'Constants';
import { io } from 'socket.io-client';

export function connect() {
    const socket = io(Constants.BASE_API);
    return new Promise((resolve) => {
        socket.on('connect', () => {
            resolve(socket);
        });
    });
}
