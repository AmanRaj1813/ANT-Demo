import React from "react";
import { Card, Layout, List, Menu, Statistic } from "antd";
import { UserOutlined, BarChartOutlined, TeamOutlined } from "@ant-design/icons";
import EmployeePage from "../../features/employees/EmployeePage";
import Title from "antd/es/skeleton/Title";

const { Header, Sider, Content } = Layout;

const AppLayout = () => (
  <Layout style={{ minHeight: "100vh" }}>
    {/* <Sider>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        items={[
          { key: "1", icon: <UserOutlined />, label: "Employees" },
          { key: "2", icon: <BarChartOutlined />, label: "Analytics" },
        ]}
      />
    </Sider> */}
    <Layout>
      <Header className="employee-header">
        <div className="header-title">
          <TeamOutlined />
          <Title
            level={4}
            style={{ color: "white", margin: 0, marginLeft: 12 }}
          >
            Employee Management System
          </Title>
        </div>
        <div className="header-stats">
          <Card className="stat-card">
            <Statistic
              title="Total Employees"
              value={List?.length || 0}
              valueStyle={{ color: "white" }}
            />
          </Card>
          {/* <Card className="stat-card">
            <Statistic
              title="Active Employees"
              value={activeEmployees}
              valueStyle={{ color: "white" }}
            />
          </Card> */}
        </div>
      </Header>
      {/* <Content style={{ padding: 24 }}> */}
        <EmployeePage />
      {/* </Content> */}
    </Layout>
  </Layout>
);
export default AppLayout;
