import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "redux/slicers/auth.slicer";
import ICONS from "utils/icons";
import path from "utils/path";

function TopHeader() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="w-full flex justify-center items-center bg-main h-[38px]">
      <div className="w-main flex justify-between items-center">
        <span className="text-white">ORDER ONLINE OR CALL US (03799xxxxx)</span>
        <div className="flex gap-2 items-center">
          {userInfo?.data ? (
            <>
              <span className="text-white">
                Hello {userInfo?.data?.username}
              </span>
              <div
                onClick={() => {
                  dispatch(logout());
                }}
                className="flex items-center gap-1 bg-red-500 border cursor-pointer border-white px-2 rounded-sm text-white"
              >
                logout
                {<ICONS.RiLogoutBoxLine />}
              </div>
            </>
          ) : (
            <Link className="text-white cursor-pointer" to={path.LOGIN}>
              Đăng nhập / Đăng kí
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(TopHeader);
