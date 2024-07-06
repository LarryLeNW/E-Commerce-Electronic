import { NavLink } from "react-router-dom";
import { navigations } from "utils/constrans";

function Navigation() {
  return (
    <div className="w-main h-[48px] py-2 border text-sm flex items-center ">
      {navigations.map((el, index) => (
        <NavLink
          to={`${el.path}`}
          key={index}
          className={({ isActive }) =>
            `px-4 ${isActive ? "text-main" : "hover:text-main"} `
          }
        >
          {el.value}
        </NavLink>
      ))}
    </div>
  );
}

export default Navigation;
