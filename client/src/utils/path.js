const path = {
  PUBLIC: "/",
  HOME: "/",
  ALL: "*",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password/:type",
  CONFIRM_REGISTER: "/confirm-register/:status",
  PRODUCTS: "/:category",
  OUR_SERVICES: "/services",
  FAQ: "/faqs",
  BLOGS: "/blogs",
  DETAIL_PRODUCT: "/:category/:id/:title",
  ADMIN: {
    HOME: "/admin/home",
    // DEMO
    PRODUCTS: "/admin/products",
    ORDERS: "/admin/orders",
    USERS: "/admin/users",
    BLOGS: "/admin/blogs",
    SERVICES: "/admin/services",
    FAQS: "/admin/faqs",
    CONTACTS: "/admin/contacts",
    STATISTICS: "/admin/statistics",
    SETTINGS: "/admin/settings",
    LOGOUT: "/admin/logout",
    LOGIN: "/admin/login",
    FORGOT_PASSWORD: "/admin/forgot-password/:type",
    CONFIRM_REGISTER: "/admin/confirm-register/:status",
  },
};

export default path;
