import React from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { List, Card, Button } from "antd";
import { useDispatch } from "react-redux";
import { addShoppingCart } from "../../redux/reducer";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

export const ProductList = ({
  productList,
  userType,
  userID,
  shoppingCart,
}) => {
  const dispatch = useDispatch();

  const handleAddToShoppingCart = (data) => {
    dispatch(addShoppingCart(data));
  };

  return (
    <div>
      {/* <h2>We don't have any product yet</h2> */}
      <div className="ProductList-header">
        <span className="page-title">
          <h3>Product</h3>
        </span>
        <span className="add-new">
          {" "}
          <Button disabled={userType === "admin" ? false : true}>
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
        renderItem={(item) => {
          const quantity = shoppingCart.filter((ele) => {
            return ele._id === item._id;
          });

          return (
            <List.Item>
              <Card title={item.item}>
                {item.description}
                <div>Price: ${item.price}</div>
              </Card>
              <span>
                <span>
                  <PlusCircleOutlined
                    className="add-sign"
                    onClick={() =>
                      handleAddToShoppingCart({
                        id: userID,
                        value: {
                          _id: item._id,
                          item: item.item,
                          price: item.price,
                          quantity: 1,
                        },
                      })
                    }
                  />
                </span>
                <span>{quantity.length === 0 ? 0 : quantity[0].quantity}</span>
                <span>
                  <MinusCircleOutlined
                    className="add-sign"
                    onClick={() =>
                      handleAddToShoppingCart({
                        id: userID,
                        value: {
                          _id: item._id,
                          item: item.item,
                          price: item.price,
                          quantity: -1,
                        },
                      })
                    }
                  />
                </span>
                <Button disabled={userType === "admin" ? false : true}>
                  <a href={`/edit/${item._id}`}>Edit</a>
                </Button>
              </span>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export const handleUpdateShoppingCart = ProductList.handleAddToShoppingCart;
