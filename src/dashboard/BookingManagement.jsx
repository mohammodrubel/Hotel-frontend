import React, { useState } from "react";
import {
  Table,
  Tag,
  Space,
  Card,
  Pagination,
  Dropdown,
  Button,
  Menu,
  message,
  Modal,
} from "antd";
import {
  UserOutlined,
  HomeOutlined,
  CalendarOutlined,
  DollarOutlined,
  MoreOutlined,
  CheckOutlined,
  CloseOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  useGetAllBookingQuery,
  // useUpdateBookingStatusMutation,
} from "../redux/features/booking/bookingApi";

const BookingManagement = () => {
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  // const [updateBookingStatus, { isLoading: isUpdating }] =
  //   useUpdateBookingStatusMutation();

  const { data, isLoading, refetch } = useGetAllBookingQuery([
    { name: "limit", value: limit },
    { name: "page", value: page },
  ]);

  const bookings = data?.data?.data || [];
  const meta = data?.data?.meta || {};

  // Status configuration
  const statusConfig = {
    PENDING: { color: "orange", text: "Pending", icon: <SyncOutlined spin /> },
    CONFIRMED: { color: "green", text: "Confirmed", icon: <CheckOutlined /> },
    CANCELLED: { color: "red", text: "Cancelled", icon: <CloseOutlined /> },
    FAILED: {
      color: "volcano",
      text: "Failed",
      icon: <ExclamationCircleOutlined />,
    },
  };

  // Handle status update
  // const handleStatusUpdate = async (bookingId, newStatus) => {
  //   Modal.confirm({
  //     title: "Confirm Status Update",
  //     icon: <ExclamationCircleOutlined />,
  //     content: `Are you sure you want to change the booking status to ${statusConfig[newStatus]?.text}?`,
  //     okText: "Yes",
  //     cancelText: "No",
  //     onOk: async () => {
  //       try {
  //         await updateBookingStatus({
  //           id: bookingId,
  //           status: newStatus,
  //         }).unwrap();

  //         message.success(
  //           `Booking status updated to ${statusConfig[newStatus]?.text}`
  //         );
  //         refetch(); // Refresh the data
  //       } catch (error) {
  //         message.error("Failed to update booking status");
  //         console.error("Update error:", error);
  //       }
  //     },
  //   });
  // };

  // Get available status options based on current status
  const getStatusOptions = (currentStatus) => {
    const allStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "FAILED"];

    // Filter out current status and return available options
    return allStatuses.filter((status) => status !== currentStatus);
  };

  const columns = [
    {
      title: "Guest",
      dataIndex: "user",
      key: "user",
      width: 150,
      render: (user) => (
        <Space direction="vertical" size={0}>
          <div>
            <UserOutlined style={{ marginRight: 8, color: "#1890ff" }} />
            {user?.name}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>{user?.email}</div>
        </Space>
      ),
    },
    {
      title: "Hotel & Room",
      dataIndex: "room",
      key: "room",
      width: 200,
      render: (room) => (
        <Space direction="vertical" size={0}>
          <div>
            {room?.hotel?.name}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            {room?.type} • {room?.location}
          </div>
        </Space>
      ),
    },
    {
      title: "Dates",
      dataIndex: "dates",
      key: "dates",
      width: 180,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <div>
            <CalendarOutlined style={{ marginRight: 8, color: "#fa8c16" }} />
            {new Date(record.checkIn).toLocaleDateString()}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            Check-out: {new Date(record.checkOut).toLocaleDateString()}
          </div>
        </Space>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      width: 100,
      render: (_, record) => {
        const checkIn = new Date(record.checkIn);
        const checkOut = new Date(record.checkOut);
        const duration = Math.ceil(
          (checkOut - checkIn) / (1000 * 60 * 60 * 24)
        );
        return `${duration} night${duration > 1 ? "s" : ""}`;
      },
    },
    {
      title: "Guests",
      dataIndex: "guestCount",
      key: "guestCount",
      width: 80,
      align: "center",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 120,
      render: (price) => (
        <div>
          <DollarOutlined style={{ marginRight: 4, color: "#52c41a" }} />
          {price?.toLocaleString()}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => {
        const config = statusConfig[status] || {
          color: "default",
          text: status,
          icon: <ExclamationCircleOutlined />,
        };
        return (
          <Tag icon={config.icon} color={config.color}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: "Payment",
      dataIndex: "payments",
      key: "payments",
      width: 120,
      render: (payments) => {
        const paidPayment = payments?.find((p) => p.paymentStatus === "PAID");
        return paidPayment ? (
          <Tag color="green">Paid</Tag>
        ) : (
          <Tag color="red">Unpaid</Tag>
        );
      },
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      fixed: "right",
      render: (_, record) => {
        const availableStatuses = getStatusOptions(record.status);

        const menu = (
          <Menu>
            {availableStatuses.map((status) => (
              <Menu.Item
                key={status}
                // onClick={() => handleStatusUpdate(record.id, status)}
                // disabled={isUpdating}
              >
                <Space>
                  {statusConfig[status]?.icon}
                  Change to {statusConfig[status]?.text}
                </Space>
              </Menu.Item>
            ))}
          </Menu>
        );

        return (
          <Dropdown
            overlay={menu}
            placement="bottomRight"
            trigger={["click"]}
            // disabled={isUpdating}
          >
            <Button type="text" icon={<MoreOutlined />}  />
          </Dropdown>
        );
      },
    },
  ];

  // Handle pagination change
  const handlePageChange = (newPage, newPageSize) => {
    setPage(newPage);
    setLimit(newPageSize);
  };

  return (
    <div style={{ padding: 24 }}>
      <Card
        title={
          <Space>
            <HomeOutlined />
            Bookings Management
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={bookings.map((item) => ({
            ...item,
            key: item.id,
          }))}
          loading={isLoading}
          scroll={{ x: 1500 }}
          pagination={false}
          size="middle"
        />

        <div className="flex justify-center my-10">
          <Pagination
            current={page}
            pageSize={limit}
            total={meta.total || 0}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) =>
              `Showing ${range[0]}-${range[1]} of ${total} bookings`
            }
            onChange={handlePageChange}
            onShowSizeChange={(current, size) => {
              setPage(1);
              setLimit(size);
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default BookingManagement;
