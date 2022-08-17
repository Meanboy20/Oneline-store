import React from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { List, Card, Button } from "antd";

export const ProductList = ({ productList, setPage }) => {
  return (
    <div>
      {/* <h2>We don't have any product yet</h2> */}
      <div className="ProductList-header">
        <span className="page-title">
          <h3>Product</h3>
        </span>
        <span className="add-new">
          {" "}
          <Button>
            <a href="/newproduct">Add New Product</a>
          </Button>
        </span>
      </div>

      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={productList}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.item}>{item.description}</Card>
            <Button>Add</Button>
            <Button>
              <a href={`/edit/${item._id}`}>Edit</a>
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};
