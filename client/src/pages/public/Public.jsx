import { Outlet } from "react-router-dom";
import Header from "components/Header";
import Navigation from "components/Navigation";
import TopHeader from "components/TopHeader";
import Footer from "components/Footer";

function Public() {
  return (
    <div className="w-full flex flex-col items-center">
      <TopHeader />
      <Header />
      <Navigation />
      <div className="w-main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Public;
