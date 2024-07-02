import { Calendar, ColorPicker } from "antd";
import { ROLE } from "constant/roleUser";
import { useStateContext } from "contexts/ContextProvider";
import Cookies from "js-cookie";
import {
  Area,
  Bar,
  ColorMapping,
  Customers,
  Ecommerce,
  Editor,
  Employees,
  Financial,
  Kanban,
  Line,
  Orders,
  Pie,
  Pyramid,
  Stacked,
} from "pages/private";
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

function App() {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const theme = useSelector((state) => state.common.theme);
  const { userInfo } = useSelector((state) => state.auth);
  console.log("🚀 ~ App ~ userInfo:", userInfo);
  // console.log("🚀 ~ file: App.jsx:38 ~ App ~ data:", data);

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
          <Route path={path.ADMIN.HOME} element={<Ecommerce />} />
          <Route path="/ecommerce" element={<Ecommerce />} />

          {/* pages  */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/customers" element={<Customers />} />

          {/* apps  */}
          <Route path="/kanban" element={<Kanban />} />

          <Route path="/editor" element={<Editor />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/color-picker" element={<ColorPicker />} />

          {/* charts  */}
          <Route path="/line" element={<Line />} />
          <Route path="/area" element={<Area />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/financial" element={<Financial />} />
          <Route path="/color-mapping" element={<ColorMapping />} />
          <Route path="/pyramid" element={<Pyramid />} />
          <Route path="/stacked" element={<Stacked />} />
        </Route>

        <Route path={path.LOGIN} element={<LoginPage />} />
        <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={path.CONFIRM_REGISTER} element={<ConfirmRegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
