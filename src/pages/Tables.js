import React, { useEffect, useState } from "react";
import { Layout, Space, Table, Tag } from "antd";
import { useNavigate, Navigate } from "react-router-dom";

function Tables({ children, fetchArticlesProject, getDataProject }) {
  //   const [token, setToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticlesProject();
  }, []);

  //   localStorage.setItem("token", "ok");
  //   localStorage.removeItem("token");
  //   useEffect(() => setToken(localStorage.getItem("token")), [token]);

  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" />;
  }

  const data = getDataProject.map((item, index) => {
    return { item: item.id, name: item.name, harga_display: item.harga_display, harga_diskon_display: item.harga_diskon_display, is_diskon: item.is_diskon, image_url: item.image_url, category: item.category, username: item.user.username };
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Nama Barang",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Harga",
      dataIndex: "harga_display",
      key: "harga_display",
    },
    {
      title: "Harga Diskon",
      dataIndex: "harga_diskon_display",
      key: "harga_diskon_display",
    },
    {
      title: "Status Diskon",
      dataIndex: "is_diskon",
      key: "is_diskon",
      render: (text) => <p>{text === true ? "Aktif" : "Tidak  Aktif"}</p>,
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (url) => <img src={url} width={100} alt="" />,
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Created By",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Ubah {record.Nama}</a>
          <a>Hapus</a>
        </Space>
      ),
    },
  ];

  console.log(data);

  return (
    <>
      <Layout>
        {children}
        <Table columns={columns} dataSource={data} />
      </Layout>
    </>
  );
}

export default Tables;
