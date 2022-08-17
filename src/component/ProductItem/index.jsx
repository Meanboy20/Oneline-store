import React from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { Card } from "antd";
const ProductItem = (item) => {
  return (
    <Card title={item} bordered={false}>
      {item.description}
    </Card>
  );
};

export default ProductItem;
