import { Outlet } from "react-router-dom";
import Header from "pages/user/Components/Header";
import Navigation from "pages/user/Components/Navigation";
import TopHeader from "pages/user/Components/TopHeader";
import Footer from "pages/user/Components/Footer";

function UserLayout() {
  return (
    <div className="w-full flex flex-col items-center">
      <TopHeader />
      <Header />
      <Navigation />
      <div className="w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;
