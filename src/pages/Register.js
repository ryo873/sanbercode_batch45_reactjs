import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import React, { useState } from "react";
import { Layout, Form, Input, Col, Row, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;

function Register({ children }) {
  const navigate = useNavigate();
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [isModalOpen2, setModalIsOpen2] = useState(false);
  const [error, setError] = useState("error");

  const handleOk = () => {
    setModalIsOpen(false);
  };

  const handleOk2 = () => {
    setModalIsOpen2(false);
    navigate("/login");
  };

  const initialValues = Yup.object({
    email: "",
    username: "",
    name: "",
    password: "",
    password_confirmation: "",
  });

  const submitOn = async () => {
    try {
      const response = await axios.post("https://api-project.amandemy.co.id/api/register", {
        email: values.email,
        username: values.username,
        name: values.name,
        password: values.password,
        password_confirmation: values.password_confirmation,
      });
      setModalIsOpen2(true);
    } catch (error) {
      setError(error.response.data.info);
      setModalIsOpen(true);
    }
  };

  const { handleChange, values, handleSubmit } = useFormik({ initialValues: initialValues, onSubmit: submitOn });

  return (
    <>
      <Layout>
        {children}
        <Content style={{ marginTop: "40px" }}>
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Col span={8} style={{ backgroundColor: "white", borderTopRightRadius: "10px", borderTopLeftRadius: "10px", boxShadow: "0px 0px 10px #888888" }}>
              <h1>Form Register</h1>
            </Col>
          </Row>
          <Row style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
            <Col span={8}>
              <Form layout="vertical" style={{ backgroundColor: "white", padding: "10px", borderBottomRightRadius: "5%", borderBottomLeftRadius: "5%", boxShadow: "0px 10px 10px #888888" }}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                    },
                  ]}
                >
                  <Input value={values.email} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Username" name="username" rules={[{ message: "Tolong masukkan username" }]}>
                  <Input value={values.username} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Nama" name="name" rules={[{ message: "Tolong masukkan nama" }]}>
                  <Input value={values.name} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Password">
                  <Input.Password name="password" value={values.password} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Konfirmasi Password">
                  <Input.Password name="password_confirmation" value={values.password_confirmation} onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={handleSubmit}>
                    Register
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
        title="Registrase Berhasil"
        open={isModalOpen2}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk2}>
            Ok
          </Button>,
        ]}
        closable={false}
      >
        <p>Registrasi Berhasil Selamat</p>
      </Modal>
    </>
  );
}

export default Register;
