import React, { useState, useEffect } from "react";
import axios from "axios";
import NoticePosts from "./NoticePosts";
export default function NoticeContainer() {
  const [noticeBoard, setNoticeBoard] = useState([]);
  const dataBaseAsync = async () => {
    try {
      const res = await axios.get("/api/post/getPosts");
      if (res.data.success) {
        const posts = res.data.data.posts;
        setNoticeBoard(posts);
      } else {
        alert("서버에 이상이 생겨서 게시글을 가져오지 못했습니다.");
      }
    } catch {
      alert("서버에 이상이 생겨서 게시글을 가져오지 못했습니다.");
    }
  };
  useEffect(() => {
    dataBaseAsync();
  }, []);

  return (
    <div className="md:w-3/4 w-full border-b-4 h-full">
      <div className="w-full h-6 bg-gray-200">
        <ul className="flex w-full text-sm lg:text-base">
          <li className="w-10 text-center">No.</li>
          <li className="text-center w-32">카테고리</li>
          <li className="text-center w-1/2">제목</li>
          <li className="w-56 text-center">작성자</li>
          <li className="w-56 text-center">작성날짜</li>
          <li className="text-center w-24">조회수</li>
        </ul>
      </div>
      <NoticePosts posts={noticeBoard}></NoticePosts>

    </div>
  );
}
