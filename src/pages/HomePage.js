import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Anchor, Modal, Button, Card, Image } from "antd";
const { Header, Footer, Sider, Context, Content } = Layout;

function HomePage({ data, fetchArticles, fetchArticlesProject, getDataProject, children }) {
  const [isModalOpen, setModalIsOpen] = useState(false);

  const count = useRef(0);

  const showModal = () => {
    setModalIsOpen(true);
  };

  // useEffect(() => {
  //   if (sessionStorage.getItem("render") === false) {
  //     notShowModal();
  //   } else {
  //     showModal();
  //   }
  // }, [isModalOpen]);

  // {
  //   localStorage.getItem("render2") === false ? setModalIsOpen(false) : setModalIsOpen(true);
  // }

  // if (localStorage.getItem("render") === false) {
  //   setModalIsOpen(false);
  // } else {
  //   setModalIsOpen(true);
  // }

  useEffect(() => {
    fetchArticles();
    fetchArticlesProject();
    // count.current = count.current + 1;
    // console.log(count.current);
    // first.current = false;
    // if (sessionStorage.getItem("render") === false) {
    //
    // } else {

    // }
  }, []);

  const handleOk = () => {
    setModalIsOpen(false);
    // localStorage.setItem("render2", false);
  };

  const getItem = getDataProject.filter((item, index) => {
    return index <= 3;
  });

  return (
    <>
      <Layout style={{ boxSizing: "border-box" }}>
        {children}
        <Content style={{ background: "white" }}>
          <Row>
            <Col span={24}>
              <img src={data.image} alt="" style={{ width: "80vw", height: "60vh" }} />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <h1 style={{ color: "" }}>Catalog Product</h1>
            </Col>
          </Row>
          <Row style={{ paddingLeft: "9vw", paddingRight: "9vw" }}>
            {getItem.map((item, index) => {
              return (
                <Col span={6}>
                  <Card title={`Product ${index + 1}`} size="small" extra={<a href={`/detail/${item.id}`}>Detail</a>} style={{ height: "71vh", marginRight: "5px", marginLeft: "5px", boxShadow: "5px 5px rgba(0,0,0,0.5)" }}>
                    <Image src={item.image_url} height={200} />
                    <h1>{item.description?.substring(0, 45) + "..."}</h1>
                    {item.harga_diskon === 0 ? (
                      <h2>{item.harga_display}</h2>
                    ) : (
                      <div>
                        <p style={{ textDecoration: "line-through" }}>{item.harga_display}</p>
                        <h2>{item.harga_diskon_display}</h2>
                      </div>
                    )}
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Content>
      </Layout>
      <Modal
        title="Product Special"
        open={isModalOpen}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Ok
          </Button>,
        ]}
        closable={false}
      >
        <p>{data.title}</p>
        <img src={data.image} alt="" style={{ width: "20vw" }} />
        <p>{data.description}</p>
      </Modal>
    </>
  );
}

export default HomePage;
