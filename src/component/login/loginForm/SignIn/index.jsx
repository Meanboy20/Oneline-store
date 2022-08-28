import React, { useState } from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { signInAuth } from "../../../../api";

const SignIn = ({ changeModal, setVisible }) => {
  const [isSignInError, setIsSignInError] = useState(null);
  const dispatch = useDispatch();

  const handleSigUpClick = () => {
    changeModal("signUp");
  };

  const handleResetPWClick = () => {
    changeModal("updatePassword");
  };

  const onFinish = async (values) => {
    const result = await signInAuth(dispatch)(values);
    // console.log("After sign in clicked", error);

    if (result.message !== undefined) {
      console.log(result.message);

      setIsSignInError(result.message);
    } else {
      setIsSignInError(null);
      setVisible(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h2>Sign in to your account</h2>
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
        validateTrigger="onSubmit"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="Email"
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
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <span style={{ color: "red" }}>{isSignInError}</span>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={() => {}}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <div className="sigin-footer">
        <span className="signUp-button" onClick={handleSigUpClick}>
          Don't have account, <a>Sign Up</a>
        </span>

        <span className="forgot-passwrd" onClick={handleResetPWClick}>
          <a>Forgot Password</a>
        </span>
      </div>
    </div>
  );
};

export default SignIn;
