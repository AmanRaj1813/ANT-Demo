import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, BarChartOutlined } from "@ant-design/icons";
import UsersPage from "../../features/users/UsersPage";

const { Header, Sider, Content } = Layout;

const AppLayout = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Sider>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        items={[
          { key: "1", icon: <UserOutlined />, label: "Users" },
          { key: "2", icon: <BarChartOutlined />, label: "Analytics" },
        ]}
      />
    </Sider>
    <Layout>
      <Header style={{ color: "#fff" }}>AI Analytics Dashboard</Header>
      <Content style={{ padding: 24 }}>
        <UsersPage />
      </Content>
    </Layout>
  </Layout>
);
export default AppLayout;
