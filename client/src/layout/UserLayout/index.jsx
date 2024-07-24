import { Outlet } from "react-router-dom";
import Header from "pages/user/Components/Header";
import Navigation from "pages/user/Components/Navigation";
import Footer from "pages/user/Components/Footer";

function UserLayout() {
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <Navigation />
      <div className="w-full flex flex-col  min-h-[80vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;
