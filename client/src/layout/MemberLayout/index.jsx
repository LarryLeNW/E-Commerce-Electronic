import { ROLE } from "constant/roleUser";
import { Navigate, Outlet } from "react-router-dom";
import path from "utils/path";
import MemberSideBar from "./Sidebar";
import Navigation from "pages/user/Components/Navigation";
import TopHeader from "pages/user/Components/TopHeader";
import Header from "pages/user/Components/Header";
import withBaseComponent from "hocs";
import Cookies from "js-cookie";
function MemberLayout({ useSelector }) {
  const { userInfo } = useSelector((state) => state.auth);

  let tokenUser = Cookies.get("refreshToken");

  if (tokenUser && userInfo.loading) {
    return;
  } else if (!userInfo?.data?._id) {
    <Navigate to={path.HOME} replace={true} />;
  }

  return (
    <div className="w-full flex flex-col items-center  ">
      <TopHeader />
      <Header />
      <Navigation />
      <div className="w-full flex flex-col min-h-[80vh]  p-4">
        <div className="w-main flex h-full mx-auto border ">
          <div className="w-[25%]  ">
            <MemberSideBar />
          </div>
          <div className="w-[75%]  bg-gray-200 border">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withBaseComponent(MemberLayout);
