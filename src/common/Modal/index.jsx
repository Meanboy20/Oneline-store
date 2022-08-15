import React from "react";
import "antd/dist/antd.min.css";
import { Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./index.css";

const MyModal = (props) => {
  const { children, titleText, width, visible, setVisible, changeContent } =
    props;

  return (
    <>
      <Modal
        width={width}
        closeIcon={<CloseCircleOutlined />}
        // title={<div className="modal-title">{titleText}</div>}
        visible={visible}
        footer={null}
        changeContent={changeContent}
        onCancel={() => {
          setVisible(false);
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default MyModal;
