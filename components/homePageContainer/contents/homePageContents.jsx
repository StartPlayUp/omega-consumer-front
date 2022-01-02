import HomepagePost from "./homepagePost";
import {
  REVIEW,
  GAME,
  FREE_BOARD,
  PROGRAMMING,
} from "constants/constant/category";
import React, { useState } from "react";
const HomePageContent = () => {
  const [categoryExceptNoticeBoard, setCategoryExceptNoticeBoard] = [
    REVIEW,
    GAME,
    FREE_BOARD,
    PROGRAMMING,
  ];
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col lg:flex-row justify-center ">
        <HomepagePost mainPageContentTitle={"noticeBoard"} />
        <HomepagePost mainPageContentTitle={categoryExceptNoticeBoard} />
      </div>
      <div>안녕안녕</div>
    </div>
  );
};
export default HomePageContent;
