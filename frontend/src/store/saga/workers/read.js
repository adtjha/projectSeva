import {
    call,
    put,
    take} from 'redux-saga/effects';
import { suscribe } from './suscribe';

// Worker

export function* read(socket) {
    const channel = yield call(suscribe, socket);
    while (true) {
        const data = yield take(channel);
        yield put(data);
    }
}
