import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateProduct from "./component/CreateNewProduct";
import store from "./redux/store";
import { Provider } from "react-redux";
import EditProduct from "./component/EditProduct";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/newproduct" element={<CreateProduct />} />
        <Route exact path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
