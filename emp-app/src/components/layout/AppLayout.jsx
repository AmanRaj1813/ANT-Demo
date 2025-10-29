import React from "react";
import { Card, Layout, Menu, Statistic, Typography } from "antd";
import {
  UserOutlined,
  BarChartOutlined,
  TeamOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import EmployeePage from "../../features/employees/EmployeePage";
const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;
const AppLayout = ({ employeeCount = 0, activeEmployees = 0 }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="dark"
      >
        <div
          style={{
            height: 64,
            margin: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TeamOutlined style={{ fontSize: 24, color: "#fff" }} />
          {!collapsed && (
            <span style={{ color: "#fff", marginLeft: 12, fontSize: 16 }}>
              EMS
            </span>
          )}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Employees
          </Menu.Item>
          <Menu.Item key="3" icon={<BarChartOutlined />}>
            Reports
          </Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<LogoutOutlined />}
            style={{ marginTop: "auto" }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider> */}
      <Layout>
        
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            borderRadius: 8,
            minHeight: 280,
          }}
        >
          <EmployeePage />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Employee Management System ©{new Date().getFullYear()} Created by Your
          Company
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
