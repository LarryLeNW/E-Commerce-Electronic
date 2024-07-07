import { ROLE } from "constant/roleUser";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import path from "utils/path";
import AdminSideBar from "./Sidebar";
function AdminLayout() {
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo.data?.role != ROLE.ADMIN)
    return <Navigate to={path.HOME} replace={true} />;

  return (
    <div className="w-full flex bg-zinc-900 min-h-screen relative text-white">
      <div className="w-[327px] flex-none fixed top-0 bottom-0 ">
        <AdminSideBar />
      </div>
      <div className="w-[327px]"></div>
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
