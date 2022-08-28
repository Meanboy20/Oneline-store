import React, { useEffect } from "react";
import { Layout } from "antd";
import "antd/dist/antd.min.css";
import "./index.css";
import { Form, Input, Button, Select, InputNumber } from "antd";
import Header from "../../common/Header";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../common/Modal";
import { getAllProduct } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, signOut, updateProduct } from "../../redux/reducer";

const { TextArea } = Input;
const { Content, Footer } = Layout;

const EditProduct = () => {
  const nevigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const { userType, userId, userName } = useSelector((state) => {
    return state.userReducer;
  });

  const { products, status } = useSelector((state) => {
    return state.productReducer;
  });

  const param = useParams();

  const handleUserIconClick = () => {
    dispatch(signOut());
    nevigate("/");
  };

  const onFinish = (value) => {
    // console.log("input is ", values);

    dispatch(updateProduct({ id: param.id, value }));
    nevigate("/");
    // dispatch(getProduct());
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const currentProducts = products.filter((product) => {
    return product._id === param.id;
  });

  const currentProduct = currentProducts[0];

  // console.log("curr is", currentProduct);

  return (
    <>
      <Layout className="layout">
        <Header
          userType={userType}
          userName={userName}
          userOnClick={handleUserIconClick}
        />
        {status !== "success" ? (
          <></>
        ) : (
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
                validateTrigger="onSubmit"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item label="item" name="item">
                  <Input placeholder={currentProduct.item} />
                </Form.Item>

                <Form.Item label="description" name="description">
                  <TextArea placeholder={currentProduct.description} rows={4} />
                </Form.Item>

                <Form.Item label="Category" name="Category">
                  <Select>
                    <Select.Option value="Outdoor">Outdoor</Select.Option>
                    <Select.Option value="Sports">Sports</Select.Option>
                    <Select.Option value="Electronics">
                      Electronics
                    </Select.Option>
                    <Select.Option value="Food">Food</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="price" name="price">
                  <InputNumber initialvalue={currentProduct.price} />
                </Form.Item>

                <Form.Item label="quantity" name="quantity">
                  <InputNumber initialvalue={currentProduct.quantity} />
                </Form.Item>

                <Form.Item label="Add Image Link" name="image">
                  <Input placeholder={currentProduct.image} />
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
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit" onClick={() => {}}>
                    Delete{" "}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>
        )}

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

export default () => <EditProduct />;
