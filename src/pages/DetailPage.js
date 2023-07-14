import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Layout, Row, Col, Image, Card, Breadcrumb } from "antd";
const { Content, Sider } = Layout;

function DetailPage({ children }) {
  const [dataDetail, setDataDetail] = useState([]);
  const { id } = useParams();

  const fetchArticlesById = async () => {
    try {
      const response = await axios.get(`https://api-project.amandemy.co.id/api/final/products/${id}`);
      setDataDetail(response.data.data);
      //   console.log(response.data.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchArticlesById();
  }, []);

  return (
    <>
      <Layout>
        {children}
        {/* <Layout hasSider>
          <Sider>
            <Image src={dataDetail.image_url} height={300} style={{ marginLeft: "100px" }} />
          </Sider>
          <Content></Content>
        </Layout> */}
        <Content style={{ marginTop: "10px" }}>
          <Row style={{ paddingLeft: "10vh", paddingRight: "10vh", paddingBottom: "15vh" }}>
            <Col span={24}>
              <Breadcrumb
                items={[
                  {
                    title: "Home",
                  },
                  {
                    title: "Product",
                  },
                  {
                    title: "Detail",
                  },
                ]}
              />
              <Card size="small" style={{ boxShadow: "0px 0px 8px 2px #888888", marginTop: "8px" }}>
                <Image src={dataDetail.image_url} height={200} />
                <h1>Deskripsi : {dataDetail.description}</h1>
                {dataDetail.harga_diskon === 0 ? (
                  <h1>Harga : {dataDetail.harga_display}</h1>
                ) : (
                  <div>
                    <p>
                      Harga sebelum diskon : <span style={{ textDecoration: "line-through" }}>{dataDetail.harga_display}</span>
                    </p>
                    <h2>Harga setelah diskon : {dataDetail.harga_diskon_display}</h2>
                  </div>
                )}
                <p style={{ fontWeight: "bold" }}>Stok : {dataDetail.stock}</p>
                <h3>Kategori : {dataDetail.category}</h3>
              </Card>
              {/* <Image src={dataDetail.image_url} width={500} /> */}
            </Col>
            {/* <Col span={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column" }}>
              <h1>{dataDetail.name}</h1>
              <h2>{dataDetail.description}</h2>
              <h3>{dataDetail.harga_diskon >= 0 ? dataDetail.harga_diskon_display : dataDetail.harga_display}</h3>
              <h4>{dataDetail.category}</h4>
            </Col> */}
          </Row>
        </Content>
      </Layout>
    </>
  );
}

export default DetailPage;
