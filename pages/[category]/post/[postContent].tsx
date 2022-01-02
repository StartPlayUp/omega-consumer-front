import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ContentContainer from "../../../components/Board/ContentPage/ContentContainer";
import Link from "next/link";
import PostList from "../../../components/Board/PageContainer/index";
import { Pagination } from "antd";
import { GetServerSideProps } from "next";
import wrapper, { SagaStore } from "store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "reducer/user";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import { userType } from "reducer/reducerUser";
import { CATEGORY_LIST } from "../../../constants/constant/category";
const UserLink = ({ id, comment }: { id: string, comment: string }) => (
  <Link href={`/${id}/writeBoard`}>
    <a className="ml-auto w-32 align-middle border-2 rounded-xl flex items-center space-x-4 justify-center bg-blue-400">
      <div className="font-extrabold text-white">글쓰기</div>
    </a>
  </Link>
);
const PostContentContainer = ({ posts, post }: { posts: Object[], post: Object }) => {
  console.log(post);
  const router = useRouter();
  const category = router.query.category as string;
  const [boardName, setBoardName]: [boardName: string, setBoardName: Function] = useState("");
  const { me } = useSelector((state: { user: userType }) => state.user)
  const [page, setPage] = useState(1);
  useEffect(() => {
    Object.entries(CATEGORY_LIST).map(([key, value]) => {
      if (category === key) {
        setBoardName(value)
      }
    })
  }, [category]);
  return (
    <div className="w-full h-full bg-gray-500">
      <div className="flex place-items-center flex-col">
        <div className="w-3/4 h-9 flex m-5">
          <div className="flex-none ml-16 text-4xl">{boardName}</div>
          {me ? <UserLink id={category} comment="글쓰기"></UserLink> : <></>}
        </div>
        <ContentContainer post={post} />

        <PostList posts={posts.slice(15 * (page - 1), 15 * page)} />
        <div className="mb-3">
          <Pagination
            current={page}
            onChange={setPage}
            defaultPageSize={15}
            total={posts.length}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, query }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.common['Cookie'] = '';
  if (req && cookie) {
    axios.defaults.headers.common['Cookie'] = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch(END);
  await (store as SagaStore).sagaTask.toPromise();
  try {
    const { category, postContent } = query;
    console.log(postContent);
    const { data: { success: getPostsSuccess, data: { posts } } } = await axios.get(
      `/api/post/getCategoryPosts?category=${category}`
    );
    const { data: { success: getPostSuccess, data: { post } } } = await axios.get(
      `/api/post/getPost?postUuid=${postContent}`
    );
    if ((getPostsSuccess || posts.length == 0) && getPostSuccess) {
      return {
        props: {
          posts,
          post,
        },
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
  } catch (err) {
    console.log("post get error : ", err);
    console.log("서버가 이상이 생겨 포스트를 못가져옴");
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
});
export default PostContentContainer;
