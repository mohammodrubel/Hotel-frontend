import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  ApartmentOutlined,
  FileAddOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
  BookOutlined,
  PlusCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";

export const menuItems = [
  {
    key: "dashboard",
    icon: <HomeOutlined />,
    label: "Dashboard",
  },
  {
    key: "rooms",
    icon: <ApartmentOutlined />,
    label: "Rooms",
    children: [
      {
        key: "rooms-create",
        icon: <FileAddOutlined />,
        label: "Create Room",
      },
      {
        key: "rooms-list",
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
        key: "hotel-create",
        icon: <PlusCircleOutlined />,
        label: "Create Hotel",
      },
      {
        key: "hotel-list",
        icon: <EyeOutlined />,
        label: "View Hotels",
      },
    ],
  },
  {
    key: "users",
    icon: <TeamOutlined />,
    label: "Users",
    children: [
      {
        key: "user-list",
        icon: <EyeOutlined />,
        label: "All Users",
      },
    ],
  },
  {
    key: "bookings",
    icon: <BookOutlined />,
    label: "Bookings",
    children: [
      {
        key: "booking-create",
        icon: <FileAddOutlined />,
        label: "Create Booking",
      },
      {
        key: "booking-list",
        icon: <EyeOutlined />,
        label: "View Bookings",
      },
    ],
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
  },
];
