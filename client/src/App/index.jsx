import { ROLE } from "constant/roleUser";
import AdminLayout from "layout/AdminLayout";
import DetailProduct from "pages/user/DetailProduct";
import ForgotPassword from "pages/user/ForgotPassword";
import { useEffect } from "react";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import { getUserInfoRequest } from "redux/slicers/auth.slicer";
import {
  BlogPage,
  ConfirmRegisterPage,
  DetailCartPage,
  FAQPage,
  HomePage,
  ListProductPage,
  LoginPage,
  ServicePage,
} from "pages/user";

import UserLayout from "layout/UserLayout";
import path from "../utils/path";
import Dashboard from "pages/admin/DashBoard";
import Modal from "components/Modal";
import OrderManager from "pages/admin/OrderManager";
import ProductManager from "pages/admin/ProductManager";
import UserManager from "pages/admin/UserManager";
import UpdateProduct from "pages/admin/UpdateProduct";
import Loading from "components/Loading";
import MemberLayout from "layout/MemberLayout";
import Profile from "pages/member/Profile";
import ListCart from "pages/member/ListCart";
import History from "pages/member/History";
import WhiteList from "pages/member/WhiteList";
import withBaseComponent from "hocs";
import { VariantProductPage } from "pages/admin";

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
    searchParams.get("redirect") && navigate(searchParams.get("redirect"));
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
          <Route path={path.MEMBER.PROFILE} element={<Profile />} />
          <Route path={path.MEMBER.MY_CART} element={<ListCart />} />
          <Route path={path.MEMBER.HISTORY} element={<History />} />
          <Route path={path.MEMBER.WISH_LIST} element={<WhiteList />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path={path.ADMIN.HOME} element={<Dashboard />} />
          <Route
            path={path.ADMIN.ORDER_MANAGEMENT}
            element={<OrderManager />}
          />
          <Route
            path={path.ADMIN.PRODUCT_MANAGEMENT}
            element={<ProductManager />}
          />
          <Route path={path.ADMIN.UPDATE_PRODUCT} element={<UpdateProduct />} />
          <Route path={path.ADMIN.USER_MANAGEMENT} element={<UserManager />} />
          <Route
            path={path.ADMIN.VARIANT_MANAGEMENT}
            element={<VariantProductPage />}
          />
        </Route>
        <Route path={path.LOGIN} element={<LoginPage />} />
        <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={path.CONFIRM_REGISTER} element={<ConfirmRegisterPage />} />
      </Routes>
      {(modal.isShow || userInfo.loading) && (
        <Modal isAction={modal.isAction}>{modal.children || <Loading />}</Modal>
      )}
    </div>
  );
}

export default withBaseComponent(App);
