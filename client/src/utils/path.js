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
  DETAIL_CART: "detail-cart",
  ADMIN: {
    HOME: "/admin/dashboard",
    USER_MANAGEMENT: "/admin/user-management",
    ORDER_MANAGEMENT: "/admin/order-management",
    PRODUCT_MANAGEMENT: "/admin/product-management",
    UPDATE_PRODUCT: "/admin/update-product",
    VARIANT_MANAGEMENT: "/admin/variant-management/:pid",
  },
  MEMBER: {
    PROFILE: "/member/profile",
    MY_CART: "/member/my-cart",
    HISTORY: "/member/buy-history",
    WISH_LIST: "/member/wishlist",
    CHECKOUT: "/member/checkout",
    SHOW_BILL: "/member/show-bill/:oid",
  },
};

export default path;
