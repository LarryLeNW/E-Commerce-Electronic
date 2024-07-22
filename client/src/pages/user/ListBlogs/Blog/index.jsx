import moment from "moment";
import { generatePath, useNavigate } from "react-router-dom";
import path from "utils/path";

function Blog({ data }) {
  const navigate = useNavigate();
  return (
    <div
      key={data?._id}
      className="border-2 p-2  cursor-pointer flex flex-col gap-2 rounded w-[310px] min-h-[330px]"
      onClick={() => {
        navigate(
          generatePath(path.DETAIL_BLOG, {
            id: data._id,
            category: data.category,
          })
        );
      }}
    >
      <div className="relative ">
        <img
          src={data?.thumb}
          alt="thumb"
          className="w-[300px] h-[200px]  object-cover"
        />
        <div className="absolute bottom-0 left-0 px-2 py-1 bg-gray-400 text-white rounded">
          {data?.category}
        </div>
      </div>
      <div className="font-semibold">{data?.title}</div>
      <div className="flex justify-between mt-auto">
        <span className="flex gap-2">
          <img
            src={data?.author?.avatar}
            alt="avatar"
            className="w-[20px] h-[20px] object-cover"
          />
          <span>{data?.author?.username}</span>
        </span>
        <span className="text-gray-400">
          {moment(data?.createdAt).format("DD/MM/YYYY")}
        </span>
      </div>
    </div>
  );
}

export default Blog;
