import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  Badge,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  WifiOutlined,
  CarOutlined,
  CoffeeOutlined,
  StarFilled,
  EnvironmentOutlined,
  HeartOutlined,
  HeartFilled,
  FilterOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useGetAllRoomAvalableQuery } from "../../redux/features/room/roomApi";

const { Title, Text } = Typography;

const Room = () => {
  const [searchParams] = useSearchParams();
  const [favorites, setFavorites] = useState(new Set());

  const {
    searchTerm = "",
    guestCount = "",
    checkIn = "",
    checkOut = "",
  } = Object.fromEntries(searchParams.entries());

  const [search, setSearchTerm] = useState(searchTerm);
  const [guest, setGuestCount] = useState(guestCount);
  const [checkin, setCheckIn] = useState(checkIn);
  const [checkout, setCheckout] = useState(checkOut);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [roomType, setRoomType] = useState("");

  const { data, isLoading } = useGetAllRoomAvalableQuery([
    { name: "searchTerm", value: search || "" },
    { name: "guestCount", value: guest || "" },
    { name: "checkIn", value: checkin || "" },
    { name: "checkOut", value: checkout || "" },
    { name: "type", value: roomType },
    { name: "minPrice", value: priceRange[0] || 0 },
    { name: "limit", value: limit },
    { name: "page", value: page },
  ]);

  const amenityIcons = {
    wifi: <WifiOutlined />,
    parking: <CarOutlined />,
    breakfast: <CoffeeOutlined />,
  };

  const roomTypeColors = {
    SINGLE: "blue",
    DOUBLE: "green",
    TWIN: "orange",
    DELUXE: "purple",
    SUITE: "gold",
    FAMILY: "cyan",
    PRESIDENTIAL: "red",
  };

  const toggleFavorite = (roomId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(roomId)) newFavorites.delete(roomId);
    else newFavorites.add(roomId);
    setFavorites(newFavorites);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setGuestCount("");
    setRoomType("");
    setPriceRange([0, 1000]);
  };

  const hasActiveFilters =
    search || guest || roomType || priceRange[0] > 0 || priceRange[1] < 1000;

  return (
    <div
      style={{
        padding: "24px",
        minHeight: "100vh",
      }}
      className="container mx-auto"
    >
      <Row gutter={[24, 24]}>
        {/* Fixed Sidebar Filters */}
        <Col xs={24} md={8} lg={6}>
          <div style={{ position: "sticky", top: 24, zIndex: 10 }}>
            <Card
              title={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Title
                    level={4}
                    style={{
                      margin: 0,
                      color: "#1a3353",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <FilterOutlined style={{ color: "#1890ff" }} />
                    Filters
                  </Title>
                  {hasActiveFilters && (
                    <Tooltip title="Clear all filters">
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={clearAllFilters}
                        style={{ color: "#ff4d4f", border: "none" }}
                        size="small"
                      >
                        Clear
                      </Button>
                    </Tooltip>
                  )}
                </div>
              }
              bordered={false}
              style={{
                borderRadius: 20,
                boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
                background: "linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)",
                border: "1px solid #e8f4ff",
                overflow: "hidden",
              }}
              bodyStyle={{ padding: "20px 16px" }}
              headStyle={{
                borderBottom: "1px solid #f0f0f0",
                padding: "16px 20px",
                background: "linear-gradient(135deg, #f8fbff 0%, #e6f7ff 100%)",
              }}
            >
              {/* Search Input */}
              <Input
                placeholder="Search hotel..."
                value={search}
                onChange={(e) => setSearchTerm(e.target.value)}
                prefix={<SearchOutlined style={{ color: "#1890ff" }} />}
                style={{
                  marginBottom: 24,
                  borderRadius: 12,
                  height: 48,
                  border: "1px solid #d6e4ff",
                  boxShadow: "0 2px 8px rgba(24, 144, 255, 0.1)",
                  transition: "all 0.3s ease",
                }}
                size="large"
                onFocus={(e) => {
                  e.target.style.boxShadow =
                    "0 4px 12px rgba(24, 144, 255, 0.2)";
                  e.target.style.borderColor = "#1890ff";
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow =
                    "0 2px 8px rgba(24, 144, 255, 0.1)";
                  e.target.style.borderColor = "#d6e4ff";
                }}
              />

              {/* Room Type */}
              <div style={{ position: "relative" }}>
                <Divider
                  style={{
                    margin: "20px 0",
                    fontSize: "15px",
                    color: "#1a3353",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  🏨 Room Type
                  {roomType && (
                    <Tag
                      closable
                      onClose={() => setRoomType("")}
                      style={{
                        marginLeft: 8,
                        background: "linear-gradient(135deg, #1890ff, #722ed1)",
                        color: "white",
                        border: "none",
                        fontSize: "10px",
                        height: 20,
                        lineHeight: "18px",
                      }}
                    >
                      {roomType}
                    </Tag>
                  )}
                </Divider>
                <Radio.Group
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
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
                    <Radio
                      key={type}
                      value={type}
                      style={{
                        borderRadius: 10,
                        padding: "12px 16px",
                        border:
                          roomType === type
                            ? "2px solid #1890ff"
                            : "1px solid #f0f0f0",
                        background:
                          roomType === type
                            ? "linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%)"
                            : "white",
                        transition: "all 0.3s ease",
                        margin: 0,
                      }}
                    >
                      <span
                        style={{
                          fontWeight: roomType === type ? 600 : 400,
                          color: roomType === type ? "#1890ff" : "#595959",
                        }}
                      >
                        {type}
                      </span>
                    </Radio>
                  ))}
                </Radio.Group>
              </div>

              {/* Guest Count */}
              <div style={{ position: "relative" }}>
                <Divider
                  style={{
                    margin: "24px 0 16px 0",
                    fontSize: "15px",
                    color: "#1a3353",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  👥 Guest Count
                  {guest && (
                    <Tag
                      closable
                      onClose={() => setGuestCount("")}
                      style={{
                        marginLeft: 8,
                        background: "linear-gradient(135deg, #52c41a, #389e0d)",
                        color: "white",
                        border: "none",
                        fontSize: "10px",
                        height: 20,
                        lineHeight: "18px",
                      }}
                    >
                      {guest} {guest === "1" ? "Guest" : "Guests"}
                    </Tag>
                  )}
                </Divider>
                <Radio.Group
                  value={guest}
                  onChange={(e) => setGuestCount(e.target.value)}
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {[1, 2, 3, 4, "5+"].map((g) => (
                    <Radio
                      key={g}
                      value={g}
                      style={{
                        borderRadius: 10,
                        padding: "12px 16px",
                        border:
                          guest === g.toString()
                            ? "2px solid #52c41a"
                            : "1px solid #f0f0f0",
                        background:
                          guest === g.toString()
                            ? "linear-gradient(135deg, #f6ffed 0%, #f0fff3 100%)"
                            : "white",
                        transition: "all 0.3s ease",
                        margin: 0,
                      }}
                    >
                      <UserOutlined
                        style={{
                          marginRight: 8,
                          color: guest === g.toString() ? "#52c41a" : "#1890ff",
                        }}
                      />
                      <span
                        style={{
                          fontWeight: guest === g.toString() ? 600 : 400,
                          color: guest === g.toString() ? "#52c41a" : "#595959",
                        }}
                      >
                        {g} {g === 1 ? "Guest" : "Guests"}
                      </span>
                    </Radio>
                  ))}
                </Radio.Group>
              </div>

              {/* Price Range */}
              <div style={{ position: "relative" }}>
                <Divider
                  style={{
                    margin: "24px 0 16px 0",
                    fontSize: "15px",
                    color: "#1a3353",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  💰 Price Range
                  {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                    <Tag
                      closable
                      onClose={() => setPriceRange([0, 1000])}
                      style={{
                        marginLeft: 8,
                        background: "linear-gradient(135deg, #faad14, #fa8c16)",
                        color: "white",
                        border: "none",
                        fontSize: "10px",
                        height: 20,
                        lineHeight: "18px",
                      }}
                    >
                      ${priceRange[0]} - ${priceRange[1]}
                    </Tag>
                  )}
                </Divider>
                <Slider
                  range
                  min={0}
                  max={2000}
                  step={50}
                  value={priceRange}
                  onChange={setPriceRange}
                  trackStyle={{
                    background: "linear-gradient(90deg, #1890ff, #722ed1)",
                    height: 6,
                    borderRadius: 3,
                  }}
                  handleStyle={{
                    borderColor: "#1890ff",
                    boxShadow: "0 0 0 3px rgba(24, 144, 255, 0.2)",
                    height: 20,
                    width: 20,
                    marginTop: -7,
                  }}
                  railStyle={{
                    background: "#f0f0f0",
                    height: 6,
                    borderRadius: 3,
                  }}
                />
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 24,
                    padding: "16px",
                    background:
                      "linear-gradient(135deg, #f0f8ff 0%, #d6e4ff 100%)",
                    borderRadius: 12,
                    border: "2px solid #bae7ff",
                    boxShadow: "0 4px 12px rgba(24, 144, 255, 0.1)",
                  }}
                >
                  <Text
                    strong
                    style={{
                      fontSize: "18px",
                      color: "#1890ff",
                      display: "block",
                    }}
                  >
                    ${priceRange[0]} - ${priceRange[1]}
                  </Text>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    Per night
                  </Text>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ marginTop: 24 }}>
                <Button
                  type="default"
                  icon={<ReloadOutlined />}
                  onClick={clearAllFilters}
                  block
                  size="large"
                  style={{
                    height: 45,
                    borderRadius: 12,
                    border: "1px solid #ff4d4f",
                    color: "#ff4d4f",
                    fontWeight: 600,
                    background: "white",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#fff2f0";
                    e.target.style.boxShadow =
                      "0 4px 12px rgba(255, 77, 79, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "white";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  Reset All Filters
                </Button>
              </div>
            </Card>
          </div>
        </Col>

        {/* Main Content */}
        <Col xs={24} md={16} lg={18}>
          <div style={{ marginBottom: 24 }}>
            <Title
              level={2}
              style={{
                margin: 0,
                color: "#1a3353",
                background: "linear-gradient(135deg, #1a3353, #1890ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              Available Rooms
              {hasActiveFilters && (
                <Badge
                  count={[
                    search ? 1 : 0,
                    guest ? 1 : 0,
                    roomType ? 1 : 0,
                    priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0,
                  ].reduce((a, b) => a + b, 0)}
                  style={{
                    background: "linear-gradient(135deg, #ff4d4f, #ff7875)",
                    boxShadow: "0 0 0 2px #fff",
                  }}
                />
              )}
            </Title>
            <Text
              type="secondary"
              style={{ fontSize: "16px", display: "block", marginTop: 8 }}
            >
              {data?.data?.length || 0} rooms found • Perfect stays await you
            </Text>
          </div>

          {isLoading ? (
            <div style={{ textAlign: "center", padding: "80px" }}>
              <Spin size="large" />
              <div style={{ marginTop: 16 }}>
                <Text type="secondary">Finding the best rooms for you...</Text>
              </div>
            </div>
          ) : (
            <Row gutter={[20, 20]}>
              {data?.data?.length > 0 ? (
                data.data.map((room) => (
                  <Col xs={24} sm={12} md={12} lg={8} key={room.id}>
                    <Card
                      hoverable
                      cover={
                        <div style={{ position: "relative" }}>
                          <img
                            src={room.images?.[0] || room.hotel?.images}
                            alt={room.hotel?.name}
                            style={{
                              height: 220,
                              width: "100%",
                              objectFit: "cover",
                              borderTopLeftRadius: 16,
                              borderTopRightRadius: 16,
                              transition: "transform 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = "scale(1.05)";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = "scale(1)";
                            }}
                          />
                         
                        </div>
                      }
                      style={{
                        borderRadius: 16,
                        overflow: "hidden",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                        background: "white",
                        border: "none",
                        height: "100%",
                      }}
                      bodyStyle={{ padding: 20 }}
                    >
                      {/* Room content remains the same as your original */}
                      <div style={{ marginBottom: 16 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: 8,
                          }}
                        >
                          <Text
                            strong
                            style={{
                              fontSize: "18px",
                              color: "#1a3353",
                              display: "block",
                            }}
                          >
                            {room.hotel?.name}
                          </Text>
                          
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 8,
                          }}
                        >
                          <EnvironmentOutlined
                            style={{
                              color: "#ff4d4f",
                              marginRight: 6,
                              fontSize: "12px",
                            }}
                          />
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            {room.hotel?.location || "City Center"}
                          </Text>
                        </div>
                      </div>

                      <div style={{ marginBottom: 16 }}>
                        <Tag
                          color={roomTypeColors[room.type] || "blue"}
                          style={{
                            marginBottom: 8,
                            borderRadius: 6,
                            fontWeight: 600,
                            border: "none",
                          }}
                        >
                          {room.type}
                        </Tag>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            background: "#f6ffed",
                            padding: "6px 12px",
                            borderRadius: 6,
                            border: "1px solid #b7eb8f",
                          }}
                        >
                          <UserOutlined style={{ color: "#52c41a" }} />
                          <Text style={{ color: "#389e0d", fontWeight: 500 }}>
                            Capacity: {room.capacity} guests
                          </Text>
                        </div>
                      </div>

                      {room.amenities?.length > 0 && (
                        <div style={{ marginBottom: 16 }}>
                          <Text
                            strong
                            style={{
                              display: "block",
                              marginBottom: 8,
                              color: "#1a3353",
                            }}
                          >
                            🛎️ Amenities:
                          </Text>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 6,
                            }}
                          >
                            {room.amenities.map((amenity, idx) => (
                              <Tag
                                key={idx}
                                icon={amenityIcons[amenity] || null}
                                style={{
                                  margin: 0,
                                  borderRadius: 6,
                                  background: "#f0f8ff",
                                  border: "1px solid #d6e4ff",
                                  color: "#1890ff",
                                }}
                              >
                                {amenity}
                              </Tag>
                            ))}
                          </div>
                        </div>
                      )}

                      <Divider
                        style={{ margin: "16px 0", background: "#f0f0f0" }}
                      />

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <Text
                            strong
                            style={{
                              fontSize: "24px",
                              color: "#1890ff",
                              background:
                                "linear-gradient(135deg, #1890ff, #722ed1)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              fontWeight: "bold",
                            }}
                          >
                            ${room.pricePerNight}
                          </Text>
                          <Text type="secondary" style={{ marginLeft: 4 }}>
                            /night
                          </Text>
                          <div style={{ marginTop: 4 }}>
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              Includes taxes & fees
                            </Text>
                          </div>
                        </div>
                        <Button
                          type="primary"
                          size="large"
                         
                        >
                          Book Now
                        </Button>
                      </div>
                    </Card>
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
                    <div style={{ fontSize: "64px", marginBottom: 16 }}>🏨</div>
                    <Title
                      level={3}
                      style={{ color: "#1a3353", marginBottom: 8 }}
                    >
                      No rooms found
                    </Title>
                    <Text type="secondary" style={{ fontSize: "16px" }}>
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
                          padding: "0 32px",
                          height: 45,
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
        </Col>
      </Row>
    </div>
  );
};

export default Room;
