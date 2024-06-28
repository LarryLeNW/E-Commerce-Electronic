import { Link } from "react-router-dom";
import logo from "assets/logo.png";
import ICON from "utils/icons";
import path from "utils/path";
function Header() {
  return (
    <div className="w-main border flex justify-between items-center h-[110px] py-[35px]">
      <Link to={`${path.HOME}`}>
        <img src={logo} alt="" className="w-[140px] object-contain " />
      </Link>
      <div className="flex text-[13px] gap-4">
        <div className="flex flex-col  items-center border-r px-6">
          <span className="flex gap-4 items-center">
            <ICON.RiPhoneFill className="text-main" />
            <span className="font-semibold">(84+)888 888 888</span>
          </span>
          <span className="text-main">MON-SAT 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col  items-center border-r px-6">
          <span className="flex gap-4 items-center">
            <ICON.IoMdMail className="text-main" />
            <span className="font-semibold">trinhlek4@gmail.com</span>
          </span>
          <span className="text-main">SUPPORT ONLINE 24/7</span>
        </div>
        <div className="flex items-center justify-center gap-2 border-r px-6">
          <ICON.LuBaggageClaim />
          <span>0 item(s)</span>
        </div>

        <div className="flex items-center justify-center px-4">
          <ICON.FaUserCircle size={26} />
        </div>
      </div>
    </div>
  );
}

export default Header;
