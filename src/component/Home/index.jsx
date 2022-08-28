import React from "react";
import { ProductList } from "../ProductList/index";
import "antd/dist/antd.min.css";
import "./index.css";
import { Layout } from "antd";
import Header from "../../common/Header";
import Modal from "../../common/Modal";
import { useState, useEffect } from "react";
import UpdatePW from "../login/loginForm/UpdatePassWord";
import SignUp from "../login/loginForm/SignUp";
import SignIn from "../login/loginForm/SignIn";
import PassWordResetting from "../login/loginForm/PassWordResetting";
import Cart from "../Cart";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, signOut } from "../../redux/reducer";

function Home() {
  const dispatch = useDispatch();

  const { shoppingCart, userType, userId, userName } = useSelector((state) => {
    return state.userReducer;
  });
  const products = useSelector((state) => {
    return state.productReducer;
  });

  useEffect(() => {
    console.log("useEffect called");
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    setDiscount(0);
  }, [userType]);
  // console.log("Home page render");

  const { Content, Footer } = Layout;
  const [searchInput, setSearchInput] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isVisible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState("signIn");

  const productsOnSearch = products.products.filter((ele) => {
    if (searchInput === "") {
      return ele;
    } else {
      return (
        ele.item[0].toLocaleLowerCase() ===
          searchInput[0].toLocaleLowerCase() &&
        ele.item.toLowerCase().includes(searchInput.toLocaleLowerCase(), 0)
      );
    }
  });

  const quantityInCart = shoppingCart.reduce(
    (pre, cur) => pre + cur.quantity,
    0
  );

  const totalPrice = shoppingCart.reduce(
    (pre, cur) => pre + cur.price * cur.quantity,
    0
  );

  const handleUserIconClick = () => {
    if (userType === "unauthorized") {
      setVisible(true);
    }
    //sign out
    else {
      dispatch(signOut());
      setModalContent("signIn");
    }
  };

  const handleCartClick = () => {
    if (userType === "customer") {
      setVisible(true);
      setModalContent("shoppingCart");
    }
  };

  const handleCloseModal = () => {
    if (modalContent !== "signIn" && modalContent !== "shoppingCart") {
      setModalContent("signIn");
      setVisible(false);
    } else setVisible(false);
  };

  const handleModalContent = (modalContent) => {
    switch (modalContent) {
      case "signIn":
        return <SignIn changeModal={setModalContent} setVisible={setVisible} />;
      case "signUp":
        return <SignUp changeModal={setModalContent} setVisible={setVisible} />;
      case "updatePassword":
        return <UpdatePW changeModal={setModalContent} />;
      case "emailSent":
        return <PassWordResetting />;
      case "shoppingCart":
        return (
          <Cart
            shoppingCart={shoppingCart}
            userID={userId}
            discount={discount}
            setDiscount={setDiscount}
          />
        );
      default:
        return <SignIn />;
    }
  };

  return (
    <Layout className="layout">
      <Header
        userType={userType}
        userOnClick={handleUserIconClick}
        cartOnClick={handleCartClick}
        quantityInCart={quantityInCart}
        totalPrice={(Math.round((totalPrice - discount) * 100) / 100).toFixed(
          2
        )}
        userName={userName}
        setSearchInput={setSearchInput}
      />

      <Content
        style={{
          padding: "0px",
        }}
      >
        <div className="site-layout-content">
          <ProductList
            productList={productsOnSearch}
            userType={userType}
            userID={userId}
            shoppingCart={shoppingCart}
          />
        </div>
      </Content>
      <Modal
        width={"393px"}
        visible={isVisible}
        setVisible={handleCloseModal}
        changeModal={setModalContent}
      >
        {handleModalContent(modalContent)}
      </Modal>

      <Footer
        style={{
          textAlign: "center",
        }}
      >
        2022 All Right Resvered
      </Footer>
    </Layout>
  );
}

export default Home;
