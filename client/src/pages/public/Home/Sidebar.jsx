import { useEffect } from "react";
import { convertSlug } from "utils/helper";
import { NavLink, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesRequest } from "redux/slicers/category.slicer";
import path from "utils/path";
import QueryString from "qs";
import ICONS from "utils/icons";
import { setFilterParams } from "redux/slicers/common.slicer";

function Sidebar() {
  const dispatch = useDispatch();
  const { data: categories, loading } = useSelector((state) => state.category);
  const { filterParams } = useSelector((state) => state.common);

  useEffect(() => {
    dispatch(getCategoriesRequest());
  }, []);

  return (
    <div className="flex flex-col border rounded">
      <div className="px-5 pt-[15px] pb-[14px] bg-main text-white flex gap-1  items-center ">
        <ICONS.AiOutlineMenu />
        <span> DANH SÁCH DANH MỤC</span>
      </div>

      {categories.map((cate, index) => (
        <NavLink
          key={index}
          onClick={() =>
            dispatch(
              setFilterParams({
                ...filterParams,
                category: cate.title,
              })
            )
          }
          to={{
            pathname: path.PRODUCTS,
            search: QueryString.stringify({
              ...filterParams,
              category: cate.title,
            }),
          }}
          className={({ isActive }) =>
            `px-5 pt-[15px] pb-[14px] text-sm hover:bg-main hover:text-white border  ${
              isActive && "bg-main text-white"
            }`
          }
        >
          {cate?.title}
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;
