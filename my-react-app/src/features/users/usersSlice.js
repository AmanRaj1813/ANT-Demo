import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../api/client";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await client.get("/users");
  return res.data;
});
export const addUser = createAsyncThunk("users/add", async (data) => {
  const res = await client.post("/users", data);
  return res.data;
});
export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  await client.delete(`/users/${id}`);
  return id;
});

const usersSlice = createSlice({
  name: "users",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (s, a) => {
        s.list = a.payload;
      })
      .addCase(addUser.fulfilled, (s, a) => {
        s.list.push(a.payload);
      })
      .addCase(deleteUser.fulfilled, (s, a) => {
        s.list = s.list.filter((u) => u.id !== a.payload);
      });
  },
});
export default usersSlice.reducer;
