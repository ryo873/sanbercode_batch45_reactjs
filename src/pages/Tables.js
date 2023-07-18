import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Space, Table, Button, Row, Col, Modal } from "antd";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Tables({ children, fetchArticlesProject, getDataProject }) {
  const [open, setOpen] = useState(false);
  const [getIdDelete, setIdDelete] = useState(0);
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchArticlesProject();
  }, []);

  const navigate = useNavigate();

  const handleOk = async () => {
    try {
      const response = await axios.delete(`https://api-project.amandemy.co.id/api/final/products/${getIdDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Berhasil menghapus data");
      setOpen(false);
      fetchArticlesProject();
    } catch (error) {
      alert(error.response.data.info);
    }
  };

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
          <Button href={`/getProduct/${record.item}`}>Ubah</Button>
          <Button
            danger
            onClick={() => {
              showModal();
              setIdDelete(record.item);
            }}
          >
            Hapus
          </Button>
        </Space>
      ),
    },
  ];

  console.log(data);

  return (
    <>
      <Layout>
        {children}
        <Row>
          <Col span={8} offset={16} style={{ padding: "10px" }}>
            <Button type="primary">
              <Link to="/create">Create Product</Link>
            </Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} />
      </Layout>
      <Modal title="Konfirmasi Hapus" open={open} onOk={handleOk} onCancel={handleCancel}>
        <p style={{ fontSize: "20px" }}>Anda Yakin Ingin Menghapus?</p>
        <small>Data yang dihapus tidak bisa dikembalikan</small>
      </Modal>
    </>
  );
}

export default Tables;
