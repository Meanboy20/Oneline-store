import React from "react";
import "antd/dist/antd.min.css";
import { Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./index.css";

const MyModal = (props) => {
  const {
    children,
    titleText,
    width,
    visible,
    setVisible,
    changeContent,
    modalContent,
  } = props;
  // console.log(modalContent);

  return (
    <Modal
      className={modalContent}
      width={width}
      closeIcon={<CloseCircleOutlined />}
      // title={<div className="modal-title">{titleText}</div>}
      visible={visible}
      changeContent={changeContent}
      onCancel={() => {
        setVisible(false);
      }}
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default MyModal;
