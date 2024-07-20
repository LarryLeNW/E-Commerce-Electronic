import logo from "assets/logo.png";
import { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "redux/slicers/auth.slicer";
import ICONS from "utils/icons";
import { menuAdminSidebar } from "../constant";

function AdminSideBar() {
  const dispatch = useDispatch();

  const [indexOpenSubmenu, setIndexOpenSubmenu] = useState([]);

  const handleOpenSubmenu = (id) => {
    const newIndexOpenSubmenu = [...indexOpenSubmenu];
    if (newIndexOpenSubmenu.includes(id)) {
      newIndexOpenSubmenu.splice(newIndexOpenSubmenu.indexOf(id), 1);
    } else {
      newIndexOpenSubmenu.push(id);
    }
    setIndexOpenSubmenu(newIndexOpenSubmenu);
  };

  return (
    <div className=" bg-zinc-800 h-full select-none w-full flex flex-col">
      <div className="flex flex-col justify-center items-center p-4 border-white border-b  ">
        <img
          src={logo}
          alt="img"
          className={`w-[200px] drop-shadow-[-10px_0_10px_aqua] `}
        />
        <small>Admin workspace</small>
      </div>
      <div>
        {menuAdminSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  `px-4 py-2 flex items-center gap-2 font-bold hover:bg-gray-500 transition-all ${
                    isActive ? "bg-gray-500" : " text-gray-200 "
                  }`
                }
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === "PARENT" && (
              <div>
                <div
                  onClick={() => handleOpenSubmenu(el.id)}
                  className="px-4 py-2 flex items-center gap-5 text-gray-200 hover:bg-gray-500 font-bold cursor-pointer "
                >
                  <div className="flex items-center gap-2">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                  {indexOpenSubmenu.some((i) => i == el.id) ? (
                    <ICONS.IoIosArrowDropdown className="text-[24px] ml-auto " />
                  ) : (
                    <ICONS.IoIosArrowDropright className="text-[24px] ml-auto" />
                  )}
                </div>
                {indexOpenSubmenu.some((i) => i == el.id) && (
                  <div className="flex flex-col pl-4">
                    {el.submenu.map((item) => (
                      <NavLink
                        key={item.id}
                        to={item.path}
                        className={({ isActive }) =>
                          `px-4 py-2 flex items-center gap-2 font-bold hover:bg-gray-300 hover:text-main transition-all  ${
                            isActive ? "bg-gray-500 " : " text-gray-200 "
                          }`
                        }
                      >
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <button
        onClick={() => dispatch(logout())}
        className="w-full mt-auto bg-red-600 py-5 flex justify-center items-center gap-2 rounded-none font-bold text-white hover:bg-red-700 transition-all "
      >
        <ICONS.RiLogoutBoxLine />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default AdminSideBar;
