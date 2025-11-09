import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  SettingOutlined,
  ApartmentOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Avatar, Dropdown } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";

const { Header, Sider, Content } = Layout;

// ✅ Sidebar menu items
const menuItems = [
  {
    key: "/dashboard",
    icon: <HomeOutlined />,
    label: "Dashboard",
  },
  {
    key: "/dashboard/users",
    icon: <UserOutlined />,
    label: "Users",
  },
  {
    key: "rooms",
    icon: <ApartmentOutlined />,
    label: "Rooms",
    children: [
      { key: "/dashboard/rooms/create", label: "Create Room" },
      { key: "/dashboard/rooms", label: "View Rooms" },
    ],
  },
  {
    key: "hotels",
    icon: <ApartmentOutlined />,
    label: "Hotels",
    children: [
      { key: "/dashboard/hotels/create", label: "Create Hotel" },
      { key: "/dashboard/hotels", label: "View Hotels" },
    ],
  },
  {
    key: "/dashboard/bookings",
    icon: <BookOutlined />,
    label: "Bookings",
  },
  {
    key: "/dashboard/settings",
    icon: <SettingOutlined />,
    label: "Settings",
  },
];

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);

  const firstLetter =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "A";

  // ✅ Dropdown menu
  const dropdownMenu = {
    items: [
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Logout",
        onClick: () => {
          dispatch(logout());
          navigate("/login");
        },
      },
    ],
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        className="!bg-white shadow-sm h-screen"
      >
        <div className="flex items-center justify-center py-4 ">
          <h1 className="text-xl font-bold text-gray-700">
            {collapsed ? "🏨" : "Hotel Admin"}
          </h1>
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["/dashboard"]}
          onClick={({ key }) => navigate(key)}
          items={menuItems}
          className="mt-2"
        />
      </Sider>

      {/* MAIN CONTENT */}
      <Layout>
        {/* HEADER */}
        <Header className="!bg-white flex items-center justify-between shadow-sm px-4">
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

          {/* PROFILE DROPDOWN */}
          <Dropdown menu={dropdownMenu} placement="bottomRight" arrow>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-lg">
              <Avatar
                size="small"
                style={{
                  backgroundColor: "#1890ff",
                  verticalAlign: "middle",
                  fontWeight: "bold",
                }}
              >
                {firstLetter}
              </Avatar>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium text-gray-700">
                  {user?.name || "Admin"}
                </span>
                <span className="text-xs text-gray-500">
                  {user?.email || "admin@example.com"}
                </span>
              </div>
            </div>
          </Dropdown>
        </Header>

        {/* CONTENT */}
        <Content className="m-6 p-6 bg-white rounded-lg shadow-sm min-h-[70vh]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
