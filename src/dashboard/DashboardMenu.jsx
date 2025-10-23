import {
  HomeOutlined,
  ApartmentOutlined,
  FileAddOutlined,
  EyeOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
  BookOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export const menuItems = [
  {
    key: "/dashboard",
    icon: <HomeOutlined />,
    label: "Dashboard",
  },
  {
    key: "/dashboard/users",
    icon: <TeamOutlined />,
    label: "Users",
  },
  {
    key: "rooms",
    icon: <ApartmentOutlined />,
    label: "Rooms",
    children: [
      {
        key: "/dashboard/rooms/create",
        icon: <FileAddOutlined />,
        label: "Create Room",
      },
      {
        key: "/dashboard/rooms",
        icon: <EyeOutlined />,
        label: "View Rooms",
      },
    ],
  },
  {
    key: "hotels",
    icon: <AppstoreAddOutlined />,
    label: "Hotels",
    children: [
      {
        key: "/dashboard/hotels/create",
        icon: <FileAddOutlined />,
        label: "Create Hotel",
      },
      {
        key: "/dashboard/hotels",
        icon: <EyeOutlined />,
        label: "View Hotels",
      },
    ],
  },

  {
    key: "bookings",
    icon: <BookOutlined />,
    label: "Bookings",
    children: [
      {
        key: "/dashboard/bookings/create",
        icon: <FileAddOutlined />,
        label: "Create Booking",
      },
      {
        key: "/dashboard/bookings",
        icon: <EyeOutlined />,
        label: "View Bookings",
      },
    ],
  },
  {
    key: "/dashboard/settings",
    icon: <SettingOutlined />,
    label: "Settings",
  },
];
