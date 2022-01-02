import React, { useState } from "react";
import Modal from "react-modal";
import Login from "./Login/index";
import SignUp from "./SignUp/index";
const LoginModal = () => {
  const [modalState, setModalState] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const changeSignUpLogin = () => {
    setIsSignUp(!isSignUp);
  };
  const changeModalState = () => {
    setModalState(!modalState);
  };

  return (
    <>
      <button onClick={changeModalState}>로그인</button>
      <Modal
        isOpen={modalState}
        ariaHideApp={false}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: "1",
          },
          content: {
            position: "absolute",
            top: "10%",
            left: "30%",
            right: "30%",
            border: "2px solid #000000",
            background: "#FFFFFF",
            overflow: "auto",
          },
        }}
      >
        <button onClick={changeModalState} className="border-2">
          닫기
        </button>
        {isSignUp ? (
          <>
            <SignUp />
            <button onClick={changeSignUpLogin} className="border-2">
              로그인
            </button>
          </>
        ) : (
          <>
            <Login />
            <button onClick={changeSignUpLogin} className="border-2">
              회원가입
            </button>
          </>
        )}
      </Modal>
    </>
  );
};

export default LoginModal;