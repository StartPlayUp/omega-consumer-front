import produce from '../util/produce';

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const RESIGN_REQUEST = "RESIGN_REQUEST";
export const RESIGN_SUCCESS = "RESIGN_SUCCESS";
export const RESIGN_FAILURE = "RESIGN_FAILURE";

export const initialState = {
  // isLoggedIn: false,

  // 유저 정보 가져오기
  loadUserInfo: false,
  loadUserDone: false,
  loadUserError: null,

  // 내 정보 가져오기.
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,

  // 로그인
  logInLoading: false,
  logInDone: false,
  logInError: null,

  // 로그아웃
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,

  // 회원가입
  signInLoading: false,
  signInDone: false,
  signInError: null,

  // 회원탈퇴
  signOutLoading: false,
  signOutDone: false,
  signOutError: null,

  // 회원 기본 정보

  me: null,
  userInfo: null,
};

export const loginRequestAction = (data: any) => {
  console.log("loginRequestAction: ", data)
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

const reducer = (state = initialState, action: any) =>
  produce(state, (draft: any) => {
    console.log(draft, action.type)
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.loadMyInfoError = null;
        draft.loadMyInfoDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoError = null;
        draft.loadMyInfoDone = false;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error
        break;
      default:
        break;
    }
  });

export default reducer;
