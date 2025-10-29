import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, deleteEmployee } from "./employeesSlice";
import {
  Table,
  Button,
  Popconfirm,
  Space,
  message,
  Input,
  Select,
  Card,
  Statistic,
  Layout,
  Typography,
  Tag,
  Row,
  Col,
  Divider,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
  TeamOutlined,
  DeleteOutlined,
  EditOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import EmployeeForm from "./EmployeeForm";
import EmployeePieChart from "./EmployeePieChart";
// import "./EmployeePage.css";
const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const EmployeePage = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((s) => s.employees);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [sortedInfo, setSortedInfo] = useState({});
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);
  useEffect(() => {
    if (list) {
      const filtered = list.filter((emp) => {
        const matchesSearch =
          !searchTerm ||
          emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.department?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment =
          !departmentFilter || emp.department === departmentFilter;
        return matchesSearch && matchesDepartment;
      });
      setFilteredEmployees(filtered);
    }
  }, [list, searchTerm, departmentFilter]);
  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
    message.success("Employee deleted successfully!");
  };
  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setOpen(true);
  };
  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };
  // Helper function to get color for department tag
  const getDepartmentColor = (department) => {
    const colors = {
      Engineering: "blue",
      Marketing: "pink",
      Sales: "green",
      HR: "orange",
      Finance: "purple",
    };
    return colors[department] || "default";
  };
  // Helper function to get color for status tag
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "error";
      case "On Leave":
        return "warning";
      default:
        return "default";
    }
  };
  // Enhanced columns with sorting and better display
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
      key: "id",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      sorter: (a, b) => (a.department || "").localeCompare(b.department || ""),
      sortOrder: sortedInfo.columnKey === "department" && sortedInfo.order,
      render: (department) =>
        department ? (
          <Tag color={getDepartmentColor(department)}>{department} </Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => (a.role || "").localeCompare(b.role || ""),
      sortOrder: sortedInfo.columnKey === "role" && sortedInfo.order,
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      sorter: (a, b) => a.salary - b.salary,
      sortOrder: sortedInfo.columnKey === "salary" && sortedInfo.order,
      render: (salary) => (salary ? `$${salary.toLocaleString()}` : "-"),
      className: "salary-column",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status ? (
          <Tag color={getStatusColor(status)}>{status} </Tag>
        ) : (
          <Tag color="default">Unknown</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title={`Are you sure you want to delete ${record.name}?`}
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  //Calculate total employees
  const totalEmployees = list ? list.length : 0;
  // Calculate stats
  const activeEmployees = list
    ? list.filter((emp) => emp.status === "Active").length
    : 0;
  return (
    <Layout className="employee-layout">
     
      <Header
        style={{
          padding: "0 20px",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Employee Management System
        </Title>
        <div style={{ display: "flex", gap: 16 }}>
          <Card style={{ marginBottom: 0 }}>
            <Statistic
              title="Total Employees"
              value={totalEmployees}
              prefix={<TeamOutlined />}
            />
          </Card>
          <Card style={{ marginBottom: 0 }}>
            <Statistic
              title="Active Employees"
              value={activeEmployees}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </div>
      </Header>
      <Content className="employee-content">
        <div className="toolbar">
          <Space>
            <Input
              placeholder="Search employees..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 300 }}
              allowClear
            />
            <Select
              placeholder="Filter by Department"
              style={{ width: 180 }}
              value={departmentFilter}
              onChange={setDepartmentFilter}
              allowClear
            >
              <Option value="">All Departments</Option>
              <Option value="Engineering">Engineering</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="Sales">Sales</Option>
              <Option value="HR">HR</Option>
              <Option value="Finance">Finance</Option>
            </Select>
          </Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditEmployee(null);
              setOpen(true);
            }}
          >
            Add Employee
          </Button>
        </div>
        <Table
          rowKey="id"
          dataSource={filteredEmployees}
          columns={columns}
          pagination={{ pageSize: 5 }}
          onChange={handleTableChange}
          className="employee-table"
          loading={list === null}
        />
        <Divider />
        <Row gutter={24}>
          <Col span={24}>
            <Card title="Department Distribution" className="chart-card">
              <EmployeePieChart data={list} />
            </Card>
          </Col>
        </Row>
      </Content>
      <EmployeeForm
        open={open}
        onClose={() => {
          setOpen(false);
          setEditEmployee(null);
        }}
        editEmployee={editEmployee}
      />
    </Layout>
  );
};
export default EmployeePage;
