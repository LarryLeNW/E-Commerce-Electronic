import React from "react";
import path from "./utils/path";
import {
  BlogPage,
  ConfirmRegisterPage,
  FAQPage,
  HomePage,
  ListProductPage,
  LoginPage,
  PublicPage,
  ServicePage,
} from "./pages/public";
import { Routes, Route } from "react-router-dom";
import DetailProduct from "pages/public/DetailProduct";

function App() {
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<PublicPage />}>
          <Route index element={<HomePage />} />
          <Route path={path.BLOGS} element={<BlogPage />} />
          <Route path={path.DETAIL_PRODUCT} element={<DetailProduct />} />
          <Route path={path.OUR_SERVICES} element={<ServicePage />} />
          <Route path={path.FAQ} element={<FAQPage />} />
          <Route path={path.PRODUCTS} element={<ListProductPage />} />
        </Route>
        <Route path={path.LOGIN} element={<LoginPage />} />
        <Route path={path.CONFIRM_REGISTER} element={<ConfirmRegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
