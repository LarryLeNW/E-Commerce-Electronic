import logo from "assets/logo.png";
import { MemberSidebar, MenuAdminSidebar } from "constant";
import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { changeAvatarRequest } from "redux/slicers/auth.slicer";
import ICONS from "utils/icons";

function MemberSideBar() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

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

  const handleChangeAvatar = (file) => {
    const formData = new FormData();
    formData.append("image", file[0]);
    dispatch(changeAvatarRequest(formData));
  };

  return (
    <div className="bg-main rounded h-full select-none w-full flex flex-col text-white">
      <div className="flex flex-col justify-center items-center p-4 border-white border-b gap-2 ">
        <div className="relative">
          <img
            src={
              userInfo.data?.avatar ||
              "https://avatar.iran.liara.run/public/boy"
            }
            alt="img"
            className={`w-[80px] h-[80px] border-2 border-white  rounded-[50%] object-cover`}
          />
          <label
            htmlFor="avatar"
            className="absolute bottom-0 right-0 px-1 bg-gray-300 rounded-[50%] w-7 h-7 flex items-center justify-center border-2"
          >
            {<ICONS.IoMdReverseCamera color="blue" />}
          </label>
        </div>
        <input
          type="file"
          id="avatar"
          accept=".jpg, .jpeg, .png"
          className="hidden"
          onChange={(e) => handleChangeAvatar(e.target.files)}
        />
        <span className="font-semibold">
          Họ và tên : {userInfo.data?.username}
        </span>
      </div>
      <div>
        {MemberSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  `px-4 py-2 flex items-center gap-2 font-bold hover:bg-blue-400 hover:border-y-2  transition-all ${
                    isActive ? "bg-blue-500" : " text-gray-200 "
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
                  className="px-4 py-2 flex items-center gap-5 text-gray-200 hover:bg-blue-500 font-bold cursor-pointer "
                >
                  <div className="flex items-center gap-2">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                  {indexOpenSubmenu.some((i) => i == el.id) ? (
                    <ICONS.IoIosArrowDropdown className="text-[24px]" />
                  ) : (
                    <ICONS.IoIosArrowDropright className="text-[24px]" />
                  )}
                </div>
                {indexOpenSubmenu.some((i) => i == el.id) && (
                  <div className="flex flex-col pl-4">
                    {el.submenu.map((item) => (
                      <NavLink
                        key={item.id}
                        to={item.path}
                        className={({ isActive }) =>
                          `px-4 py-2 flex items-center gap-2 font-bold hover:bg-blue-500 transition-all  ${
                            isActive ? "bg-blue-500" : " text-gray-200 "
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
    </div>
  );
}

export default MemberSideBar;
