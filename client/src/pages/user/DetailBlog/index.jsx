import { getBlogs, reactBlog } from "apis";
import DOMPurify from "dompurify";
import withBaseComponent from "hocs";
import { useEffect, useState } from "react";
import {
  getBlogDetailRequest,
  reactBlogRequest,
} from "redux/slicers/blog.slicer";
import Blog from "../ListBlogs/Blog";
import moment from "moment";
import ICONS from "utils/icons";
import { Breadcrumb, Space } from "antd";
import { Link } from "react-router-dom";
import path from "utils/path";
import QueryString from "qs";
import { setFilterParams } from "redux/slicers/common.slicer";

function DetailBlog({ params, useSelector, dispatch, checkLoginBeforeAction }) {
  const { blogDetail } = useSelector((state) => state.blog);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const { filterParams } = useSelector((state) => state.common);
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
  }, [id]);

  const handleReact = async (id, type) => {
    checkLoginBeforeAction(() => {
      dispatch(reactBlogRequest({ id, type }));
    });
  };

  return (
    <div className="flex flex-col  p-4">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to={path.HOME}>
                    <Space>
                      <ICONS.AiFillHome />
                      <span>Trang chủ</span>
                    </Space>
                  </Link>
                ),
              },
              {
                title: <Link to={path.BLOGS}>Danh sách blogs</Link>,
              },
              {
                title: (
                  <Link
                    to={{
                      pathname: path.BLOGS,
                      search: QueryString.stringify({
                        ...filterParams,
                        category,
                      }),
                    }}
                  >
                    {category}
                  </Link>
                ),
                onClick: () =>
                  dispatch(
                    setFilterParams({
                      ...filterParams,
                      category,
                    })
                  ),
              },
              {
                title: blogDetail.data?.title,
              },
            ]}
            style={{ marginBottom: 8 }}
          />
        </div>
      </div>
      <div className="w-main flex flex-col justify-center items-center bg-gray-300 p-2 mx-auto">
        <div className="ml-auto">
          <div className="flex justify-between gap-2">
            <span className="flex gap-2">
              <img
                src={blogDetail.data?.author?.avatar}
                alt="avatar"
                className="w-[20px] h-[20px] object-cover"
              />
              <span>{blogDetail.data?.author?.username}</span>
            </span>
            <span className="text-gray-400">
              {moment(blogDetail.data?.createdAt).format("DD/MM/YYYY")}
            </span>
          </div>
        </div>
        <div className="my-2 italic text-3xl text-blue-700">
          {blogDetail.data?.title}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blogDetail.data?.description),
          }}
        ></div>
      </div>
      <div className=" w-main mx-auto">
        <div className="flex gap-2 mt-2 justify-between text-lg">
          <div className="flex gap-5">
            <span
              className="flex gap-2 items-center bg-blue-700 text-white px-4 py-2 rounded cursor-pointer hover:opacity-90"
              onClick={() => handleReact(blogDetail.data?._id, "like")}
            >
              <span>
                {
                  blogDetail.data?.interactions?.filter(
                    (interaction) => interaction.type === "like"
                  ).length
                }
              </span>
              <ICONS.AiOutlineLike />
            </span>
            <span
              className="flex gap-2 items-center bg-blue-700 text-white px-4 py-2 rounded cursor-pointer hover:opacity-90"
              onClick={() => handleReact(blogDetail.data?._id, "dislike")}
            >
              <span>
                {
                  blogDetail.data?.interactions?.filter(
                    (interaction) => interaction.type === "dislike"
                  ).length
                }
              </span>
              <ICONS.AiOutlineDislike />
            </span>
          </div>
          <div
            className="flex gap-2 items-center bg-gray-700 text-white px-4 py-2 rounded cursor-pointer hover:opacity-90"
            title="Chưa phát triển"
          >
            <ICONS.FaShareFromSquare />
          </div>
        </div>
      </div>
      <div className="mt-2 w-full flex flex-col  ">
        <h1 className="border-b border-main text-main text-3xl font-bold">
          Blogs liên quan
        </h1>
        <div className="px-1 py-2 flex flex-wrap gap-2 items-center justify-around">
          {relatedBlogs.map((blog) => (
            <Blog data={blog} key={blog?._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default withBaseComponent(DetailBlog);
