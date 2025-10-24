import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Avatar, Dropdown } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const { Header, Sider, Content } = Layout;

export const menuItems = [
  {
    key: "/dashboard",
    label: "Dashboard",
  },
  {
    key: "/dashboard/users",
    label: "Users",
  },
  {
    key: "rooms",
    label: "Rooms",
    children: [
      {
        key: "/dashboard/rooms/create",
        label: "Create Room",
      },
      {
        key: "/dashboard/rooms",
        label: "View Rooms",
      },
    ],
  },
  {
    key: "hotels",
    label: "Hotels",
    children: [
      {
        key: "/dashboard/hotels/create",
        label: "Create Hotel",
      },
      {
        key: "/dashboard/hotels",
        label: "View Hotels",
      },
    ],
  },
  {
    key: "bookings",
    label: "Bookings",
    children: [
      {
        key: "/dashboard/bookings/create",
        label: "Create Booking",
      },
      {
        key: "/dashboard/bookings",
        label: "View Bookings",
      },
    ],
  },
  {
    key: "/dashboard/settings",
    label: "Settings",
  },
];

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menu = {
    items: [
      {
        key: "profile",
        icon: <UserOutlined />,
        label: "Profile",
        onClick: () => navigate("/profile"),
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Logout",
        onClick: () => {
          // dispatch(logout());
          navigate("/login");
        },
      },
    ],
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="!bg-white shadow-sm border-0 h-screen"
        width={230}
      >
        <div className="text-center py-4 font-bold text-xl">
          {collapsed ? "🏨" : "Hotel Admin"}
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["/dashboard"]}
          className="h-full border-r-0"
          onClick={({ key }) => navigate(key)}
          items={menuItems}
        />
      </Sider>

      <Layout>
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

        <Content className="m-6 p-6 bg-white rounded-lg shadow-sm min-h-[70vh]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
