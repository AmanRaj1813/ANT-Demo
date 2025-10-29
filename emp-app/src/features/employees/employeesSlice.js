import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";

export const fetchEmployees = createAsyncThunk("employees/fetch", async () => {
  const res = await client.get("/employees");
  return res.data;
});

export const addEmployee = createAsyncThunk("employees/add", async (emp) => {
  const res = await client.post("/employees", emp);
  return res.data;
});

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id) => {
    await client.delete(`/employees/${id}`);
    return id;
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async (id) => {
    await client.put(`/employees/${id}`);
    return id;
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.fulfilled, (s, a) => {
        s.list = a.payload;
      })
      .addCase(addEmployee.fulfilled, (s, a) => {
        s.list.push(a.payload);
      })

      .addCase(updateEmployee.fulfilled, (s, a) => {
        const index = s.list.findIndex((e) => e.id === a.payload.id);
        if (index !== -1) {
          s.list[index] = a.payload;
        }
      });
  },
});

export default employeesSlice.reducer;
