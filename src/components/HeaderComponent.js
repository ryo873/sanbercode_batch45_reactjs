import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Layout, Row, Col, Anchor, Modal, Button, Dropdown, Card, Image, Space } from "antd";
import LogoutDropdownComponent from "./LogoutDropdownComponent";
const { Header, Footer, Sider, Context, Content } = Layout;

function HeaderComponent({ data, fetchArticles, fetchArticlesProject, getDataProject }) {
  const navigate = useNavigate();
  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "#7dbcea",
  };

  // useEffect(() => {
  //   fetchArticlesProject();
  //   fetchArticles();
  // });

  return (
    <Header style={headerStyle}>
      <Row>
        <Col span={8}>Trustshop</Col>
        <Col span={8}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Link to="/" style={{ color: "white", fontWeight: "bolder" }}>
              Home
            </Link>
            <Link to="/products" style={{ color: "white", fontWeight: "bolder" }}>
              Products
            </Link>
            <Link to="/tables" style={{ color: "white", fontWeight: "bolder" }}>
              Tables
            </Link>
          </div>
        </Col>
        <Col span={8}>
          {localStorage.getItem("token") === null ? (
            <Space wrap>
              <Button>
                <Link to="/login">Login</Link>
              </Button>
              <Button type="primary">
                <Link to="/register">Register</Link>
              </Button>
            </Space>
          ) : (
            <LogoutDropdownComponent fetchArticlesProject={fetchArticlesProject} fetchArticles={fetchArticles} />
          )}
        </Col>
      </Row>
    </Header>
  );
}

export default HeaderComponent;
