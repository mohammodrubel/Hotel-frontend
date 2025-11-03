import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Rate,
  Button,
  Divider,
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
  Spin,
  Image,
} from "antd";
import {
  CheckCircleOutlined,
  StarFilled,
  EnvironmentOutlined,
  WifiOutlined,
  CarOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useGetSingleRoomQuery } from "../../redux/features/room/roomApi";

const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;
const { Step } = Steps;

// Amenity icons mapping
const amenityIcons = {
  wifi: <WifiOutlined />,
  parking: <CarOutlined />,
  breakfast: <CoffeeOutlined />,
};

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.user);
  const { data, isLoading, isError } = useGetSingleRoomQuery(id);

  const room = data?.data || {};
  const hotel = room?.hotel || {};
  const roomImages = room?.images || [];

  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [mainImage, setMainImage] = useState(roomImages[0] || "");

  const handleBookNow = () => {
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
    setIsBookingModalVisible(true);
  };

  const handleBookingSubmit = (values) => {
    console.log("Booking details:", {
      ...values,
      room: room,
      user: user.id,
    });
    message.success("Booking successful!");
    setIsBookingModalVisible(false);
    setCurrentStep(0);
    form.resetFields();
  };

  // Set main image when component loads or roomImages changes
  React.useEffect(() => {
    if (roomImages.length > 0) {
      setMainImage(roomImages[0]);
    }
  }, [roomImages]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "100px 0" }}>
        <Spin size="large" />
        <Title level={4} style={{ marginTop: 20 }}>
          Loading room details...
        </Title>
      </div>
    );
  }

  if (isError || !room?.id) {
    return (
      <div style={{ textAlign: "center", padding: "100px 0" }}>
        <Title level={3} type="danger">
          Room not found
        </Title>
        <Button type="primary" onClick={() => navigate("/room")}>
          Back to Rooms
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: 24 }}>
          <Button type="link" onClick={() => navigate("/room")}>
            ← Back to Rooms
          </Button>
        </div>

        <Row gutter={[32, 32]}>
          {/* Room Images Section */}
          <Col xs={24} lg={14}>
            <div style={{ borderRadius: 12, overflow: "hidden" }}>
              <Image
                src={mainImage || roomImages[0]}
                alt="Main room image"
                style={{
                  width: "100%",
                  height: 400,
                  objectFit: "cover",
                  borderRadius: 12,
                }}
                fallback="https://via.placeholder.com/800x400?text=Room+Image"
                preview={{
                  mask: "View Larger",
                }}
              />
            </div>

            {/* Thumbnail Images */}
            {roomImages.length > 1 && (
              <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
                {roomImages.slice(0, 4).map((img, index) => (
                  <Col key={index} xs={6}>
                    <div
                      style={{
                        border:
                          mainImage === img
                            ? "2px solid #1890ff"
                            : "2px solid transparent",
                        borderRadius: 8,
                        padding: 2,
                        cursor: "pointer",
                        transition: "all 0.3s",
                      }}
                      onClick={() => setMainImage(img)}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        style={{
                          width: "100%",
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 6,
                        }}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/100x80?text=Image";
                        }}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </Col>

          {/* Room Info & Booking Section */}
          <Col xs={24} lg={10}>
            <Card
              style={{
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none",
                position: "sticky",
                top: 100,
              }}
            >
              {/* Header */}
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <Title level={2} style={{ margin: 0, fontSize: 28 }}>
                    {hotel?.name || "Untitled Room"}
                  </Title>
                  <Badge
                    count={room.type}
                    style={{
                      backgroundColor: "#1890ff",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  <Rate
                    disabled
                    defaultValue={hotel.rating || 4.5}
                    character={<StarFilled />}
                    style={{ fontSize: 16 }}
                  />
                  <Text strong>({hotel.rating || 4.5})</Text>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 16,
                  }}
                >
                  <EnvironmentOutlined style={{ color: "#1890ff" }} />
                  <Text type="secondary">
                    {hotel.location || "Location not specified"}
                  </Text>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Tag
                    color="blue"
                    style={{
                      fontSize: 14,
                      padding: "4px 12px",
                      borderRadius: 20,
                    }}
                  >
                    {room.type}
                  </Tag>
                  <Tag
                    color="green"
                    style={{
                      fontSize: 14,
                      padding: "4px 12px",
                      borderRadius: 20,
                    }}
                  >
                    Capacity: {room.capacity} guests
                  </Tag>
                </div>
              </div>

              <Divider />

              {/* Price Section */}
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{ display: "flex", alignItems: "baseline", gap: 8 }}
                >
                  <Title level={1} style={{ color: "#1890ff", margin: 0 }}>
                    ${room.pricePerNight}
                  </Title>
                  <Text type="secondary" style={{ fontSize: 16 }}>
                    / night
                  </Text>
                </div>
                <Text type="secondary">Including taxes and fees</Text>
              </div>

              {/* Book Now Button */}
              <Button
                type="primary"
                size="large"
                block
                onClick={handleBookNow}
                style={{
                  height: 50,
                  fontSize: 16,
                  fontWeight: 600,
                  borderRadius: 8,
                  marginBottom: 16,
                }}
              >
                {user ? "Book Now" : "Login to Book"}
              </Button>

              {/* Quick Info */}
              <div
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: 16,
                  borderRadius: 8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <Text strong>Check-in:</Text>
                  <Text>2:00 PM</Text>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text strong>Check-out:</Text>
                  <Text>12:00 PM</Text>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Room Details Section */}
        <Row gutter={[32, 32]} style={{ marginTop: 32 }}>
          <Col xs={24} lg={14}>
            {/* Description */}
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <Title level={3}>Description</Title>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.6 }}>
                {room.description || "No description available for this room."}
              </Paragraph>
            </Card>

            {/* Amenities */}
            <Card style={{ borderRadius: 12 }}>
              <Title level={3}>Amenities</Title>
              <Row gutter={[16, 16]}>
                {room?.amenities?.length > 0 ? (
                  room.amenities.map((amenity, i) => (
                    <Col xs={12} sm={8} key={i}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "8px 0",
                        }}
                      >
                        {amenityIcons[amenity] || (
                          <CheckCircleOutlined style={{ color: "#52c41a" }} />
                        )}
                        <Text>{amenity}</Text>
                      </div>
                    </Col>
                  ))
                ) : (
                  <Col xs={24}>
                    <Text type="secondary">No amenities listed</Text>
                  </Col>
                )}
              </Row>
            </Card>
          </Col>

          {/* Hotel Information */}
          <Col xs={24} lg={10}>
            <Card style={{ borderRadius: 12 }}>
              <Title level={3}>Hotel Information</Title>
              <Descriptions column={1} size="middle">
                <Descriptions.Item label="Hotel Name">
                  <Text strong>{hotel.name}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Location">
                  <Text>{hotel.location || "Not specified"}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Rating">
                  <Space>
                    <Rate
                      disabled
                      defaultValue={hotel.rating || 4.5}
                      style={{ fontSize: 14 }}
                    />
                    <Text>({hotel.rating || 4.5})</Text>
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Contact">
                  <Text>{hotel.contact || "Not specified"}</Text>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>

        {/* Booking Modal */}
        <Modal
          title={`Book ${hotel?.name} - ${room.type}`}
          open={isBookingModalVisible}
          onCancel={() => {
            setIsBookingModalVisible(false);
            setCurrentStep(0);
            form.resetFields();
          }}
          footer={null}
          width={600}
          style={{ borderRadius: 12 }}
        >
          <Steps
            current={currentStep}
            style={{ marginBottom: 32 }}
            items={[
              { title: "Select Dates" },
              { title: "Guest Info" },
              { title: "Confirm" },
            ]}
          />

          {currentStep === 0 && (
            <Form
              form={form}
              layout="vertical"
              onFinish={() => setCurrentStep(1)}
            >
              <Form.Item
                name="dateRange"
                label="Select Date Range"
                rules={[{ required: true, message: "Please select dates!" }]}
              >
                <RangePicker style={{ width: "100%" }} size="large" />
              </Form.Item>
              <Form.Item
                name="guests"
                label="Number of Guests"
                rules={[{ required: true, message: "Enter number of guests" }]}
              >
                <InputNumber
                  min={1}
                  max={room.capacity || 10}
                  style={{ width: "100%" }}
                  size="large"
                  placeholder={`Max: ${room.capacity} guests`}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Next
              </Button>
            </Form>
          )}

          {currentStep === 1 && (
            <Form
              layout="vertical"
              onFinish={(values) => {
                handleBookingSubmit(values);
                setCurrentStep(2);
              }}
            >
              <Form.Item
                name="name"
                label="Full Name"
                initialValue={user?.name || ""}
                rules={[{ required: true, message: "Enter your name" }]}
              >
                <Input placeholder="Your full name" size="large" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                initialValue={user?.email || ""}
                rules={[
                  { required: true, message: "Enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="example@mail.com" size="large" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: "Enter your phone number" }]}
              >
                <Input placeholder="+1 234 567 8900" size="large" />
              </Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Confirm Booking
              </Button>
            </Form>
          )}

          {currentStep === 2 && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <CheckCircleOutlined
                style={{ fontSize: 64, color: "#52c41a", marginBottom: 24 }}
              />
              <Title level={3} style={{ color: "#52c41a", marginBottom: 16 }}>
                Booking Confirmed!
              </Title>
              <Paragraph style={{ fontSize: 16, marginBottom: 8 }}>
                Thank you for booking {room.type} room at {hotel.name}.
              </Paragraph>
              <Text type="secondary">
                A confirmation email has been sent to {user?.email}.
              </Text>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default RoomDetail;
