import { all, fork } from 'redux-saga/effects';
import userSaga from './user';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_HOST;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(userSaga),
    ]);
}
