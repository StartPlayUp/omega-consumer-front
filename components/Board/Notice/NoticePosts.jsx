const NoticePosts = ({ posts }) => {
  return (
    <div className="bg-gray-100 w-full h-full">
      {Object.keys(posts).map((i) => (
        <div key={posts.uuid}>
          <div>
            <button className="flex">
              <div>{posts[i].index}</div>
              <div>{posts[i].category}</div>
              <div>{posts[i].post_title}</div>
              <div className="">
                <div>{posts[i].post_updatedAt}</div>
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoticePosts;
