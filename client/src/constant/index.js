import ICONS from "utils/icons";
import path from "utils/path";

// for ProductDetail page
export const ProductExtraInformation = [
  {
    id: 1,
    title: "Guarantee",
    sub: "Quality checked",
    icon: <ICONS.BsShieldShaded />,
  },
  {
    id: 2,
    title: "Free Shipping",
    sub: "Free on all products",
    icon: <ICONS.RiTruckFill />,
  },
  {
    id: 3,
    title: "Special gift cards",
    sub: "Special gift cards",
    icon: <ICONS.AiFillGift />,
  },
  {
    id: 4,
    title: "Free return",
    sub: "Within 7 days",
    icon: <ICONS.BsReplyFill />,
  },
  {
    id: 5,
    title: "Consultancy",
    sub: "Lifetime 24/7/356",
    icon: <ICONS.FaTty />,
  },
];

// for ProductDetail page
export const DescriptionProductTabs = [
  {
    id: 0,
    name: "DESCRIPTION",
    content: "content description",
  },
  {
    id: 1,
    name: "WARRANTY",
    content: "content WARRANTY",
  },
  {
    id: 2,
    name: "DELIVERY",
    content: "content DELIVERY",
  },
  {
    id: 3,
    name: "PAYMENT",
    content: "content PAYMENT",
  },
  {
    id: 4,
    name: "CUSTOMER REVIEW",
    content: "content CUSTOMER REVIEW",
  },
];

export const MenuAdminSidebar = [
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
    id: 3,
    type: "PARENT",
    text: "Product Management",
    icon: <ICONS.AiFillProduct />,
    submenu: [
      {
        id: 1,
        text: "Create Product",
        path: path.ADMIN.CREATE_PRODUCT,
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
