import React from "react";
import { Card } from "antd";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#1677ff", "#52c41a", "#faad14", "#eb2f96", "#13c2c2"];

const EmployeePieChart = ({ data }) => {
  const roleCount = data.reduce((acc, e) => {
    acc[e.role] = (acc[e.role] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.entries(roleCount).map(([role, count]) => ({
    role,
    count,
  }));

  return (
    <Card title="Employee Role Distribution">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="role"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default EmployeePieChart;
