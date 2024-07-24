import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearFilterParams } from "redux/slicers/common.slicer";
import { navigations } from "utils/constrans";
import ICONS from "utils/icons";

function Navigation() {
  const dispatch = useDispatch();
  return (
    <div className="fixed top-0 bg-white z-30 w-full h-[48px] py-2 border-y border-gray-200 text-sm flex justify-center items-center">
      <div className="w-main flex items-center justify-between mx-auto">
        <div className="flex gap-4">
          <span className="font-bold text-blue-600 text-lg list-roman">
            Cam kết
          </span>
          <span className="flex px-2 gap-2 items-center">
            <ICONS.AiFillDashboard color="blue" />
            <span>100% hàng thật</span>
          </span>
          <span className="flex border-l px-2 gap-2 items-center">
            <ICONS.AiFillDashboard color="blue" />
            <span>Hoàn 200% nếu hàng giả</span>
          </span>
          <span className="flex border-l px-2 gap-2 items-center">
            <ICONS.AiFillDashboard color="blue" />
            <span>30 ngày đổi trả</span>
          </span>
        </div>
        <div>
          {navigations.map((el, index) => {
            return (
              <NavLink
                to={`${el.path}`}
                key={index}
                className={({ isActive }) =>
                  `px-4 font-bold text-main transition-all ${
                    isActive ? "text-lg " : "hover:text-lg"
                  } `
                }
                onClick={() => dispatch(clearFilterParams())}
              >
                {el.value}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
