import { useRouter } from "next/router";
import { CATEGORY_LIST } from "../../../constants/constant/category";
import Link from "next/link";
const GetPostUuid = ({ category, uuid, posts, timeArray }) => (
  <Link href={`/${category}/post/${uuid}`}>
    <a className="text-black">
      <div className="w-full flex items-center">
        <div className="text-center w-32">
          {CATEGORY_LIST[posts.post_category]}
        </div>
        <div className="w-1/2">{posts.post_title}</div>
        <div className="w-56 text-center">{posts.user_nickname}</div>
        <div className="w-56 text-center">
          <div>{timeArray[0]}</div>
          <div>{timeArray[1]}</div>
        </div>
        <div className="text-center w-24">{posts.post_views}</div>
      </div>
    </a>
  </Link>
);
const Posts = ({ posts }) => {
  const router = useRouter();
  const { category } = router.query;
  console.log(category);
  return (
    <div className="bg-gray-100 w-full h-full">
      {Object.keys(posts).map((i) => {
        const timeArray = posts[i].post_createdAt
          .slice(0, posts[i].post_createdAt.length - 5)
          .split("T");
        return (
          <div key={posts.uuid}>
            <GetPostUuid
              category={category}
              uuid={posts[i].post_uuid}
              posts={posts[i]}
              timeArray={timeArray}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
