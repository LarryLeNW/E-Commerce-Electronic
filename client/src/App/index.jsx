import { ROLE } from "constant/roleUser";
import DetailProduct from "pages/user/DetailProduct";
import ForgotPassword from "pages/user/ForgotPassword";
import { useEffect } from "react";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import { getUserInfoRequest } from "redux/slicers/auth.slicer";

import UserLayout from "layout/UserLayout";
import MemberLayout from "layout/MemberLayout";
import AdminLayout from "layout/AdminLayout";

import {
  BlogPage,
  ConfirmRegisterPage,
  DetailCartPage,
  FAQPage,
  ForgotPasswordPage,
  HomePage,
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
  DashBoardPage,
  OrderManagerPage,
  ProductManagerPage,
  UpdateProductPage,
  UserManagerPage,
  VariantProductPage,
} from "pages/admin";

import path from "../utils/path";
import Modal from "components/Modal";
import Loading from "components/Loading";
import withBaseComponent from "hocs";

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
          <Route path={path.BLOGS} element={<BlogPage />} />
          <Route path={path.DETAIL_PRODUCT} element={<DetailProduct />} />
          <Route path={path.OUR_SERVICES} element={<ServicePage />} />
          <Route path={path.FAQ} element={<FAQPage />} />
          <Route path={path.PRODUCTS} element={<ListProductPage />} />
        </Route>
        <Route element={<MemberLayout />}>
          <Route path={path.MEMBER.PROFILE} element={<ProfilePage />} />
          <Route path={path.MEMBER.MY_CART} element={<ListCartPage />} />
          <Route path={path.MEMBER.HISTORY} element={<HistoryPage />} />
          <Route path={path.MEMBER.WISH_LIST} element={<WhiteListPage />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path={path.ADMIN.HOME} element={<DashBoardPage />} />
          <Route
            path={path.ADMIN.ORDER_MANAGEMENT}
            element={<OrderManagerPage />}
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
