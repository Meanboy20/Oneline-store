import React, { useState } from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { Button, Checkbox, Form, Input } from "antd";
import { signUp } from "../../../../api";
import { useDispatch } from "react-redux";
import { addNewUser } from "../../../../redux/reducer";

const SignUp = ({ changeModal, setVisible }) => {
  const dispatch = useDispatch();
  const handleSiginClick = () => {
    changeModal("signIn");
  };
  const onFinish = (value) => {
    dispatch(addNewUser({ value: value }));
    setVisible(false);

    alert("Create account successfully, please use sign in");
    changeModal("signIn");
  };

  return (
    <div>
      <h2>Sign up an account</h2>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="Email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Create account
          </Button>
        </Form.Item>
      </Form>
      <span onClick={handleSiginClick}>
        Already have account, <a>Sign in</a>
      </span>
    </div>
  );
};

export default SignUp;
