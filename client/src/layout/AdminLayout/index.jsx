import { ROLE } from "constant/roleUser";
import { Navigate, Outlet } from "react-router-dom";
import path from "utils/path";
import AdminSideBar from "./Sidebar";
import withBaseComponent from "hocs";
import Cookies from "js-cookie";

function AdminLayout({ useSelector }) {
  const { userInfo } = useSelector((state) => state.auth);

  let tokenUser = Cookies.get("refreshToken");

  if (tokenUser && userInfo.loading) {
    return;
  } else if (!userInfo?.data?._id || userInfo.data?.role != ROLE.ADMIN) {
    return <Navigate to={path.HOME} replace={true} />;
  }

  return (
    <div className="w-full flex bg-zinc-900 min-h-screen relative text-white overflow-auto">
      <div className="w-[20%] flex-none fixed top-0 bottom-0 ">
        <AdminSideBar />
      </div>
      <div className="w-[20%] bg-red-600"></div>
      <div className="w-[80%] ">
        <Outlet />
      </div>
    </div>
  );
}

export default withBaseComponent(AdminLayout);
