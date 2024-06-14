import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import path from "./utils/paths";
import {
  Home,
  Login,
  Public,
  Products,
  Service,
  Blog,
  Faqs,
} from "./pages/public";
import { fetchCategories } from "./store/asyncActions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div class="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.SERVICES} element={<Service />} />
          <Route path={path.BLOG} element={<Blog />} />
          <Route path={path.FAQ} element={<Faqs />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
