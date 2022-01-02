export interface userType {
    loadUserInfo: Boolean,
    loadUserDone: Boolean,
    loadUserError: any,

    // 내 정보 가져오기.
    loadMyInfoLoading: Boolean,
    loadMyInfoDone: Boolean,
    loadMyInfoError: any,

    // 로그인
    logInLoading: Boolean,
    logInDone: Boolean,
    logInError: any,

    // 로그아웃
    logOutLoading: Boolean,
    logOutDone: Boolean,
    logOutError: any,

    // 회원가입
    signInLoading: Boolean,
    signInDone: Boolean,
    signInError: any,

    // 회원탈퇴
    signOutLoading: Boolean,
    signOutDone: Boolean,
    signOutError: any,

    // 회원 기본 정보
    me: String | Null,
    userInfo: Object | Null,
}
