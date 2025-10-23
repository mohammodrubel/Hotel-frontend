import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Avatar, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { menuItems } from "./DashboardMenu";

const { Header, Sider, Content, Footer } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Dropdown menu (user options)
  const menu = {
    items: [
      {
        key: "profile",
        label: "Profile",
        onClick: () => navigate("/profile"),
      },
      {
        key: "logout",
        label: "Logout",
        onClick: () => {
        //   dispatch(logout());
          navigate("/login");
        },
        // icon: <LogoutOutlined />,
      },
    ],
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className=" !bg-white shadow-sm border-0 h-screen"
        width={230}
      >
        <div className="text-center py-4 font-bold text-xl">
          {collapsed ? "🏨" : "Hotel Admin"}
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="h-full border-r-0"
          onClick={({ key }) => {
            if (key === "1") navigate("/");
            if (key === "2") navigate("/users");
            if (key === "3") navigate("/settings");
          }}
          items={menuItems}
        />
      </Sider>

      {/* Main layout */}
      <Layout>
        {/* Header */}
        <Header className="!bg-white shadow-sm flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-700"
            />
            <h2 className="text-lg font-semibold text-gray-700">
              Dashboard Overview
            </h2>
          </div>

          <Dropdown menu={menu} placement="bottomRight" arrow>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg">
              <Avatar size="small" src="https://i.pravatar.cc/40" />
              <span className="text-gray-600 font-medium">Admin</span>
            </div>
          </Dropdown>
        </Header>

        {/* Content */}
        <Content className="m-6 p-6 bg-white rounded-lg shadow-sm min-h-[70vh]">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">Hello world</h1>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
