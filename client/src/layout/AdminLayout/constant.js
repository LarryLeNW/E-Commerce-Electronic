import ICONS from "utils/icons";
import path from "utils/path";

export const menuAdminSidebar = [
  // {
  //   id: 1,
  //   type: "SINGLE",
  //   text: "Dashboard",
  //   path: path.ADMIN.HOME,
  //   icon: <ICONS.AiFillDashboard />,
  // },
  {
    id: 2,
    type: "SINGLE",
    text: "User Management",
    path: path.ADMIN.USER_MANAGEMENT,
    icon: <ICONS.FaUsersGear />,
  },
  {
    id: 3,
    type: "PARENT",
    text: "Product Management",
    icon: <ICONS.RiProductHuntLine />,
    submenu: [
      {
        id: 1,
        text: "Categories",
        path: path.ADMIN.PRODUCT_CATEGORY_MANAGEMENT,
      },
      {
        id: 2,
        text: "Create Quickly",
        path: path.ADMIN.UPDATE_PRODUCT,
      },
      {
        id: 3,
        text: "List Product",
        path: path.ADMIN.PRODUCT_MANAGEMENT,
      },
    ],
  },
  {
    id: 4,
    type: "PARENT",
    text: "Blog Management",
    icon: <ICONS.TbPackages />,
    submenu: [
      {
        id: 1,
        text: "Categories",
        path: path.ADMIN.BLOG_CATEGORY_MANAGEMENT,
      },
      {
        id: 2,
        text: "List",
        path: path.ADMIN.BLOG_MANAGEMENT,
      },
      {
        id: 2,
        text: "Create Quickly",
        path: path.ADMIN.UPDATE_BLOG,
      },
    ],
  },
  {
    id: 5,
    type: "PARENT",
    text: "Order Manager",
    icon: <ICONS.TbPackages />,
    submenu: [
      {
        id: 1,
        text: "List",
        path: path.ADMIN.ORDER_MANAGEMENT,
      },
      {
        id: 2,
        text: "Create Quickly",
        path: path.ADMIN.UPDATE_ORDER,
      },
    ],
  },
];
