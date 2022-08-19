import React from "react";
import "./index.css";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Layout, Avatar, Badge, Button } from "antd";

const Header = ({
  userType,
  userOnClick,
  cartOnClick,
  quantityInCart,
  userName,
  totalPrice,
}) => {
  const { Header } = Layout;
  return (
    <Header>
      <span className="header-container">
        <span className="site-title">Management</span>
        <span className="s-box">
          <input className="s-input" placeholder="search" type="text" />
        </span>
        <span> {userType === "unauthorized" ? null : `Hello ${userName}`}</span>
        <span className="sign-button" onClick={userOnClick}>
          <a>
            <UserOutlined />{" "}
            {userType === "unauthorized" ? "Sign In" : "Sign Out"}
          </a>
        </span>
        <span className="shopping-cart" onClick={cartOnClick}>
          <span>
            <Badge count={quantityInCart}>
              <ShoppingCartOutlined
                style={{ fontSize: "30px", color: "white" }}
              />
            </Badge>
          </span>
          <span>${totalPrice}</span>
        </span>
      </span>
    </Header>
  );
};

export default Header;
