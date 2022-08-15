import React from "react";
import "./index.css";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import { Layout } from "antd";

const Header = ({ userType, userOnClick, cartOnClick }) => {
  const { Header } = Layout;
  return (
    <Header>
      <span>Management</span>
      <div className="s-box">
        <input className="s-input" placeholder="search" type="text" />
      </div>
      <a className="signIn-button-head" onClick={userOnClick}>
        <UserOutlined /> {userType === "unauthorized" ? "Sign In" : "Sign Out"}
      </a>
      <a className="shopping-cart" onClick={cartOnClick}>
        <ShoppingCartOutlined style={{ fontSize: "30px", float: "right" }} />
      </a>
    </Header>
  );
};

export default Header;
