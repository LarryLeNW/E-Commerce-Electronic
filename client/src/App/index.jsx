import { ROLE } from "constant/roleUser";
import AdminLayout from "layout/AdminLayout";
import DetailProduct from "pages/user/DetailProduct";
import ForgotPassword from "pages/user/ForgotPassword";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getUserInfoRequest } from "redux/slicers/auth.slicer";
import {
  BlogPage,
  ConfirmRegisterPage,
  FAQPage,
  HomePage,
  ListProductPage,
  LoginPage,
  ServicePage,
} from "../pages/user";
import UserLayout from "layout/UserLayout";
import path from "../utils/path";
import Dashboard from "pages/admin/DashBoard";
import Modal from "components/Modal";
import OrderManager from "pages/admin/OrderManager";
import ProductManager from "pages/admin/ProductManager";
import UserManager from "pages/admin/UserManager";
import UpdateProduct from "pages/admin/UpdateProduct";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modal } = useSelector((state) => state.common);
  const { userInfo } = useSelector((state) => state.auth);
  console.log("🚀 ~ App ~ userInfo:", userInfo.data);

  useEffect(() => {
    dispatch(getUserInfoRequest());
  }, []);

  useEffect(() => {
    if (!!userInfo?.data && userInfo.data.role === ROLE.ADMIN) {
      navigate(path.ADMIN.HOME);
      return;
    }
    navigate(path.HOME);
  }, [userInfo.data?.role]);

  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path={path.BLOGS} element={<BlogPage />} />
          <Route path={path.DETAIL_PRODUCT} element={<DetailProduct />} />
          <Route path={path.OUR_SERVICES} element={<ServicePage />} />
          <Route path={path.FAQ} element={<FAQPage />} />
          <Route path={path.PRODUCTS} element={<ListProductPage />} />
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
        </Route>

        <Route path={path.LOGIN} element={<LoginPage />} />
        <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={path.CONFIRM_REGISTER} element={<ConfirmRegisterPage />} />
      </Routes>
      {modal.isShow && <Modal>{modal.children} </Modal>}
    </div>
  );
}

export default App;
