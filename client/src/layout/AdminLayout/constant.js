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
    text: "User Management",
    path: path.ADMIN.USER_MANAGEMENT,
    icon: <ICONS.FaUsersGear />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Category Management",
    path: path.ADMIN.CATEGORY_MANAGEMENT,
    icon: <ICONS.MdCategory />,
  },
  {
    id: 3,
    type: "PARENT",
    text: "Product Management",
    icon: <ICONS.RiProductHuntLine />,
    submenu: [
      {
        id: 1,
        text: "Create Product",
        path: path.ADMIN.UPDATE_PRODUCT,
      },
      {
        id: 2,
        text: "Product Management",
        path: path.ADMIN.PRODUCT_MANAGEMENT,
      },
    ],
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Order Management",
    path: path.ADMIN.ORDER_MANAGEMENT,
    icon: <ICONS.TbPackages />,
  },
];
