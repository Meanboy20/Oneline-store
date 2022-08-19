import React from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { Button, List, Space } from "antd";
import { useDispatch } from "react-redux";
import { addShoppingCart } from "../../redux/reducer";

const Cart = ({ shoppingCart, userID }) => {
  const dispatch = useDispatch();

  const handleAddToShoppingCart = (data) => {
    dispatch(addShoppingCart(data));
  };

  const totalPrice = shoppingCart.reduce(
    (pre, cur) => pre + cur.price * cur.quantity,
    0
  );

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        locale={{ emptyText: "Your cart is empty" }}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={shoppingCart}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta title={<a href={item.href}>{item.item}</a>} />
            <Button
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
            >
              +
            </Button>
            <Button
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
            >
              -
            </Button>
            Price: {item.price}
            <div> Quantity: {item.quantity}</div>
          </List.Item>
        )}
      />

      <Button>Check out</Button>
      <span>Totoal: ${(Math.round(totalPrice * 100) / 100).toFixed(2)}</span>
    </div>
  );
};

export default Cart;
