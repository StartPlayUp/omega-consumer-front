import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Link from "next/link";
const HomePagePostProvider = ({ mainPageContentTitle }) => {
  return (
    <PostList mainPageContentTitle={mainPageContentTitle} />
  );
};
const PostList = ({ mainPageContentTitle }) => {
  console.log("PostList", mainPageContentTitle);
  const { isLoading, error, data } = useQuery("homePagePost", () =>
    axios
      .get(
        `/api/post/getCategoryPosts?category=${mainPageContentTitle}&limit=10`
      )
      .then((res) => {
        return res.data.data;
      })
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      {data.posts.map((post) => (
        <div key={post.post_uuid}>
          <Link href={`/${post.post_category}/post/${post.post_uuid}`}>{post.post_title}</Link>
        </div>
      ))}
    </>
  );
};
const HomepagePost = ({ mainPageContentTitle }) => {
  return (
    <div className="lg:w-1/4 md:w-1/2 pl-4 pr-4">
      <div className="flex flex-col border-4">
        <HomePagePostProvider mainPageContentTitle={mainPageContentTitle} />
      </div>
    </div>
  );
};

export default HomepagePost;
