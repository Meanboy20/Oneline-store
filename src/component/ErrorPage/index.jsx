import React, { useEffect } from "react";
import { Layout } from "antd";
import "antd/dist/antd.min.css";
import "./index.css";
import Header from "../../common/Header";
import { useSelector } from "react-redux";

const { Content, Footer } = Layout;

const ErrorPage = () => {
  const { userType, userId, userName, shoppingCart } = useSelector((state) => {
    return state.userReducer;
  });

  const { status } = useSelector((state) => {
    return state.productReducer;
  });

  const quantityInCart = shoppingCart.reduce(
    (pre, cur) => pre + cur.quantity,
    0
  );

  const totalPrice = shoppingCart.reduce(
    (pre, cur) => pre + cur.price * cur.quantity,
    0
  );

  return (
    <>
      <Layout className="layout">
        <Header
          userType={userType}
          userName={userName}
          quantityInCart={quantityInCart}
          totalPrice={(Math.round(totalPrice * 100) / 100).toFixed(2)}
        />
        {status !== "success" ? (
          <></>
        ) : (
          <Content
            style={{
              padding: "0px",
            }}
          >
            <div className="site-layout-content">
              <h1>Somthing went wrong</h1>
            </div>
          </Content>
        )}

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          2022 All Right Resvered
        </Footer>
      </Layout>
    </>
  );
};

export default () => <ErrorPage />;
