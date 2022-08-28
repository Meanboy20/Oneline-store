import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateProduct from "./component/CreateNewProduct";
import { Provider } from "react-redux";
import EditProduct from "./component/EditProduct";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ProductDetail from "./component/ProductDetail";
import ErrorBoundary from "./common/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route exact path="/newproduct" element={<CreateProduct />} />
            <Route exact path="/edit/:id" element={<EditProduct />} />
            <Route exact path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </PersistGate>
  </Provider>
);
