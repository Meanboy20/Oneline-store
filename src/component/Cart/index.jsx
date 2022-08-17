import React from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Space } from "antd";

const Cart = ({ shoppingCart }) => {
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={shoppingCart}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta title={<a href={item.href}>{item.title}</a>} />
            {item}
            {item.description}
            {item.price}
          </List.Item>
        )}
      />{" "}
      <Button>Check out</Button>
    </div>
  );
};

export default Cart;
