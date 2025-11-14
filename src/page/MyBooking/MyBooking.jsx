import React, { useEffect } from "react";
import { Table, Tag, Image, Card, Button, Typography, Empty, Grid } from "antd";
import {
  EyeOutlined,
  CalendarOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useGetMyBookingQuery } from "../../redux/features/booking/bookingApi";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navigation";
import { useSelector, useDispatch } from "react-redux";
import { baseApi } from "../../redux/api/baseApi"; // ✅ make sure path is correct
import { Link, Navigate } from "react-router-dom";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const MyBooking = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const { data, isLoading, error, refetch } = useGetMyBookingQuery(undefined, {
    skip: !user,
  });

  const screens = useBreakpoint();
  const bookings = data?.data || [];

  // ✅ Clear old cache and refetch when user changes
  useEffect(() => {
    if (!user) {
      // user logged out → clear all RTK Query caches
      dispatch(baseApi.util.resetApiState());
    } else {
      // new user logged in → refetch bookings
      refetch();
    }
  }, [user, dispatch, refetch]);



  // Helpers
  const getRoomTypeColor = (type) =>
    ({
      FAMILY: "green",
      DOUBLE: "blue",
      SINGLE: "purple",
      SUITE: "gold",
      DELUXE: "cyan",
    }[type] || "default");

  const getStatusColor = (status) =>
    ({
      CONFIRMED: "green",
      PENDING: "orange",
      CANCELLED: "red",
      COMPLETED: "blue",
    }[status] || "default");

  const columns = [
    {
      title: "Room",
      dataIndex: ["room", "images"],
      key: "image",
      width: screens.xs ? 60 : 80,
      render: (images, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Image
            width={screens.xs ? 50 : 60}
            height={screens.xs ? 50 : 60}
            src={images?.[0]}
            alt={`Room ${record.room?.type}`}
            style={{
              borderRadius: 6,
              objectFit: "cover",
              border: "1px solid #f0f0f0",
            }}
            preview={false}
          />
          {screens.xs && (
            <Tag
              color={getRoomTypeColor(record.room?.type)}
              style={{ fontSize: 10, padding: "2px 6px", margin: 0 }}
            >
              {record.room?.type?.charAt(0)}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: ["room", "type"],
      key: "type",
      responsive: ["sm"],
      render: (type) => (
        <Tag
          color={getRoomTypeColor(type)}
          style={{
            fontWeight: 500,
            padding: screens.xs ? "2px 6px" : "4px 8px",
            fontSize: screens.xs ? 11 : 12,
          }}
        >
          {screens.xs ? type?.charAt(0) : type}
        </Tag>
      ),
    },
    {
      title: "Check In",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (date) => (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <CalendarOutlined style={{ color: "#52c41a" }} />
          <Text>
            {new Date(date).toLocaleDateString("en", {
              month: "short",
              day: "numeric",
              year: screens.xs ? undefined : "numeric",
            })}
          </Text>
        </div>
      ),
    },
    {
      title: "Check Out",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (date) => (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <CalendarOutlined style={{ color: "#ff4d4f" }} />
          <Text>
            {new Date(date).toLocaleDateString("en", {
              month: "short",
              day: "numeric",
              year: screens.xs ? undefined : "numeric",
            })}
          </Text>
        </div>
      ),
    },
    {
      title: "Guests",
      dataIndex: "guestCount",
      key: "guestCount",
      align: "center",
      responsive: ["sm"],
      render: (count) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 4 }}>
          <UserOutlined style={{ color: "#1890ff" }} />
          <Text strong>{count}</Text>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <DollarOutlined style={{ color: "#faad14" }} />
          <Text strong style={{ color: "#faad14" }}>
            ${(price / 100).toFixed(0)}
          </Text>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={getStatusColor(status)}
          style={{
            fontWeight: 600,
            padding: screens.xs ? "2px 6px" : "4px 8px",
            borderRadius: 6,
            fontSize: screens.xs ? 10 : 12,
          }}
        >
          {screens.xs
            ? status.charAt(0)
            : status.charAt(0) + status.slice(1).toLowerCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      responsive: ["md"],
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          size="small"
        >
          <Link to={`/room/${record?.room?.id}`}>View Room</Link> 
        </Button>
      ),
    },
  ];

  // Loading
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="ant-spin ant-spin-lg">
            <span className="ant-spin-dot ant-spin-dot-spin">
              <i className="ant-spin-dot-item" />
              <i className="ant-spin-dot-item" />
              <i className="ant-spin-dot-item" />
              <i className="ant-spin-dot-item" />
            </span>
          </div>
          <Text type="secondary" style={{ fontSize: 16 }}>
            Loading your bookings...
          </Text>
        </div>
        <Footer />
      </>
    );
  }

  // Error
  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto min-h-screen p-8">
          <Card style={{ borderColor: "#ff4d4f", textAlign: "center" }}>
            <Title level={3} style={{ color: "#ff4d4f" }}>
              Failed to Load Bookings
            </Title>
            <Text type="secondary">
              {error?.data?.message ||
                "Something went wrong. Please try again."}
            </Text>
            <br />
            <Button type="primary" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  // Empty state
  if (!bookings.length) {
    return (
      <>
        <Navbar />
        <div className="container py-20 p-8 mx-auto">
          <Card style={{ textAlign: "center" }}>
            <Empty
              description={
                <>
                  <Title level={4} style={{ color: "#999" }}>
                    You have no bookings
                  </Title>
                  <Text type="secondary">
                    When you make a booking, it will appear here.
                  </Text>
                </>
              }
            >
              <Button
                type="primary"
                onClick={() => (window.location.href = "/room")}
              >
                Browse Rooms
              </Button>
            </Empty>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  // Main view
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 p-4 md:p-8">
        <Card
          style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <div style={{ marginBottom: 24 }}>
            <Title level={2} style={{ margin: 0 }}>
              My Bookings
            </Title>
            <Text type="secondary">
              You have {bookings.length} booking
              {bookings.length !== 1 ? "s" : ""}
            </Text>
          </div>
          <Table
            columns={columns}
            dataSource={bookings.map((b) => ({ ...b, key: b.id }))}
            scroll={{ x: screens.xs ? 600 : 800 }}
            pagination={{
              pageSize: 10,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} bookings`,
            }}
            size={screens.xs ? "small" : "middle"}
          />
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default MyBooking;
