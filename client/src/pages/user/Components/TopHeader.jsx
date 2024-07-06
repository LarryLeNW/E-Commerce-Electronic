import { memo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "redux/slicers/auth.slicer";
import path from "utils/path";

function TopHeader() {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex justify-center items-center bg-main h-[38px]">
      <div className="w-main flex justify-between items-center">
        <span className="text-white">ORDER ONLINE OR CALL US (03799xxxxx)</span>
        <Link className="text-white" to={path.LOGIN}>
          Sign In or Create Account{" "}
        </Link>
        <div
          onClick={() => {
            dispatch(logout());
          }}
        >
          logout
        </div>
      </div>
    </div>
  );
}

export default memo(TopHeader);
