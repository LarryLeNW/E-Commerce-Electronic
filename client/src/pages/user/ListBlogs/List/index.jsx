import withBaseComponent from "hocs";
import { useEffect, useRef, useState } from "react";
import { getBlogListRequest } from "redux/slicers/blog.slicer";
import {
  clearFilterParams,
  setFilterParams,
} from "redux/slicers/common.slicer";
import Blog from "../Blog";
import Button from "components/Form/Button";
import Pagination from "components/Pagination";
import path from "utils/path";
import QueryString from "qs";
import ICONS from "utils/icons";
import useDebounce from "hooks/useDebounce";

function List({ useSelector, dispatch, navigate }) {
  const { filterParams } = useSelector((state) => state.common);
  const { blogList } = useSelector((state) => state.blog);
  const [keyword, setKeyword] = useState("");
  const lastBlogRef = useRef(null);
  const searchDebounce = useDebounce(keyword, 600);

  useEffect(() => {
    handleFilter("keyword", searchDebounce);
  }, [searchDebounce]);

  useEffect(() => {
    dispatch(
      getBlogListRequest({
        ...filterParams,
        page: 1,
        limit: +process.env.REACT_APP_LIMIT_BLOG_PAGE,
      })
    );
    window.scrollTo(0, 0);
    return () => dispatch(clearFilterParams());
  }, []);

  useEffect(() => {
    dispatch(
      getBlogListRequest({
        ...filterParams,
        page: 1,
        limit: +process.env.REACT_APP_LIMIT_BLOG_PAGE,
      })
    );
  }, [filterParams]);

  const handleShowMore = () => {
    dispatch(
      getBlogListRequest({
        ...filterParams,
        page: blogList.meta.page + 1,
        limit: +process.env.REACT_APP_LIMIT_BLOG_PAGE,
        more: true,
      })
    );
  };

  const handleChangePage = (type) => {
    let targetPage;
    if (Number(type)) targetPage = type;
    if (type === "next")
      targetPage =
        blogList.meta?.page === blogList.meta?.totalPage
          ? 1
          : blogList.meta?.page + 1;

    if (type === "prev")
      targetPage =
        blogList.meta?.page === 1
          ? blogList.meta?.totalPage
          : blogList.meta?.page - 1;

    dispatch(
      getBlogListRequest({
        ...filterParams,
        page: targetPage,
        limit: +process.env.REACT_APP_LIMIT_BLOG_PAGE,
      })
    );
  };

  const handleFilter = (key, value) => {
    const newFilterParams = {
      ...filterParams,
      [key]: value,
      page: 1,
      limit: +process.env.REACT_APP_LIMIT_BLOG_PAGE,
    };

    dispatch(setFilterParams(newFilterParams));

    dispatch(getBlogListRequest(newFilterParams));

    navigate({
      pathname: path.BLOGS,
      search: QueryString.stringify(newFilterParams),
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-main border-b-2 border-main font-bold text-lg">
        Danh sách blog
      </h1>
      <div className="flex bg-gray-300 justify-between items-center p-2 mt-2 gap-5">
        <div className="my-2  rounded py-2 flex pr-3 bg-white border-main flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm blog theo keyword"
            className="outline-none flex-1 px-2"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
          <button className="border border-main w-fit px-8 bg-main">
            {<ICONS.IoIosSearch size={20} color="white" />}
          </button>
        </div>
        <div className="flex gap-2 items-center ">
          <span className="text-main ">
            {`${blogList.meta?.page} / ${blogList.meta?.totalPage} `}
          </span>
          <div>
            <button
              onClick={() => handleChangePage("prev")}
              className="p-2 w-[40px] rounded-none bg-gray-400 border-r"
            >
              {"<"}
            </button>
            <button
              onClick={() => handleChangePage("next")}
              className="p-2 w-[40px] bg-gray-400 rounded-none"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
      <div className="px-1 py-2 flex flex-wrap gap-1 items-center  overflow-y-auto max-h-screen">
        {blogList?.data.map((el, index) => (
          <Blog
            data={el}
            key={el?._id}
            ref={index === blogList.data.length - 1 ? lastBlogRef : null}
          />
        ))}
      </div>
      <Button
        style={"text-center mt-2 p-2 cursor-pointer"}
        disabled={blogList.meta?.page === blogList.meta?.totalPage}
        handleClick={handleShowMore}
        name={"Hiển thị thêm"}
      />
      <Pagination
        totalCount={blogList.meta.totalBlogs}
        currentPage={blogList.meta.page}
        handleChangePage={handleChangePage}
        pageSizeParam={process.env.REACT_APP_LIMIT_BLOG_PAGE}
      />
    </div>
  );
}

export default withBaseComponent(List);
