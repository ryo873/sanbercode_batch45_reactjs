import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Layout, Row, Col, Anchor, Modal, Button, Dropdown, Card, Image, Space } from "antd";

function LogoutDropdownComponent({ fetchArticles, fetchArticlesProject }) {
  // useEffect(() => {
  //   fetchArticles();
  //   fetchArticlesProject();
  // });
  const navigate = useNavigate();
  const onLogout = async () => {
    try {
      const response = await axios.post(
        "https://api-project.amandemy.co.id/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      // return <Navigate to="/" />;
      navigate("/");
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <a rel="noopener noreferrer" onClick={() => onLogout()}>
          Logout
        </a>
      ),
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomLeft"
    >
      <Button>Hai, {localStorage.getItem("username")}</Button>
    </Dropdown>
  );
}

export default LogoutDropdownComponent;
