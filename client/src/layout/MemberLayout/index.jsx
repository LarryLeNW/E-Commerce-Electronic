import { ROLE } from "constant/roleUser";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import path from "utils/path";
import MemberSideBar from "./Sidebar";
import Navigation from "pages/user/Components/Navigation";
import TopHeader from "pages/user/Components/TopHeader";
import Header from "pages/user/Components/Header";
function MemberLayout() {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo.data) return <Navigate to={path.HOME} replace={true} />;

  return (
    <div className="w-full flex flex-col items-center">
      <TopHeader />
      <Header />
      <Navigation />
      <div className="w-full flex flex-col h-[73vh]">
        <div className="w-main flex h-full mx-auto border ">
          <div className="w-[25%]  ">
            <MemberSideBar />
          </div>
          <div className="w-[75%] h-full bg-gray-200 border">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberLayout;