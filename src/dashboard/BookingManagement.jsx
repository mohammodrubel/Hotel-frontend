import React, { useState, useCallback, useMemo } from "react";
import {
  Table,
  Tag,
  Space,
  Card,
  Pagination,
  Button,
  message,
  Modal,
  Select,
  Typography,
} from "antd";
import {
  UserOutlined,
  HomeOutlined,
  CalendarOutlined,
  DollarOutlined,
  CheckOutlined,
  CloseOutlined,
  SyncOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  useGetAllBookingQuery,
  useRemovebookingMutation,
  useUpdateBookingStatusMutation,
} from "../redux/features/booking/bookingApi";
import { toast } from "sonner";

const { Option } = Select;
const { Text } = Typography;
const { confirm } = Modal;

const BookingManagement = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = useMemo(
    () => [
      { name: "limit", value: pageSize },
      { name: "page", value: currentPage },
    ],
    [pageSize, currentPage]
  );

  const {
    data: bookingData,
    isLoading,
    refetch,
  } = useGetAllBookingQuery(queryParams);

  const [removeBooking, { isLoading: isRemoving }] = useRemovebookingMutation();


  const bookings = bookingData?.data?.data || [];
  const meta = bookingData?.data?.meta || {};

  const handleRemove = async (bookingId) => {
    console.log(bookingId);
    try {
      const res = await removeBooking(bookingId.id).unwrap();
      toast.success(res?.message || "Booking deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error(error?.data?.message || "Failed to delete booking");
    }
  };



  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus({ id: bookingId, status: newStatus }).unwrap();
      message.success("Booking status updated successfully");
      refetch();
    } catch (error) {
      message.error(error?.data?.message || "Failed to update booking status");
    }
  };

  const getPaymentStatusTag = (payments) => {
    if (!payments || payments.length === 0) {
      return <Tag color="default">No Payment</Tag>;
    }

    const payment = payments[0];
    const status = payment?.payment_status;

    const statusConfig = {
      PAID: { color: "green", icon: <CheckOutlined />, text: "Paid" },
      PENDING: {
        color: "orange",
        icon: <SyncOutlined spin />,
        text: "Pending",
      },
      FAILED: { color: "red", icon: <CloseOutlined />, text: "Failed" },
    };

    const config = statusConfig[status] || {
      color: "default",
      text: status || "Unknown",
    };

    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const columns = [
    {
      title: "Guest Information",
      dataIndex: "user",
      key: "user",
      width: 180,
      fixed: "left",
      render: (user) => (
        <Space direction="vertical" size={2}>
          <div className="flex items-center">
            <UserOutlined style={{ marginRight: 8, color: "#1890ff" }} />
            <Text strong>{user?.name}</Text>
          </div>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {user?.email}
          </Text>
        </Space>
      ),
    },
    {
      title: "Hotel & Room",
      dataIndex: "room",
      key: "room",
      width: 220,
      render: (room) => (
        <Space direction="vertical" size={2}>
          <Text strong>{room?.hotel?.name}</Text>
          <div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {room?.type} • {room?.location}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Stay Duration",
      key: "dates",
      width: 200,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <div className="flex items-center">
            <CalendarOutlined style={{ marginRight: 8, color: "#fa8c16" }} />
            <Text>
              Check-in: {new Date(record.checkIn).toLocaleDateString()}
            </Text>
          </div>
          <div>
            <Text
              type="secondary"
              style={{ fontSize: "12px", marginLeft: "24px" }}
            >
              Check-out: {new Date(record.checkOut).toLocaleDateString()}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 130,
      align: "center",
      render: (price) => (
        <div className="flex items-center justify-center">
          <DollarOutlined style={{ marginRight: 4, color: "#52c41a" }} />
          <Text strong>{price?.toLocaleString()}</Text>
        </div>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "payments",
      key: "payments",
      width: 140,
      align: "center",
      render: getPaymentStatusTag,
    },
   
    
    {
      title: "Booking Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      align: "center",
      render: (date) => (
        <Text type="secondary">{new Date(date).toLocaleDateString()}</Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemove(record)}
          loading={isRemoving}
          size="small"
        >
          Delete
        </Button>
      ),
    },
  ];

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const tableData = useMemo(
    () =>
      bookings.map((item) => ({
        ...item,
        key: item.id,
      })),
    [bookings]
  );

  return (
    <div style={{ padding: 24 }}>
      <Card
        title={
          <Space>
            <HomeOutlined />
            <Text strong>Booking Management</Text>
            <Tag color="blue">Total: {meta.total || 0}</Tag>
          </Space>
        }
        extra={
          <Button icon={<SyncOutlined />} onClick={refetch} loading={isLoading}>
            Refresh
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={tableData}
          loading={isLoading}
          scroll={{ x: 1200 }}
          pagination={false}
          size="middle"
          bordered
        />

        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 24 }}
        >
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={meta.total || 0}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) =>
              `Showing ${range[0]}-${range[1]} of ${total} bookings`
            }
            onChange={handlePaginationChange}
            onShowSizeChange={(current, size) => {
              setCurrentPage(1);
              setPageSize(size);
            }}
            pageSizeOptions={[10, 20, 50, 100]}
          />
        </div>
      </Card>
    </div>
  );
};

export default BookingManagement;
