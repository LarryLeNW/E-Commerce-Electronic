import { ROLE } from "constant/roleUser";
import DetailProduct from "pages/user/DetailProduct";
import { useEffect } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { getUserInfoRequest } from "redux/slicers/auth.slicer";

import AdminLayout from "layout/AdminLayout";
import MemberLayout from "layout/MemberLayout";
import UserLayout from "layout/UserLayout";

import {
  ConfirmRegisterPage,
  DetailBlogPage,
  DetailCartPage,
  FAQPage,
  ForgotPasswordPage,
  HomePage,
  IntroducePage,
  ListBlogsPage,
  ListProductPage,
  LoginPage,
  ServicePage,
} from "pages/user";

import {
  CheckoutPage,
  HistoryPage,
  ListCartPage,
  ProfilePage,
  ShowBillPage,
  WhiteListPage,
} from "pages/member";

import {
  BlogCategoryManagerPage,
  BlogManagerPage,
  // DashBoardPage,
  OrderManagerPage,
  ProductCategoryPage,
  ProductManagerPage,
  UpdateBlogPage,
  UpdateOrderPage,
  UpdateProductPage,
  UserManagerPage,
  VariantProductPage,
} from "pages/admin";

import Loading from "components/Loading";
import Modal from "components/Modal";
import withBaseComponent from "hocs";
import path from "../utils/path";

function App({ dispatch, navigate, useSelector }) {
  const { modal } = useSelector((state) => state.common);
  const { userInfo } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(getUserInfoRequest());
  }, []);

  useEffect(() => {
    if (!!userInfo?.data && userInfo.data.role === ROLE.ADMIN) {
      navigate(path.ADMIN.HOME);
      return;
    }
    // handle check redirect prev page
    if (!!searchParams.get("redirect")) {
      navigate(searchParams.get("redirect"));
    }
  }, [userInfo.data?.role]);

  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path={path.DETAIL_CART} element={<DetailCartPage />} />
          <Route path={path.BLOGS} element={<ListBlogsPage />} />
          <Route path={path.DETAIL_PRODUCT} element={<DetailProduct />} />
          <Route path={path.OUR_SERVICES} element={<ServicePage />} />
          <Route path={path.FAQ} element={<FAQPage />} />
          <Route path={path.PRODUCTS} element={<ListProductPage />} />
          <Route path={path.DETAIL_BLOG} element={<DetailBlogPage />} />
          <Route path={path.INTRODUCE} element={<IntroducePage />} />
        </Route>
        <Route element={<MemberLayout />}>
          <Route path={path.MEMBER.PROFILE} element={<ProfilePage />} />
          <Route path={path.MEMBER.MY_CART} element={<ListCartPage />} />
          <Route path={path.MEMBER.HISTORY} element={<HistoryPage />} />
          <Route path={path.MEMBER.WISH_LIST} element={<WhiteListPage />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path={path.ADMIN.HOME} element={<UserManagerPage />} />
          <Route
            path={path.ADMIN.ORDER_MANAGEMENT}
            element={<OrderManagerPage />}
          />
          <Route path={path.ADMIN.UPDATE_ORDER} element={<UpdateOrderPage />} />
          <Route
            path={path.ADMIN.PRODUCT_CATEGORY_MANAGEMENT}
            element={<ProductCategoryPage />}
          />
          <Route
            path={path.ADMIN.PRODUCT_MANAGEMENT}
            element={<ProductManagerPage />}
          />
          <Route
            path={path.ADMIN.UPDATE_PRODUCT}
            element={<UpdateProductPage />}
          />
          <Route
            path={path.ADMIN.USER_MANAGEMENT}
            element={<UserManagerPage />}
          />
          <Route
            path={path.ADMIN.VARIANT_MANAGEMENT}
            element={<VariantProductPage />}
          />
          <Route
            path={path.ADMIN.BLOG_MANAGEMENT}
            element={<BlogManagerPage />}
          />
          <Route
            path={path.ADMIN.BLOG_CATEGORY_MANAGEMENT}
            element={<BlogCategoryManagerPage />}
          />
          <Route path={path.ADMIN.UPDATE_BLOG} element={<UpdateBlogPage />} />
        </Route>
        <Route path={path.LOGIN} element={<LoginPage />} />
        <Route path={path.MEMBER.CHECKOUT} element={<CheckoutPage />} />
        <Route path={path.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={path.CONFIRM_REGISTER} element={<ConfirmRegisterPage />} />
        <Route path={path.MEMBER.SHOW_BILL} element={<ShowBillPage />} />
      </Routes>
      {(modal.isShow || userInfo.loading) && (
        <Modal isAction={modal.isAction}>{modal.children || <Loading />}</Modal>
      )}
    </div>
  );
}

export default withBaseComponent(App);
