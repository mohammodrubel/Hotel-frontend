import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Input,
  Radio,
  Slider,
  Spin,
  Typography,
  Divider,
  Tag,
  Button,
  Tooltip,
  Modal,
  message,
  Pagination,
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  FilterOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useGetAllRoomAvalableQuery } from "../../redux/features/room/roomApi";
import Navbar from "../../components/Navigation";
import { useSelector } from "react-redux";
import BookingModal from "../../components/BookingModal";
import RoomCard from "../../components/RoomCard";

const { Title, Text } = Typography;

const Room = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.user);

  // Get values from URL params
  const {
    searchTerm = "",
    guestCount = "",
    checkIn = "",
    checkOut = "",
  } = Object.fromEntries(searchParams.entries());

  // Local states
  const [search, setSearchTerm] = useState(searchTerm);
  const [guest, setGuestCount] = useState(guestCount);
  const [checkin, setCheckIn] = useState(checkIn);
  const [checkout, setCheckout] = useState(checkOut);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [roomType, setRoomType] = useState("");

  // 💰 Dynamic Price States
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [maxRoomPrice, setMaxRoomPrice] = useState(0);

  // Booking Modal
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Fetch data
  const { data, isLoading } = useGetAllRoomAvalableQuery([
    { name: "searchTerm", value: search || "" },
    { name: "guestCount", value: guest || "" },
    { name: "checkIn", value: checkin || "" },
    { name: "checkOut", value: checkout || "" },
    { name: "type", value: roomType },
    { name: "minPrice", value: priceRange[0] || 0 },
    { name: "maxPrice", value: priceRange[1] || maxRoomPrice || 100000 },
    { name: "limit", value: limit },
    { name: "page", value: page },
  ]);

  // ⚙️ Calculate max room price dynamically after data load
  useEffect(() => {
    if (data?.data?.length > 0) {
      const maxPrice = Math.max(
        ...data.data.map((room) => room.pricePerNight || 0)
      );
      setMaxRoomPrice(maxPrice);

      // Initialize range if not set yet
      if (priceRange[1] === 0) {
        setPriceRange([0, maxPrice]);
      }
    }
  }, [data]);

  // 🧹 Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setGuestCount("");
    setRoomType("");
    if (maxRoomPrice > 0) {
      setPriceRange([0, maxRoomPrice]);
    }
  };

  // 🧭 Handle actions
  const handleRoomTypeChange = (e) => setRoomType(e.target.value);
  const handleGuestCountChange = (e) => setGuestCount(e.target.value);

  const handleViewDetails = (room) => {
    if (!user) {
      Modal.confirm({
        title: "Authentication Required",
        content: "Please login to view room details.",
        okText: "Login",
        cancelText: "Cancel",
        onOk: () => navigate("/login"),
      });
      return;
    }
    navigate(`/room/${room?.id}`);
  };

  const handleBookNowClick = (room) => {
    if (!user) {
      Modal.confirm({
        title: "Authentication Required",
        content: "Please login to book this room.",
        okText: "Login",
        cancelText: "Cancel",
        onOk: () => navigate("/login"),
      });
      return;
    }
    setSelectedRoom(room);
    setIsBookingModalVisible(true);
  };

  const handleBookingSuccess = () => {
    message.success("Booking completed successfully!");
    setSelectedRoom(null);
  };

  const hasActiveFilters =
    search ||
    guest ||
    roomType ||
    priceRange[0] > 0 ||
    priceRange[1] < maxRoomPrice;

  return (
    <div>
      <Navbar />
      <div className="container mt-20 mx-auto">
        <Row gutter={[24, 24]}>
          {/* Sidebar Filters */}
          <Col xs={24} md={8} lg={6}>
            <div style={{ position: "sticky", top: 80 }}>
              <Card
                title={
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Title level={4} style={{ margin: 0, color: "#1a3353" }}>
                      <FilterOutlined style={{ color: "#1890ff" }} /> Filters
                    </Title>
                    {hasActiveFilters && (
                      <Tooltip title="Clear all filters">
                        <Button
                          type="text"
                          icon={<DeleteOutlined />}
                          onClick={clearAllFilters}
                          style={{ color: "#ff4d4f" }}
                          size="small"
                        >
                          Clear
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                }
                style={{
                  borderRadius: 16,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                }}
              >
                {/* 🔍 Search */}
                <Input
                  placeholder="Search hotel..."
                  value={search}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  prefix={<SearchOutlined style={{ color: "#1890ff" }} />}
                  style={{
                    marginBottom: 12,
                    borderRadius: 12,
                    height: 48,
                    border: "1px solid #d6e4ff",
                    boxShadow: "0 2px 8px rgba(24,144,255,0.1)",
                  }}
                  size="large"
                />

                {/* 🏨 Room Type */}
                <Divider style={{ fontWeight: 600 }}>🏨 Room Type</Divider>
                <Radio.Group
                  value={roomType}
                  onChange={handleRoomTypeChange}
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {[
                    "SINGLE",
                    "DOUBLE",
                    "TWIN",
                    "DELUXE",
                    "SUITE",
                    "FAMILY",
                    "PRESIDENTIAL",
                  ].map((type) => (
                    <Radio key={type} value={type}>
                      {type}
                    </Radio>
                  ))}
                </Radio.Group>

                {/* 👥 Guest Count */}
                <Divider style={{ fontWeight: 600 }}>👥 Guest Count</Divider>
                <Radio.Group
                  value={guest}
                  onChange={handleGuestCountChange}
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {[1, 2, 3, 4,].map((g) => (
                    <Radio key={g} value={g}>
                      <UserOutlined style={{ marginRight: 8 }} />
                      {g} {g === 1 ? "Guest" : "Guests"}
                    </Radio>
                  ))}
                </Radio.Group>

                {/* 💰 Dynamic Price Range */}
                <Divider style={{ fontWeight: 600 }}>💰 Price Range</Divider>
                {maxRoomPrice > 0 ? (
                  <>
                    <Slider
                      range
                      min={0}
                      max={maxRoomPrice}
                      step={50}
                      value={priceRange}
                      onChange={(value) => setPriceRange(value)}
                      tooltip={{ formatter: (v) => `$${v}` }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 14,
                        marginTop: 8,
                      }}
                    >
                      <span>Min: ${priceRange[0]}</span>
                      <span>Max: ${priceRange[1]}</span>
                    </div>
                  </>
                ) : (
                  <Text type="secondary">Loading price range...</Text>
                )}
              </Card>
            </div>
          </Col>

          {/* Main Room List */}
          <Col xs={24} md={16} lg={18}>
            {isLoading ? (
              <div style={{ textAlign: "center", padding: "80px" }}>
                <Spin size="large" />
                <div style={{ marginTop: 16 }}>
                  <Text type="secondary">
                    Finding the best rooms for you...
                  </Text>
                </div>
              </div>
            ) : (
              <Row gutter={[20, 20]}>
                {data?.data?.length > 0 ? (
                  data.data.map((room) => (
                    <Col xs={24} sm={12} md={12} lg={8} key={room.id}>
                      <RoomCard
                        room={room}
                        user={user}
                        onViewDetails={handleViewDetails}
                        onBookNow={handleBookNowClick}
                      />
                    </Col>
                  ))
                ) : (
                  <Col span={24}>
                    <div
                      style={{
                        textAlign: "center",
                        padding: "80px 50px",
                        background: "white",
                        borderRadius: 16,
                        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div style={{ fontSize: "64px", marginBottom: 16 }}>
                        🏨
                      </div>
                      <Title level={3} style={{ color: "#1a3353" }}>
                        No rooms found
                      </Title>
                      <Text type="secondary">
                        Try adjusting your filters to find more options.
                      </Text>
                      <div style={{ marginTop: 24 }}>
                        <Button
                          type="primary"
                          size="large"
                          onClick={clearAllFilters}
                          style={{
                            background:
                              "linear-gradient(135deg, #1890ff, #722ed1)",
                            border: "none",
                            borderRadius: 8,
                            fontWeight: 600,
                          }}
                        >
                          Clear All Filters
                        </Button>
                      </div>
                    </div>
                  </Col>
                )}
              </Row>
            )}

            {/* Pagination */}
            <div className="mx-auto py-5 text-center flex justify-center">
              <Pagination
                current={page}
                pageSize={limit}
                total={data?.meta?.total}
                onChange={(page) => setPage(page)}
              />
            </div>
          </Col>
        </Row>

        {/* Booking Modal */}
        <BookingModal
          visible={isBookingModalVisible}
          onCancel={() => setIsBookingModalVisible(false)}
          selectedRoom={selectedRoom}
          user={user}
          onBookingSuccess={handleBookingSuccess}
        />
      </div>
    </div>
  );
};

export default Room;
