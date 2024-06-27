import { NavLink } from "react-router-dom";
import { navigations } from "../utils/constrans";

function Navigation() {
  return (
    <div className="w-main h-[48px] py-2 border text-sm flex items-center mb-6">
      {navigations.map((el) => (
        <NavLink
          to={`/${el.path}`}
          key={el.id}
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
