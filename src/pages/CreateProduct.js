import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { Layout, Row, Col, Form, Input, InputNumber, Checkbox, Button } from "antd";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

function CreateProduct({ children }) {
  const navigate = useNavigate();

  const initialValues = Yup.object({
    name: "",
    harga: 1,
    stock: 1,
    image_url: "",
    is_diskon: false,
    harga_diskon: 0,
    category: "kendaraan",
    description: "",
  });

  const submitOn = async () => {
    if (values.is_diskon === false) {
      values.harga_diskon = 0;
    }
    try {
      const response = await axios.post(
        "https://api-project.amandemy.co.id/api/final/products",
        {
          name: values.name,
          harga: values.harga,
          stock: values.stock,
          image_url: values.image_url,
          is_diskon: values.is_diskon,
          harga_diskon: values.harga_diskon,
          category: values.category,
          description: values.description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Tambah Product Berhasil");
      navigate("/tables");
    } catch (error) {
      alert(error.response.data.info);
    }
  };

  const { handleChange, values, handleSubmit, resetForm } = useFormik({ initialValues: initialValues, onSubmit: submitOn });

  return (
    <>
      <Layout>
        {children}
        <Content style={{ padding: "10px" }}>
          <Row>
            <Col span={6}>
              <h1>Create Product</h1>
            </Col>
            <Col span={18}></Col>
          </Row>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item label="Nama Barang" name="name" onChange={handleChange}>
                  <Input value={values.name} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Stock" name="stock" onChange={handleChange}>
                  <InputNumber
                    min={1}
                    style={{
                      width: "100%",
                    }}
                    value={values.stock}
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="Harga Barang" name="harga" onChange={handleChange}>
                  <InputNumber
                    min={1}
                    style={{
                      width: "100%",
                    }}
                    value={values.harga}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label=" " name="is_diskon" onChange={handleChange}>
                  <Checkbox value={values.is_diskon}>Status Diskon</Checkbox>
                </Form.Item>
              </Col>
              <Col span={10}>
                {values.is_diskon && (
                  <Form.Item label="Harga Diskon Barang" name="harga_diskon" onChange={handleChange}>
                    <InputNumber
                      style={{
                        width: "100%",
                      }}
                      value={values.harga_diskon}
                      min={0}
                    />
                  </Form.Item>
                )}
              </Col>
              <Col span={10}>
                <Form.Item label="Kategori Barang">
                  {/* <Select name="category" /> */}
                  <select name="category" value={values.category} onChange={handleChange} style={{ display: "block", width: "100%", borderRadius: "5px", height: "5vh", border: "1px solid #D7D7D7" }} size="large">
                    <option value="kendaraan" label="Kendaraan">
                      {" "}
                      Kendaraan
                    </option>
                    <option value="teknologi" label="Teknologi">
                      {" "}
                      Teknologi
                    </option>
                    <option value="makanan" label="Makanan">
                      {" "}
                      Makanan
                    </option>
                    <option value="minuman" label="Minuman">
                      {" "}
                      Minuman
                    </option>
                    <option value="hiburan" label="Hiburan">
                      {" "}
                      Hiburan
                    </option>
                  </select>
                  {/* <Select style={{ textAlign: "left" }} onChange={handleChange}>
                    <option value="kendaraan">Kendaraan</option>
                  </Select> */}
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item label="Gambar Barang" name="image_url" onChange={handleChange}>
                  <Input value={values.image_url} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Deskripsi" name="description" onChange={handleChange}>
                  <TextArea rows={4} value={values.description} />
                </Form.Item>
              </Col>
              <Col span={16}></Col>
              <Col span={4}>
                <Form.Item>
                  <Button style={{ width: "100%" }}>Cancel</Button>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Content>
      </Layout>
    </>
  );
}

export default CreateProduct;
