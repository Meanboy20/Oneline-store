import React from "react";
import { ProductList } from "../ProductList/index";
import "antd/dist/antd.min.css";
import "./index.css";
import { Layout } from "antd";
import Modal from "../../common/Modal";
import { useState } from "react";
import UpdatePW from "../login/loginForm/UpdatePassWord";
import SignUp from "../login/loginForm/SignUp";
import SignIn from "../login/loginForm/SignIn";
import PassWordResetting from "../login/loginForm/PassWordResetting";
import Cart from "../Cart";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../common/Header";
import { signOut } from "../../redux/reducer";

function Home() {
  const dispatch = useDispatch();
  const { Content, Footer } = Layout;
  const [isVisible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState("signIn");
  const { shoppingCart, userType } = useSelector((state) => state);

  console.log(userType, shoppingCart);

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
        return <SignUp changeModal={setModalContent} />;
      case "updatePassword":
        return <UpdatePW changeModal={setModalContent} />;
      case "emailSent":
        return <PassWordResetting />;
      case "shoppingCart":
        return <Cart />;
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
      />

      <Content
        style={{
          padding: "0px",
        }}
      >
        <div className="site-layout-content">
          <ProductList productList={shoppingCart} />
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
