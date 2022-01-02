import LoginModal from "./LoginContainer/index";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { logoutRequestAction } from "../../reducer/user";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import Link from "next/link";
const Header = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  // const logoutFunction = async () => {
  //   await axios.post("/api/user/logout");
  //   dispatch(logoutAction());
  // }
  const onLogoutHandler = useCallback(() => {
    dispatch(logoutRequestAction());
  }, [dispatch]);
  return (
    <header>
      <nav className="w-full h-16 border-b-2">
        <div className="flex mt-3 w-full h-full">
          <ul className="flex lg:ml-16 h-full w-2/3">
            <li className="lg:text-5xl text-2xl w-2/5">
              <Link href="/" className="text-black" passHref>
                <a style={{ color: "black" }}>OmegaComsumer</a>
              </Link>
            </li>
            <li className="text-2xl m-auto w-56 text-center">
              <Link href="/noticeBoard">
                <a style={{ color: "black" }}>공지사항</a>
              </Link>
            </li>
            <li className="w-56 m-auto text-2xl text-center">
              <Link href="/review">
                <a style={{ color: "black" }}>리뷰</a>
              </Link>
            </li>
            <li className="w-56 m-auto text-2xl text-center">
              <Link href="/game">
                <a style={{ color: "black" }}>게임</a>
              </Link>
            </li>
            <li className="w-56 m-auto text-2xl text-center">
              <Link href="/programming">
                <a style={{ color: "black" }}>프로그래밍</a>
              </Link>
            </li>
            <li className="w-56 m-auto text-2xl text-center">
              <Link href="/freeBoard">
                <a style={{ color: "black" }}>자유</a>
              </Link>
            </li>
          </ul>
          <ul>
            <li className="absolute lg:right-5">
              {me ? (
                <div className="">
                  <div>{me}님</div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={onLogoutHandler}
                  >
                    로그아웃
                  </Button>
                </div>
              ) : (
                <div className=" m-3">
                  <LoginModal />
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
