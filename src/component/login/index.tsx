import React, { useState } from "react";
import { Button } from "antd";

import Modal from "../../common/modal";
import ModalContent from "./modalContent";

import { LOGIN_FORM } from "../../content/form";
import "./index.css";

const Login = ({ handleLogin = () => {} }) => {
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState("default");

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        {LOGIN_FORM.LOGIN}
      </Button>
      <Modal
        titleText={modalContent === "dis" ? "登录协议" : LOGIN_FORM.LOGIN}
        width={modalContent === "dis" ? "690px" : "393px"}
        visible={visible}
        setVisible={setVisible}
        content={modalContent}
        changeContent={setModalContent}
      >
        <ModalContent
          handleOnLogin={handleLogin}
          content={modalContent}
          changeForm={setModalContent}
        />
      </Modal>
    </>
  );
};

export default Login;
