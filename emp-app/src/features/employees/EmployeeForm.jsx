// EmployeeForm.jsx
import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  InputNumber,
  DatePicker,
  Row,
  Col,
  Space,
} from "antd";
import {
  SaveOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addEmployee, updateEmployee } from "./employeesSlice";
import moment from "moment";
const { Option } = Select;
const EmployeeForm = ({ open, onClose, editEmployee = null }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // Update form when editing an employee
  useEffect(() => {
    if (editEmployee) {
      form.setFieldsValue({
        ...editEmployee,
        // Convert date string to moment object if it exists
        joinDate: editEmployee.joinDate ? moment(editEmployee.joinDate) : null,
      });
    } else {
      form.resetFields();
      // Set default values
      form.setFieldsValue({ status: "Active" });
    }
  }, [form, editEmployee, open]);
  const onFinish = (values) => {
    // Format date for API
    const formattedValues = {
      ...values,
      joinDate: values.joinDate ? values.joinDate.format("YYYY-MM-DD") : null,
    };
    if (editEmployee) {
      dispatch(updateEmployee({ id: editEmployee.id, ...formattedValues }));
      message.success("Employee updated successfully!");
    } else {
      dispatch(addEmployee(formattedValues));
      message.success("Employee added successfully!");
    }
    form.resetFields();
    onClose();
  };
  const title = editEmployee ? (
    <>
      <EditOutlined /> Edit Employee
    </>
  ) : (
    <>
      <PlusCircleOutlined /> Add New Employee
    </>
  );
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ status: "Active" }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={
                <>
                  <span className="required">*</span> First Name
                </>
              }
              name="firstName"
              rules={[{ required: true, message: "Please enter first name" }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={
                <>
                  <span className="required">*</span> Last Name
                </>
              }
              name="lastName"
              rules={[{ required: true, message: "Please enter last name" }]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label={
            <>
              <span className="required">*</span> Email
            </>
          }
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="employee@company.com" />
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input placeholder="+1-555-0100" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={
                <>
                  <span className="required">*</span> Department
                </>
              }
              name="department"
              rules={[{ required: true, message: "Please select department" }]}
            >
              <Select placeholder="Select department">
                <Option value="Engineering">Engineering</Option>
                <Option value="Marketing">Marketing</Option>
                <Option value="Sales">Sales</Option>
                <Option value="HR">HR</Option>
                <Option value="Finance">Finance</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Position" name="position">
              <Input placeholder="Job title" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Salary" name="salary">
              <InputNumber
                min={0}
                step={1000}
                style={{ width: "100%" }}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                placeholder="50000"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Join Date" name="joinDate">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Status" name="status">
          <Select>
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
            <Option value="On Leave">On Leave</Option>
          </Select>
        </Form.Item>
        <div style={{ textAlign: "right", marginTop: 24 }}>
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              {editEmployee ? "Update" : "Save"}
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
};
export default EmployeeForm;
