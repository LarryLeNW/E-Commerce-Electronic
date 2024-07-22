import { useEffect, useState } from "react";
import List from "./List";
import Sidebar from "./Sidebar";
import { getBlogs } from "apis";
import Blog from "./Blog";

function ListBlogs() {
  const [latestBlogs, setLatestBlogs] = useState([]);
  console.log("🚀 ~ ListBlogs ~ latestBlogs:", latestBlogs);

  const handleFetchNewBlogs = async () => {
    const params = { limit: 8, sort: "-createAt" };
    const response = await getBlogs(params);
    setLatestBlogs(response?.data);
  };

  useEffect(() => {
    handleFetchNewBlogs();
  }, []);

  return (
    <div className="border border-red-700 mt-2 p-4">
      <div className="p-4 flex min-h-screen">
        <div className="w-[30%] border border-yellow-700 min-h-screen ">
          <Sidebar />
        </div>
        <div className=" w-[70%] border border-blue-600 min-h-screen">
          <List />
        </div>
      </div>

      <h1 className="px-3 text-main border-b-2 border-main font-bold text-3xl">
        Bài viết mới nhất
      </h1>
      <div className="px-1 py-2 flex flex-wrap gap-2 items-center justify-around overflow-y-auto ">
        {latestBlogs?.map((el, index) => (
          <Blog data={el} key={el?._id} />
        ))}
      </div>
    </div>
  );
}

export default ListBlogs;
