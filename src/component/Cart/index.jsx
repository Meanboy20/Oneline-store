import React, { useState } from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { Button, Input, List, message, Space } from "antd";
import { useDispatch } from "react-redux";
import { addShoppingCart } from "../../redux/reducer";
import { ajaxConfigHelper } from "../../helper";

const Cart = ({ shoppingCart, userID, discount, setDiscount }) => {
  const dispatch = useDispatch();
  const [inputCode, setInputCode] = useState("");
  const [invalidCode, setInvalidCode] = useState("");

  const handleAddToShoppingCart = (data) => {
    dispatch(addShoppingCart(data));
  };
  const handlePromotionCode = async (code) => {
    const response = await fetch(
      "http://localhost:8080/promocode",
      ajaxConfigHelper({ code: code }, "POST")
    );

    const result = await response.json();
    if (result.message != undefined) {
      setInvalidCode(result.message);
    } else {
      setDiscount(result.used === false ? result.amount : 0);
      setInvalidCode("");
    }
  };

  const totalPrice = shoppingCart.reduce(
    (pre, cur) => pre + cur.price * cur.quantity,
    0
  );

  const finalAmount = totalPrice - discount >= 0 ? totalPrice - discount : 0;

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
      <div>
        <span>
          Promotion code
          <Input
            onChange={(e) => {
              setInputCode(e.target.value);
            }}
          />
          {discount === 0 ? (
            <button onClick={() => handlePromotionCode(inputCode)}>
              Apply
            </button>
          ) : (
            <button onClick={() => setDiscount(0)}>Cancel</button>
          )}
        </span>
      </div>

      <Button>Check out</Button>
      {invalidCode !== undefined ? (
        <span style={{ color: "red" }}>{invalidCode}</span>
      ) : null}
      <div>Totoal: ${(Math.round(finalAmount * 100) / 100).toFixed(2)}</div>
      <span hidden={discount === 0 ? "hidden" : null}>
        Promocode applied -${discount}
      </span>
    </div>
  );
};

export default Cart;
