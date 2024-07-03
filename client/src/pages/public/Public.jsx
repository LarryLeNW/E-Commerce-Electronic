import { Outlet } from "react-router-dom";
import Header from "pages/public/Components/Header";
import Navigation from "pages/public/Components/Navigation";
import TopHeader from "pages/public/Components/TopHeader";
import Footer from "pages/public/Components/Footer";

function Public() {
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

export default Public;
