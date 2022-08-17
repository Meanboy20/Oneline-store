import React, { useState } from "react";
import { Layout } from "antd";
import "antd/dist/antd.min.css";
import "./index.css";
import { Form, Input, Button, Select, InputNumber } from "antd";
import Header from "../../common/Header";
import { useSelector } from "react-redux";
import Modal from "../../common/Modal";
import { addNewProduct } from "../../api";

const { TextArea } = Input;
const { Content, Footer } = Layout;

const CreateProduct = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);

  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };

  const { userType } = useSelector((state) => {
    return state.userReducer;
  });

  console.log(userType);

  const onFinish = (values) => {
    addNewProduct()(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Layout className="layout">
        <Header userType={userType} />

        <Content
          style={{
            padding: "0px",
          }}
        >
          <div className="site-layout-content">
            {" "}
            <Form
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onValuesChange={onFormLayoutChange}
              disabled={componentDisabled}
              validateTrigger="onSubmit"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item label="item" name="item">
                <Input />
              </Form.Item>

              <Form.Item label="description" name="description">
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item label="Category" name="Category">
                <Select>
                  <Select.Option value="Ele">Ele</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="price" name="price">
                <InputNumber />
              </Form.Item>

              <Form.Item label="quantity" name="quantity">
                <InputNumber />
              </Form.Item>

              <Form.Item label="Add Image Link" name="image">
                <Input />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" onClick={() => {}}>
                  Submit{" "}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
        <Modal
        //   width={"393px"}
        //   visible={isVisible}
        //   setVisible={handleCloseModal}
        //   changeModal={setModalContent}
        ></Modal>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          2022 All Right Resvered
        </Footer>
      </Layout>
    </>
  );
};

export default () => <CreateProduct />;
