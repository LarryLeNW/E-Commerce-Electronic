import ICONS from "utils/icons";
import path from "utils/path";

export const menuAdminSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Dashboard",
    path: path.ADMIN.HOME,
    icon: <ICONS.AiFillDashboard />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Users",
    path: path.ADMIN.USER_MANAGEMENT,
    icon: <ICONS.FaUsersGear />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Categories ",
    path: path.ADMIN.CATEGORY_MANAGEMENT,
    icon: <ICONS.MdCategory />,
  },
  {
    id: 3,
    type: "PARENT",
    text: "Products",
    icon: <ICONS.RiProductHuntLine />,
    submenu: [
      {
        id: 1,
        text: "Create Product",
        path: path.ADMIN.UPDATE_PRODUCT,
      },
      {
        id: 2,
        text: "Management",
        path: path.ADMIN.PRODUCT_MANAGEMENT,
      },
    ],
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Blog Categories",
    path: path.ADMIN.BLOG_CATEGORY_MANAGEMENT,
    icon: <ICONS.TbPackages />,
  },
  {
    id: 5,
    type: "SINGLE",
    text: "Blogs",
    path: path.ADMIN.BLOG_MANAGEMENT,
    icon: <ICONS.TbPackages />,
  },
  {
    id: 6,
    type: "SINGLE",
    text: "Orders",
    path: path.ADMIN.ORDER_MANAGEMENT,
    icon: <ICONS.TbPackages />,
  },
];
