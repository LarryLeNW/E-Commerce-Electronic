import { notification } from "antd";
import { deleteCategory, getBlogs } from "apis";
import withBaseComponent from "hocs";
import useDebounce from "hooks/useDebounce";
import moment from "moment";
import { useEffect, useState } from "react";
import { showModal } from "redux/slicers/common.slicer";
import { deleteBlogCategories, getBlogCategories } from "apis/blogCategory";
import path from "utils/path";
import Pagination from "pages/user/ListProduct/Pagination";

function BlogManager({ dispatch, useSelector, navigate }) {
  const [blogs, setBlogs] = useState();
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [categories, setCategories] = useState([]);
  const [params, setParams] = useState({
    keyword: "",
    page: 1,
    limit: process.env.REACT_APP_LIMIT_PRODUCT_PAGE,
  });

  const [isLoadingActions, setIsLoadingActions] = useState({
    loading: false,
    actionId: null,
  });

  const keywordParamDebounce = useDebounce(keyword, 500);

  useEffect(() => {
    handleFilter("keyword", keywordParamDebounce);
  }, [keywordParamDebounce]);

  useEffect(() => {
    fetchBlogs();
  }, [params]);

  useEffect(() => {
    fetchBlogCategories();
  }, []);

  const fetchBlogs = async () => {
    dispatch(showModal({ isShowModal: true, isAction: true }));
    const response = await getBlogs(params);
    setBlogs(response);
    dispatch(showModal({ isShowModal: false }));
  };

  const fetchBlogCategories = async () => {
    const response = await getBlogCategories();
    if (response?.success) setCategories(response?.data);
  };

  const handleMouseEnter = (id) => {
    setHoveredRowId(id);
  };

  const handleMouseLeave = () => {
    setHoveredRowId(null);
  };
  const handleFilter = (key, value) => {
    const newFilterParams = {
      ...params,
      [key]: value,
      page: 1,
      limit: +process.env.REACT_APP_LIMIT_PRODUCT_PAGE,
    };
    setParams(newFilterParams);
  };

  const handleChangePage = (page) => {
    setParams({ ...params, page });
  };

  const handleDelete = async (actionId) => {
    setIsLoadingActions({ loading: true, actionId });
    let response;
    try {
      response = await deleteBlogCategories(actionId);
      if (response.success) fetchBlogs();
      notification.success({
        message: "deleted successfully",
        duration: 1,
      });
    } catch (error) {
      notification.error({ message: "Delete failed..." });
    }
    setIsLoadingActions({ loading: false, actionId: null });
  };

  return (
    <div className="w-full p-4 flex flex-col  overflow-x-auto min-h-full ">
      <div className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-blue-300">
        Blog Management
      </div>

      <div className="p-4 ">
        <div className="flex justify-around gap-2 items-center p-4 text-black  ">
          <div className="border border-main p-2 flex-1 rounded h-full flex flex-col gap-2 ">
            <span className="text-white">SORT BY :</span>
            <select
              name="sort"
              id=""
              onChange={(e) => handleFilter("sort", e.target.value)}
              className="w-full text-black"
            >
              <option className=" p-2" value="" disabled>
                Option
              </option>
              <option className=" p-2" value="title">
                A-Z
              </option>
              <option className=" p-2" value="-title">
                Z-A
              </option>
              <option className=" p-2" value="numberViews">
                Low To High View
              </option>
              <option className=" p-2" value="-numberViews">
                Hight To Low View
              </option>
              <option className=" p-2" value="-totalReaction">
                High To Low Reaction
              </option>
              <option className=" p-2" value="totalReaction">
                Low To Hight Reaction
              </option>
            </select>
          </div>
          <div className="border border-main p-2 flex-1  rounded h-full flex flex-col gap-2 ">
            <span className="text-white">Search By Category :</span>
            <select
              name="sort"
              id=""
              className="w-full text-black"
              onChange={(e) => {
                if (e.target.value === "all") {
                  const { category, prevParams } = params;
                  setParams(prevParams);
                  return;
                }
                handleFilter("category", e.target.value);
              }}
            >
              <option className=" p-2" value="all">
                all categories
              </option>
              {categories?.map((el) => (
                <option className=" p-2" key={el?.title} value={el?.title}>
                  {el?.title}
                </option>
              ))}
            </select>
          </div>
          <div className="border border-main p-2 flex-1  rounded h-full flex  gap-2 items-center">
            <input
              type="text"
              placeholder="search by keyword..."
              className="p-4 w-fit  outline-main rounded"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              className=" text-white cursor-pointer border bg-green-600"
              onClick={() => navigate(path.ADMIN.UPDATE_BLOG)}
            >
              Create New
            </button>
          </div>
        </div>
        <div className="w-full text-right">
          <Pagination
            currentPage={params?.page}
            totalCount={blogs?.counts}
            handleChangePage={handleChangePage}
          ></Pagination>
        </div>
        <div className="flex flex-col border justify-between ">
          <table className="table-auto mb-1 text-left w-full border-separate border border-slate-400">
            <thead className="font-bold bg-gray-700 text-[13px] text-center border border-blue-300   ">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Total Views</th>
                <th className="px-4 py-2">Total Reactions</th>
                <th className="px-4 py-2">Post By</th>
                <th className="px-4 py-2">Create At</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs?.data?.map((blog, index) => (
                <tr
                  key={blog._id}
                  className="hover-row relative"
                  onMouseEnter={() => handleMouseEnter(blog._id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <td className="px-4 py-2 border border-slate-500  ">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{blog.title}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{blog.category}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{blog.numberViews}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{blog.totalReaction}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{blog.author?.username}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{moment(blog?.createdAt).format("DD/MM/YYYY")}</span>
                  </td>
                  <td className="px-4 py-2  flex justify-around flex-wrap gap-5">
                    <button
                      className="px-2 bg-blue-600 w-full  cursor-pointer border  "
                      onClick={() => {
                        navigate({
                          pathname: path.ADMIN.UPDATE_BLOG,
                          search: `?edit=true&bid=${blog?._id}`,
                        });
                      }}
                    >
                      edit
                    </button>
                    <button
                      className="px-2 text-light w-full cursor-pointer border bg-red-600 "
                      disabled={isLoadingActions.loading}
                      onClick={() => handleDelete(blog?._id)}
                    >
                      {isLoadingActions.actionId == blog?._id
                        ? "Loading..."
                        : "Delete"}
                    </button>
                  </td>
                  {hoveredRowId === blog._id && (
                    <div className="absolute w-[200px] h-[200px] rounded top-[-180px] transition ease-in  left-0 bg-gray-200 z-20 border-2 border-main shadow-md p-4">
                      <img
                        src={blog?.thumb}
                        alt="thumb image"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default withBaseComponent(BlogManager);
