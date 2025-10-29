import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "./usersSlice";
import UserForm from "./UserForm";
import UserChart from "./UserChart";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((s) => s.users);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    message.success("User deleted");
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Action",
      render: (_, r) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(r.id)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        Add User
      </Button>
      <Table
        rowKey="id"
        dataSource={list}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
      <UserForm open={modalOpen} onClose={() => setModalOpen(false)} />
      <UserChart data={list} />
    </Space>
  );
};
export default UsersPage;
