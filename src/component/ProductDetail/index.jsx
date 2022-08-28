import React, { useState } from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { Button, Card, Layout, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../common/Header";
import { Content, Footer } from "antd/lib/layout/layout";
import Cart from "../Cart";
import { addShoppingCart, signOut } from "../../redux/reducer";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

const ProductDetail = (item) => {
  const { Content, Footer } = Layout;

  const dispatch = useDispatch();
  const param = useParams();
  const [isVisible, setVisible] = useState(false);
  const { shoppingCart, userType, userId, userName } = useSelector((state) => {
    return state.userReducer;
  });
  const { products } = useSelector((state) => {
    return state.productReducer;
  });

  const handleAddToShoppingCart = (data) => {
    dispatch(addShoppingCart(data));
  };

  const handleUserIconClick = () => {
    dispatch(signOut());
  };

  const handleCartClick = () => {
    if (userType === "customer") {
      setVisible(true);
    }
  };

  const product = products.find((ele) => ele._id === param.id);

  const quantityInCart = shoppingCart.reduce(
    (pre, cur) => pre + cur.quantity,
    0
  );

  const totalPrice = shoppingCart.reduce(
    (pre, cur) => pre + cur.price * cur.quantity,
    0
  );

  const quantity = shoppingCart.find((ele) => {
    return ele._id === product._id;
  });

  return (
    <>
      <Layout>
        <Header
          userType={userType}
          userOnClick={handleUserIconClick}
          cartOnClick={handleCartClick}
          quantityInCart={quantityInCart}
          totalPrice={(Math.round(totalPrice * 100) / 100).toFixed(2)}
          userName={userName}
        />
        <Content>
          <div className="site-layout-content">
            <h1>Product detail</h1>
            <div className="detail-container">
              <img className="productDetail-img" src={product.image} />
              <div className="product-name">
                <h1>{product.item}</h1>
              </div>

              <div className="product-description">{product.description}</div>

              <div className="plus-minus-container">
                {" "}
                <>
                  {quantity !== undefined ? (
                    <>
                      <span>
                        <PlusCircleOutlined
                          className="add-sign"
                          onClick={() =>
                            handleAddToShoppingCart({
                              id: userId,
                              value: {
                                _id: product._id,
                                item: product.item,
                                price: product.price,
                                quantity: 1,
                              },
                            })
                          }
                        />
                      </span>
                      <span>
                        {quantity === undefined ? 0 : quantity.quantity}
                      </span>
                      <span>
                        <MinusCircleOutlined
                          className="add-sign"
                          onClick={() =>
                            handleAddToShoppingCart({
                              id: userId,
                              value: {
                                _id: product._id,
                                item: product.item,
                                price: product.price,
                                quantity: -1,
                              },
                            })
                          }
                        />
                      </span>
                    </>
                  ) : (
                    <Button
                      onClick={() =>
                        handleAddToShoppingCart({
                          id: userId,
                          value: {
                            _id: product._id,
                            item: product.item,
                            price: product.price,
                            quantity: 1,
                          },
                        })
                      }
                    >
                      Add
                    </Button>
                  )}
                </>
                <Button disabled={userType === "admin" ? false : true}>
                  <a href={`/edit/${product._id}`}>Edit</a>
                </Button>{" "}
              </div>
            </div>
            <Modal
              width={"393px"}
              visible={isVisible}
              setVisible={setVisible}
              onCancel={() => {
                setVisible(false);
              }}
            >
              {<Cart shoppingCart={shoppingCart} userID={userId} />}
            </Modal>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          2022 All Right Resvered
        </Footer>{" "}
      </Layout>
    </>
  );
};

export default ProductDetail;
