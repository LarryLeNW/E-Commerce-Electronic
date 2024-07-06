const path = {
  PUBLIC: "/",
  HOME: "/",
  ALL: "*",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password/:type",
  CONFIRM_REGISTER: "/confirm-register/:status",
  PRODUCTS: "/products",
  OUR_SERVICES: "/services",
  FAQ: "/faqs",
  BLOGS: "/blogs",
  DETAIL_PRODUCT: "/:category/:id/:title",
  ADMIN: {
    HOME: "/admin",
    USER_MANAGEMENT: "/admin/user-management",
    ORDER_MANAGEMENT: "/admin/order-management",
    PRODUCT_MANAGEMENT: "/admin/product-management",
  },
};

export default path;
