import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Rate,
  Button,
  Divider,
  List,
  Avatar,
  Carousel,
  Tabs,
  Badge,
  Modal,
  Form,
  DatePicker,
  InputNumber,
  message,
  Steps,
  Space,
  Descriptions,
  Input,
} from "antd";
import {
  ArrowLeftOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  WifiOutlined,
  CarOutlined,
  CoffeeOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
  EnvironmentOutlined,
  StarFilled,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  TeamOutlined,
  HomeOutlined,
  CameraOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Step } = Steps;
const { TextArea } = Input;

const RoomDetail = () => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingStep, setBookingStep] = useState(0);

  // Room data
  const room = {
    id: "73c85084-b09f-40ea-a7a8-6f2d4f2253f8",
    hotelId: "4eb984f0-5e2d-4ade-819f-b55dd156c236",
    type: "SINGLE",
    pricePerNight: 1500,
    capacity: 1,
    available: true,
    images: [
      "https://res.cloudinary.com/dcijrliws/image/upload/v1761658834/Tue%20Oct%2028%202025.jpg",
      "https://res.cloudinary.com/dcijrliws/image/upload/v1761658834/Tue%20Oct%2028%202025.jpg",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800",
    ],
    amenities: [
      "Free Wi-Fi",
      "Air conditioning",
      "Swimming pool",
      "Fitness center / gym",
      "Restaurant / Café",
      "Room service",
      "Parking (free or paid)",
    ],
    createdAt: "2025-10-28T13:40:35.437Z",
    updatedAt: "2025-10-28T13:40:35.437Z",
    hotel: {
      id: "4eb984f0-5e2d-4ade-819f-b55dd156c236",
      name: "SeaBreeze Resort & Spa",
      location: "Cox's Bazar, Chittagong, Bangladesh",
      description:
        "Nestled along the beach, this resort offers ocean-view suites, an infinity pool, and a full-service spa. Ideal for a relaxing coastal getaway.",
      rating: 4.8,
      images:
        "https://res.cloudinary.com/dcijrliws/image/upload/v1761657580/hotel_1761657579031_0.5sgpjxmyv4q.avif",
      createdAt: "2025-10-28T13:19:41.139Z",
      updatedAt: "2025-10-28T13:19:41.139Z",
    },
    bookings: [],
  };

  // Amenity icons mapping
  const amenityIcons = {
    "Free Wi-Fi": <WifiOutlined style={{ color: "#1890ff" }} />,
    "Parking (free or paid)": <CarOutlined style={{ color: "#52c41a" }} />,
    "Restaurant / Café": <CoffeeOutlined style={{ color: "#fa8c16" }} />,
    "Air conditioning": (
      <SafetyCertificateOutlined style={{ color: "#13c2c2" }} />
    ),
    "Swimming pool": "🏊‍♂️",
    "Fitness center / gym": "💪",
    "Room service": "🔔",
  };

  // Room features data
  const roomFeatures = [
    { icon: "🛏️", label: "Bed Type", value: "Single Bed" },
    { icon: "📏", label: "Room Size", value: "25 m²" },
    { icon: "👥", label: "Max Guests", value: `${room.capacity} guest` },
    { icon: "🛁", label: "Bathroom", value: "Private with shower" },
    { icon: "🌅", label: "View", value: "Ocean View" },
    { icon: "🛋️", label: "Extra", value: "Working Desk" },
  ];

  // Reviews data
  const reviews = [
    {
      id: 1,
      user: "John Smith",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Amazing room with beautiful ocean view. The amenities were excellent and the staff was very helpful. Perfect for solo travelers!",
      avatar: "JS",
    },
    {
      id: 2,
      user: "Sarah Johnson",
      rating: 4,
      date: "2024-01-10",
      comment:
        "Great value for money. Clean and comfortable room. The swimming pool and gym facilities were fantastic!",
      avatar: "SJ",
    },
    {
      id: 3,
      user: "Mike Chen",
      rating: 5,
      date: "2024-01-08",
      comment:
        "Absolutely loved my stay. The room was spacious and had everything I needed. Will definitely come back!",
      avatar: "MC",
    },
  ];

  const handleBookNow = () => {
    setBookingModalVisible(true);
  };

  const handleBookingSubmit = (values) => {
    console.log("Booking details:", values);
    message.success("Room booked successfully!");
    setBookingModalVisible(false);
    setBookingStep(0);
  };

  const roomImages = room.images;

  const tabItems = [
    {
      key: "description",
      label: "Room Details",
      children: (
        <div>
          <Title level={4}>Room Description</Title>
          <Paragraph style={{ fontSize: "16px", lineHeight: 1.6 }}>
            Experience luxury and comfort in our beautifully appointed{" "}
            {room.type.toLowerCase()} room. Featuring modern amenities, elegant
            decor, and breathtaking ocean views, this room is designed to
            provide you with an unforgettable stay. Perfect for solo travelers
            seeking both comfort and style.
          </Paragraph>

          <Title level={5} style={{ marginTop: 32 }}>
            Room Features
          </Title>
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            {roomFeatures.map((feature, index) => (
              <Col xs={12} sm={8} key={index}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: "20px" }}>{feature.icon}</span>
                  <div>
                    <Text
                      strong
                      style={{
                        display: "block",
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      {feature.label}
                    </Text>
                    <Text strong style={{ display: "block" }}>
                      {feature.value}
                    </Text>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <Title level={5} style={{ marginTop: 32 }}>
            Amenities & Services
          </Title>
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            {room.amenities.map((amenity, index) => (
              <Col xs={12} sm={8} key={index}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {amenityIcons[amenity] || (
                    <CheckCircleOutlined style={{ color: "#52c41a" }} />
                  )}
                  <Text strong>{amenity}</Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ),
    },
    {
      key: "reviews",
      label: `Reviews (${reviews.length})`,
      children: (
        <div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Title level={2} style={{ margin: 0, color: "#faad14" }}>
                {room.hotel.rating}
              </Title>
              <div>
                <Rate disabled defaultValue={room.hotel.rating} />
                <Text
                  type="secondary"
                  style={{ display: "block", marginTop: 4 }}
                >
                  {reviews.length} reviews • Excellent
                </Text>
              </div>
            </div>
          </div>

          <List
            itemLayout="horizontal"
            dataSource={reviews}
            renderItem={(review) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar style={{ background: "#1890ff" }}>
                      {review.avatar}
                    </Avatar>
                  }
                  title={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text strong>{review.user}</Text>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <Rate
                          disabled
                          defaultValue={review.rating}
                          size="small"
                        />
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                          {new Date(review.date).toLocaleDateString()}
                        </Text>
                      </div>
                    </div>
                  }
                  description={
                    <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
                      {review.comment}
                    </Paragraph>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      ),
    },
    {
      key: "policies",
      label: "Policies",
      children: (
        <div>
          <Title level={4}>Hotel Policies</Title>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <div>
              <Title level={5}>📅 Check-in & Check-out</Title>
              <Text>Check-in: 3:00 PM • Check-out: 11:00 AM</Text>
            </div>
            <div>
              <Title level={5}>💳 Cancellation Policy</Title>
              <Text>Free cancellation up to 24 hours before check-in</Text>
            </div>
            <div>
              <Title level={5}>👥 Guest Policy</Title>
              <Text>Maximum {room.capacity} guest. No pets allowed.</Text>
            </div>
            <div>
              <Title level={5}>🚭 Smoking Policy</Title>
              <Text>
                Non-smoking rooms. Designated smoking areas available.
              </Text>
            </div>
            <div>
              <Title level={5}>💰 Payment</Title>
              <Text>Credit cards and cash accepted</Text>
            </div>
          </Space>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Header Navigation */}
      <div
        style={{
          padding: "16px 24px",
          background: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          style={{
            borderRadius: 8,
            padding: "8px 16px",
            fontWeight: 500,
          }}
        >
          Back to Rooms
        </Button>
      </div>

      <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Main Content */}
        <Row gutter={[32, 32]}>
          {/* Image Gallery */}
          <Col xs={24} lg={14}>
            <Card
              style={{
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                border: "none",
              }}
              bodyStyle={{ padding: 0 }}
            >
              <div style={{ position: "relative" }}>
                <Carousel
                  effect="fade"
                  dots={false}
                  afterChange={setSelectedImage}
                >
                  {roomImages.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt={`Room view ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "400px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </Carousel>

                {/* Image indicators */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    display: "flex",
                    gap: 8,
                  }}
                >
                  {roomImages.map((_, index) => (
                    <div
                      key={index}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background:
                          selectedImage === index
                            ? "#1890ff"
                            : "rgba(255,255,255,0.5)",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>

                {/* Action buttons */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    display: "flex",
                    gap: 8,
                  }}
                >
                  <Button
                    type="text"
                    icon={
                      isFavorite ? (
                        <HeartFilled style={{ color: "#ff4d4f" }} />
                      ) : (
                        <HeartOutlined />
                      )
                    }
                    onClick={() => setIsFavorite(!isFavorite)}
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                  <Button
                    type="text"
                    icon={<ShareAltOutlined />}
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                </div>

                {/* Availability badge */}
                <Badge.Ribbon
                  text={room.available ? "AVAILABLE" : "BOOKED"}
                  color={room.available ? "green" : "red"}
                  style={{
                    top: 16,
                    fontWeight: "bold",
                  }}
                />
              </div>

              {/* Thumbnail images */}
              <div
                style={{
                  padding: 16,
                  display: "flex",
                  gap: 8,
                  overflowX: "auto",
                }}
              >
                {roomImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    style={{
                      width: 80,
                      height: 60,
                      objectFit: "cover",
                      borderRadius: 8,
                      cursor: "pointer",
                      border:
                        selectedImage === index
                          ? "2px solid #1890ff"
                          : "1px solid #d9d9d9",
                    }}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </Card>

            {/* Hotel Info Card */}
            <Card
              style={{
                borderRadius: 16,
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                border: "none",
                marginTop: 24,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: 16 }}
              >
                <img
                  src={room.hotel.images}
                  alt={room.hotel.name}
                  style={{
                    width: 100,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <Title level={4} style={{ margin: 0, color: "#1a3353" }}>
                    {room.hotel.name}
                  </Title>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 4,
                      marginBottom: 8,
                    }}
                  >
                    <EnvironmentOutlined
                      style={{ color: "#ff4d4f", marginRight: 6 }}
                    />
                    <Text type="secondary">{room.hotel.location}</Text>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Rate
                      disabled
                      defaultValue={room.hotel.rating}
                      style={{ fontSize: 14 }}
                    />
                    <Text strong style={{ marginLeft: 8, color: "#faad14" }}>
                      {room.hotel.rating}
                    </Text>
                  </div>
                </div>
              </div>
              <Paragraph
                style={{ marginTop: 16, marginBottom: 0, lineHeight: 1.6 }}
              >
                {room.hotel.description}
              </Paragraph>
            </Card>
          </Col>

          {/* Booking Panel */}
          <Col xs={24} lg={10}>
            <Card
              style={{
                borderRadius: 16,
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                border: "none",
                position: "sticky",
                top: 24,
              }}
            >
              <div style={{ marginBottom: 24 }}>
                <Tag
                  color="blue"
                  style={{
                    borderRadius: 6,
                    fontWeight: 600,
                    border: "none",
                    marginBottom: 12,
                    fontSize: "12px",
                  }}
                >
                  {room.type} ROOM
                </Tag>
                <Title level={2} style={{ margin: 0, color: "#1a3353" }}>
                  {room.hotel.name}
                </Title>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <EnvironmentOutlined
                    style={{ color: "#ff4d4f", marginRight: 6 }}
                  />
                  <Text type="secondary">{room.hotel.location}</Text>
                </div>
              </div>

              {/* Rating */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    background: "#fff7e6",
                    padding: "8px 12px",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <StarFilled style={{ color: "#faad14" }} />
                  <Text strong style={{ color: "#faad14" }}>
                    {room.hotel.rating}
                  </Text>
                </div>
                <Rate
                  disabled
                  defaultValue={room.hotel.rating}
                  style={{ marginLeft: 12, fontSize: 16 }}
                />
                <Text type="secondary" style={{ marginLeft: 8 }}>
                  ({reviews.length} reviews)
                </Text>
              </div>

              <Divider />

              {/* Room Details */}
              <Descriptions
                column={1}
                size="small"
                style={{ marginBottom: 20 }}
              >
                <Descriptions.Item
                  label={
                    <>
                      <UserOutlined /> Capacity
                    </>
                  }
                >
                  {room.capacity} guest{room.capacity > 1 ? "s" : ""}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <>
                      <HomeOutlined /> Room Type
                    </>
                  }
                >
                  {room.type}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <>
                      <CameraOutlined /> Views
                    </>
                  }
                >
                  Ocean View
                </Descriptions.Item>
              </Descriptions>

              {/* Price */}
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    marginBottom: 8,
                  }}
                >
                  <Text
                    strong
                    style={{
                      fontSize: "32px",
                      color: "#1890ff",
                    }}
                  >
                    ${room.pricePerNight}
                  </Text>
                  <Text
                    type="secondary"
                    style={{ marginLeft: 8, fontSize: "16px" }}
                  >
                    /night
                  </Text>
                </div>
                <Text type="secondary">
                  Includes taxes & fees • Free cancellation
                </Text>
              </div>

              {/* Quick Info */}
              <div
                style={{
                  background: "#f6ffed",
                  padding: 16,
                  borderRadius: 8,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <CheckCircleOutlined
                    style={{ color: "#52c41a", marginRight: 8 }}
                  />
                  <Text strong>Available for your dates</Text>
                </div>
                <Text type="secondary">
                  Book now to secure this room at today's price
                </Text>
              </div>

              <Button
                type="primary"
                size="large"
                block
                onClick={handleBookNow}
                style={{
                  background: "linear-gradient(135deg, #1890ff, #722ed1)",
                  border: "none",
                  borderRadius: 10,
                  height: 50,
                  fontSize: "16px",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(24, 144, 255, 0.3)",
                }}
              >
                Book Now
              </Button>
            </Card>
          </Col>
        </Row>

        {/* Details Section */}
        <Row gutter={[32, 32]} style={{ marginTop: 32 }}>
          <Col xs={24} lg={16}>
            <Card
              style={{
                borderRadius: 16,
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                border: "none",
              }}
            >
              <Tabs defaultActiveKey="description" items={tabItems} />
            </Card>
          </Col>

          {/* Additional Info Sidebar */}
          <Col xs={24} lg={8}>
            <Card
              title="Hotel Information"
              style={{
                borderRadius: 16,
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                border: "none",
                marginBottom: 24,
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div>
                  <Text strong style={{ display: "block", color: "#1a3353" }}>
                    Contact
                  </Text>
                  <Text>+1 (555) 123-4567</Text>
                </div>
                <div>
                  <Text strong style={{ display: "block", color: "#1a3353" }}>
                    Address
                  </Text>
                  <Text>{room.hotel.location}</Text>
                </div>
                <div>
                  <Text strong style={{ display: "block", color: "#1a3353" }}>
                    Reception Hours
                  </Text>
                  <Text>24/7</Text>
                </div>
                <div>
                  <Text strong style={{ display: "block", color: "#1a3353" }}>
                    Email
                  </Text>
                  <Text>info@seabreezeresort.com</Text>
                </div>
              </div>
            </Card>

            <Card
              title="Why Book With Us?"
              style={{
                borderRadius: 16,
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                border: "none",
              }}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <CheckCircleOutlined
                    style={{ color: "#52c41a", fontSize: "16px" }}
                  />
                  <Text>Best Price Guarantee</Text>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <CheckCircleOutlined
                    style={{ color: "#52c41a", fontSize: "16px" }}
                  />
                  <Text>Free Cancellation</Text>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <CheckCircleOutlined
                    style={{ color: "#52c41a", fontSize: "16px" }}
                  />
                  <Text>No Booking Fees</Text>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <CheckCircleOutlined
                    style={{ color: "#52c41a", fontSize: "16px" }}
                  />
                  <Text>Instant Confirmation</Text>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <CheckCircleOutlined
                    style={{ color: "#52c41a", fontSize: "16px" }}
                  />
                  <Text>24/7 Customer Support</Text>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Booking Modal */}
      <Modal
        title={
          <div>
            <Title level={4} style={{ margin: 0 }}>
              Book This Room
            </Title>
            <Text type="secondary">
              {room.type} Room • {room.hotel.name}
            </Text>
          </div>
        }
        open={bookingModalVisible}
        onCancel={() => {
          setBookingModalVisible(false);
          setBookingStep(0);
        }}
        footer={null}
        width={600}
        style={{ borderRadius: 16 }}
      >
        <Steps current={bookingStep} style={{ marginBottom: 32 }}>
          <Step title="Dates" icon={<ClockCircleOutlined />} />
          <Step title="Details" icon={<UserOutlined />} />
          <Step title="Payment" icon={<DollarOutlined />} />
        </Steps>

        <Form layout="vertical" onFinish={handleBookingSubmit}>
          {bookingStep === 0 && (
            <div>
              <Form.Item
                label="Select Dates"
                name="dates"
                rules={[{ required: true, message: "Please select dates" }]}
              >
                <RangePicker
                  style={{ width: "100%" }}
                  size="large"
                  placeholder={["Check-in", "Check-out"]}
                />
              </Form.Item>
              <Form.Item
                label="Guests"
                name="guests"
                initialValue={room.capacity}
              >
                <InputNumber
                  min={1}
                  max={room.capacity}
                  style={{ width: "100%" }}
                  size="large"
                  disabled
                />
              </Form.Item>
              <Text type="secondary">
                This room accommodates maximum {room.capacity} guest
              </Text>
            </div>
          )}

          {bookingStep === 1 && (
            <div>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input size="large" placeholder="Enter your full name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter valid email",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please enter phone number" },
                ]}
              >
                <Input size="large" placeholder="Enter your phone number" />
              </Form.Item>
              <Form.Item label="Special Requests" name="requests">
                <TextArea
                  rows={3}
                  placeholder="Any special requests or requirements..."
                />
              </Form.Item>
            </div>
          )}

          {bookingStep === 2 && (
            <div>
              <div
                style={{
                  background: "#f0f8ff",
                  padding: 16,
                  borderRadius: 8,
                  marginBottom: 16,
                }}
              >
                <Text strong style={{ fontSize: "16px" }}>
                  Booking Summary
                </Text>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 12,
                  }}
                >
                  <Text>{room.type} Room</Text>
                  <Text>${room.pricePerNight}/night</Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 8,
                  }}
                >
                  <Text>3 nights</Text>
                  <Text>${(room.pricePerNight * 3).toLocaleString()}</Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 8,
                  }}
                >
                  <Text>Taxes & Fees</Text>
                  <Text>$150</Text>
                </div>
                <Divider style={{ margin: "12px 0" }} />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text strong style={{ fontSize: "18px" }}>
                    Total
                  </Text>
                  <Text strong style={{ fontSize: "18px", color: "#1890ff" }}>
                    ${(room.pricePerNight * 3 + 150).toLocaleString()}
                  </Text>
                </div>
              </div>

              <Form.Item
                label="Payment Method"
                name="paymentMethod"
                rules={[
                  { required: true, message: "Please select payment method" },
                ]}
              >
                <Input size="large" placeholder="Credit/Debit Card" />
              </Form.Item>
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 32,
            }}
          >
            {bookingStep > 0 && (
              <Button onClick={() => setBookingStep(bookingStep - 1)}>
                Previous
              </Button>
            )}
            {bookingStep < 2 ? (
              <Button
                type="primary"
                onClick={() => setBookingStep(bookingStep + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: "auto" }}
              >
                Confirm Booking
              </Button>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default RoomDetail;
