import React from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { Button, Checkbox, Form, Input } from "antd";

const UpdatePW = ({ changeModal }) => {
  const handleResetPw = () => {
    changeModal("emailSent");
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <h2>Update your password</h2>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        validateTrigger={onsubmit}
      >
        <Form.Item
          label="Email"
          name="Email"
          type="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button onClick={handleResetPw} type="primary" htmlType="send">
            Update password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdatePW;
