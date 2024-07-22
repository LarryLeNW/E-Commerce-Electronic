import { getBlogs } from "apis";
import DOMPurify from "dompurify";
import withBaseComponent from "hocs";
import { useEffect, useState } from "react";
import { getBlogDetailRequest } from "redux/slicers/blog.slicer";
import Blog from "../ListBlogs/Blog";

function DetailBlog({ params, useSelector, dispatch }) {
  const { blogDetail } = useSelector((state) => state.blog);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const { id, category } = params;

  const fetchRelatedBlogs = async () => {
    const params = { limit: 8, category };
    const response = await getBlogs(params);
    setRelatedBlogs(response?.data);
  };

  useEffect(() => {
    dispatch(getBlogDetailRequest({ id }));
    fetchRelatedBlogs();
    window.scroll(0, 0);
  }, []);

  return (
    <div className="flex flex-col   p-4">
      <div className="w-main flex flex-col justify-center items-center bg-gray-300 p-2 mx-auto">
        <div className="my-2 italic text-3xl text-blue-700">
          {blogDetail.data?.title}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blogDetail.data?.description),
          }}
        ></div>
      </div>
      <div className="mt-2">
        <h1 className="border-b border-main text-main text-3xl font-bold">
          Blogs liên quan
        </h1>
        <div className="px-1 py-2 flex flex-wrap gap-2 items-center overflow-y-auto">
          {relatedBlogs.map((blog) => (
            <Blog data={blog} key={blog?._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default withBaseComponent(DetailBlog);
