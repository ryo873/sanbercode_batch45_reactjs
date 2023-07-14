import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import React from "react";
import { Layout, Form, Input, Col, Row, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;

function Login({ children }) {
  const [isModalOpen, setModalIsOpen] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [isModalOpen2, setModalIsOpen2] = React.useState(false);

  const navigate = useNavigate();

  const handleOk = () => {
    setModalIsOpen(false);
  };

  const handleOk2 = () => {
    setModalIsOpen2(false);
    navigate("/");
  };

  const initialState = Yup.object({
    email: "",
    password: "",
  });

  const submitOn = async () => {
    try {
      const response = await axios.post("https://api-project.amandemy.co.id/api/login", {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("username", response.data.data.user.username);
      setModalIsOpen2(true);
    } catch (error) {
      setModalIsOpen(true);
      setError(error.response.data.info);
    }
  };

  const { handleChange, values } = useFormik({ initialValues: initialState });
  return (
    <>
      <Layout>
        {children}
        <Content style={{ marginTop: "40px" }}>
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Col span={8} style={{ backgroundColor: "white", borderTopRightRadius: "10px", borderTopLeftRadius: "10px", boxShadow: "0px 0px 10px #888888" }}>
              <h1>Form Login</h1>
            </Col>
          </Row>
          <Row style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
            <Col span={8}>
              <Form layout="vertical" style={{ backgroundColor: "white", padding: "10px", borderBottomRightRadius: "5%", borderBottomLeftRadius: "5%", boxShadow: "0px 10px 10px #888888" }}>
                <Form.Item
                  label="Masukkan Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                    },
                  ]}
                >
                  <Input value={values.email} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Masukkan Password">
                  <Input.Password name="password" value={values.password} onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={submitOn}>
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
      <Modal
        title="Error"
        open={isModalOpen}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Ok
          </Button>,
        ]}
        closable={false}
      >
        <p>{error}</p>
      </Modal>
      <Modal
        title="Login Berhasil"
        open={isModalOpen2}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk2}>
            Ok
          </Button>,
        ]}
        closable={false}
      >
        <p>Login Berhasil</p>
      </Modal>
    </>
  );
}

export default Login;
