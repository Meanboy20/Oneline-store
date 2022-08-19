import React, { useState } from "react";
import { Layout } from "antd";
import "antd/dist/antd.min.css";
import "./index.css";
import { Form, Input, Button, Select, InputNumber } from "antd";
import Header from "../../common/Header";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../common/Modal";
import { addNewProduct } from "../../redux/reducer";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Content, Footer } = Layout;

const CreateProduct = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };

  const { userType } = useSelector((state) => {
    return state.userReducer;
  });

  console.log(userType);

  const onFinish = (values) => {
    dispatch(addNewProduct({ value: values }));
    nevigate("/");
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
              <Form.Item
                label="item"
                name="item"
                rules={[
                  {
                    required: true,
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item
                label="Category"
                name="Category"
                rules={[
                  {
                    required: true,
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="Outdoor">Outdoor</Select.Option>
                  <Select.Option value="Sports">Sports</Select.Option>
                  <Select.Option value="Electronics">Electronics</Select.Option>
                  <Select.Option value="Food">Food</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="quantity"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="Add Image Link"
                name="image"
                rules={[
                  {
                    required: true,
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
