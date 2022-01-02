import Posts from "./Posts";
const index = ({ posts }) => {
  return (
    <div className="md:w-3/4 w-full border-b-4 h-full mb-2">
      <div className="w-full h-6 bg-gray-400">
        <ul className="flex w-full text-sm lg:text-base">
          <li className="text-center w-32">카테고리</li>
          <li className="text-center w-1/2">제목</li>
          <li className="w-56 text-center">작성자</li>
          <li className="w-56 text-center">작성날짜</li>
          <li className="text-center w-24">조회수</li>
        </ul>
      </div>
      <Posts posts={posts}></Posts>
    </div>
  );
};
export default index;
