import { Link } from "react-router-dom";
import logo from "assets/logo.png";
import ICON from "utils/icons";
import path from "utils/path";
import { useState } from "react";
import ICONS from "utils/icons";
import { useClickOutside } from "hooks/useClickOutside";
import withBaseComponent from "hocs";
import { showModal } from "redux/slicers/common.slicer";
import CartReview from "components/CartReview";
function Header({ useSelector, dispatch }) {
  const { userInfo } = useSelector((state) => state.auth);
  const [isShowMenuMember, setIsShowMenuMember] = useState(false);

  const menuRef = useClickOutside(() => {
    setIsShowMenuMember(false);
  });

  return (
    <div className="w-main border flex justify-between items-center h-[110px] py-[35px] select-none">
      <Link to={`${path.HOME}`}>
        <img src={logo} alt="" className="w-[140px] object-contain " />
      </Link>
      <div className="flex text-[13px] gap-4">
        <div className="flex flex-col  items-center border-r px-6">
          <span className="flex gap-4 items-center">
            <ICON.RiPhoneFill className="text-main" />
            <span className="font-semibold">(84+)888 888 888</span>
          </span>
          <span className="text-main">MON-SAT 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col  items-center border-r px-6">
          <span className="flex gap-4 items-center">
            <ICON.IoMdMail className="text-main" />
            <span className="font-semibold">trinhlek4@gmail.com</span>
          </span>
          <span className="text-main">SUPPORT ONLINE 24/7</span>
        </div>
        <div
          className="flex items-center justify-center gap-2 border-r px-6 cursor-pointer"
          onClick={() =>
            dispatch(showModal({ children: <CartReview />, isShowModal: true }))
          }
        >
          <ICON.LuBaggageClaim />
          <span>{userInfo.data?.cart.length || 0} item(s)</span>
        </div>
        {userInfo?.data && (
          <div
            className="flex items-center justify-center px-4 relative"
            ref={menuRef}
          >
            <img
              src={
                userInfo.data?.avatar ||
                "https://avatar.iran.liara.run/public/boy"
              }
              alt=""
              className="w-[40px] h-[40px] rounded-[50%]  object-cover cursor-pointer"
              onClick={() => setIsShowMenuMember(true)}
            />
            {isShowMenuMember && (
              <div className="absolute top-[50px] right-[20px] text-black bg-white  w-[200px] flex flex-col border rounded-xl">
                <Link
                  onClick={() => setIsShowMenuMember(false)}
                  className="px-6 py-2 border hover:bg-main hover:text-white font-bold text-lg  rounded-t-xl"
                  to={path.MEMBER.PROFILE}
                >
                  Profile
                </Link>
                <Link
                  onClick={() => setIsShowMenuMember(false)}
                  className="px-6 py-2 border hover:bg-main hover:text-white font-bold text-lg"
                  to={path.MEMBER.PROFILE}
                >
                  Profile
                </Link>
                <Link
                  onClick={() => setIsShowMenuMember(false)}
                  className="px-6 py-2 border hover:bg-main hover:text-white font-bold text-lg"
                  to={path.MEMBER.PROFILE}
                >
                  Profile
                </Link>
                <button className="bg-red-600 w-full rounded-b-xl text-white font-bold  rounded-none text-lg flex justify-center items-center gap-2">
                  <ICONS.RiLogoutBoxLine />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default withBaseComponent(Header);
