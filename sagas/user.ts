import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,

    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,

    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,

    RESIGN_REQUEST,
    RESIGN_SUCCESS,
    RESIGN_FAILURE,

    LOAD_MY_INFO_REQUEST,
    LOAD_MY_INFO_SUCCESS,
    LOAD_MY_INFO_FAILURE,
} from '../reducer/user';

function loadMyInfoAPI() {
    console.log(axios.get('/api/user/loadMyInfo'))
    return axios.get('/api/user/loadMyInfo');
}

function* loadMyInfo() {
    try {
        const { data: { data: { id, nickname } } } = yield call(loadMyInfoAPI);
        console.log(nickname)
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: nickname,
        });

    } catch (err: any) {
        console.error(err?.response?.data);
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: err.response.data,
        });
    }
}

function logInAPI(data: any) {
    console.log("baseURL : ", axios.defaults.baseURL)
    return axios.post('/api/user/login', data);
}

function* logIn(action: any) {
    try {
        const { data: { success, data: { user: { nickname } }, error } } = yield call(logInAPI, action.data);
        if (success) {
            console.log("LOG_IN_SUCCESS")
            yield put({
                type: LOG_IN_SUCCESS,
                data: nickname,
            });
        }
        else {
            console.log("LOG_IN_FAILURE")
            yield put({
                type: LOG_IN_FAILURE,
                error,
            });
        }
    } catch (err: any) {
        console.log("LOG_IN_FAILURE exception")
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        });
    }
}

function logOutAPI() {
    return axios.post('/api/user/logout');
}

function* logOut() {
    try {
        const { data: { success, message, error } } = yield call(logOutAPI);
        if (success) {
            yield put({
                type: LOG_OUT_SUCCESS,
            });
        }
        else {
            yield put({
                type: LOG_OUT_FAILURE,
                error: message
            });
        }
    } catch (err: any) {
        // console.error(err);
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

export default function* userSaga() {
    yield all([
        fork(watchLoadMyInfo),
        fork(watchLogIn),
        fork(watchLogOut),
    ]);
}
