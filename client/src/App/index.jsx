import { ROLE } from "constant/roleUser";
import PrivatePage from "pages/private/Private";
import DetailProduct from "pages/public/DetailProduct";
import ForgotPassword from "pages/public/ForgotPassword";
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
  PublicPage,
  ServicePage,
} from "../pages/public";
import path from "../utils/path";
import Dashboard from "pages/private/DashBoard";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getUserInfoRequest({
        callback: (role) => {
          if (role === ROLE.ADMIN) navigate(path.ADMIN.HOME);
        },
      })
    );
  }, []);

  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route element={<PublicPage />}>
          <Route index element={<HomePage />} />
          <Route path={path.BLOGS} element={<BlogPage />} />
          <Route path={path.DETAIL_PRODUCT} element={<DetailProduct />} />
          <Route path={path.OUR_SERVICES} element={<ServicePage />} />
          <Route path={path.FAQ} element={<FAQPage />} />
          <Route path={path.PRODUCTS} element={<ListProductPage />} />
        </Route>

        <Route element={<PrivatePage />}>
          <Route path={path.ADMIN.HOME} element={<Dashboard />} />
        </Route>

        <Route path={path.LOGIN} element={<LoginPage />} />
        <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={path.CONFIRM_REGISTER} element={<ConfirmRegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
