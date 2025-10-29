import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "./app/store";
import "antd/dist/reset.css";
import AppLayout from "./components/layout/AppLayout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ConfigProvider theme={{ token: { colorPrimary: "#1677ff" } }}>
      <AppLayout />
    </ConfigProvider>
  </Provider>
);
