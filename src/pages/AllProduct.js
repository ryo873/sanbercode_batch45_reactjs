import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Card, Image } from "antd";
const { Content } = Layout;

function AllProduct({ children, fetchArticlesProject, getDataProject }) {
  useEffect(() => {
    fetchArticlesProject();
  }, []);

  sessionStorage.setItem("render", false);

  return (
    <>
      <Layout>
        {children}
        <Content>
          <Row>
            <Col span={8}>
              <h1 style={{ color: "" }}>Catalog Product</h1>
            </Col>
          </Row>
          <Row style={{ height: "100vh", paddingLeft: "9vw", paddingRight: "9vw" }}>
            {getDataProject.map((item, index) => {
              return (
                <Col span={6}>
                  <Card title={`Product ${index + 1}`} size="small" extra={<a href={`/detail/${item.id}`}>Detail</a>} style={{ height: "65vh", marginRight: "5px", marginLeft: "5px", boxShadow: "5px 5px rgba(0,0,0,0.5)" }}>
                    <Image src={item.image_url} height={200} />
                    <p>{item.description?.substring(0, 45) + "..."}</p>
                    {item.harga_diskon === 0 ? (
                      <h1>{item.harga_display}</h1>
                    ) : (
                      <div>
                        <p style={{ textDecoration: "line-through" }}>{item.harga_display}</p>
                        <h1>{item.harga_diskon_display}</h1>
                      </div>
                    )}
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Content>
      </Layout>
    </>
  );
}

export default AllProduct;
