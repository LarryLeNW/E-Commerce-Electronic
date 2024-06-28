import { useEffect } from "react";
import { convertSlug } from "utils/helper";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesRequest } from "redux/slicers/category.slicer";

function Sidebar() {
  const dispatch = useDispatch();
  const { data: categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoriesRequest());
  }, []);

  return (
    <div className="flex flex-col border">
      {categories.map((el, index) => (
        <NavLink
          key={index}
          to={convertSlug(el?.title)}
          className={({ isActive }) =>
            `px-5 pt-[15px] pb-[14px] text-sm hover:bg-main hover:text-white ${
              isActive && "bg-main text-white"
            }`
          }
        >
          {el?.title}
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;
