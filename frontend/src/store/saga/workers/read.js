import {
    call,
    put,
    takeLatest
} from 'redux-saga/effects';
import { suscribe } from './suscribe';

// Worker

export function* read(socket) {
    const channel = yield call(suscribe, socket);
    
    yield takeLatest(channel, function* (action) {
        console.log(action)
        yield put(action)
    })

}
