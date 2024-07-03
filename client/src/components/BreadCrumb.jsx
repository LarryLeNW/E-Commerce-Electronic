import { Link } from "react-router-dom";
import useReactRouterBreadcrumbs from "use-react-router-breadcrumbs";
import ICONS from "utils/icons";

function BreadCrumb({ title, category }) {
  const routes = [
    { path: "/:category", breadcrumb: category },
    { path: "/", breadcrumb: "Home" },
    { path: "/:category/:pid/:title", breadcrumb: title },
  ];

  const breadcrumbs = useReactRouterBreadcrumbs(routes);
  return (
    <div className="text-sm flex items-center gap-2">
      {breadcrumbs
        ?.filter((el) => !el.match.route == false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link
            className="flex items-center hover:text-main"
            key={match.pathname}
            to={match.pathname}
          >
            <span>{breadcrumb}</span>
            {index !== self.length - 1 && <ICONS.IoMdArrowRoundForward />}
          </Link>
        ))}
    </div>
  );
}

export default BreadCrumb;
