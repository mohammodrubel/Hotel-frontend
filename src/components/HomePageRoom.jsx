// components/HomePageRoom.js
import React, { useState } from "react";
import { Row, Col, Skeleton, Typography, Card, Button, Modal } from "antd";
import { useGetAllRoomsQuery } from "../redux/features/room/roomApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RoomCard from "./RoomCard";
import BookingModal from "./BookingModal";

const { Title, Text, Paragraph } = Typography;

function HomePageRoom() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { data, isLoading, error } = useGetAllRoomsQuery([]);

  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Handle room details click
  const handleViewDetails = (room) => {
    navigate(`/room/${room.id}`);
  };

  // Handle book now click
  const handleBookNow = (room, e) => {
    e.stopPropagation();

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

  // Handle booking success
  const handleBookingSuccess = () => {
    console.log("Booking completed successfully!");
    // You can add additional success handling here
    // like refetching rooms data, showing success message, etc.
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Title level={2} className="text-center mb-8">
          Available Rooms
        </Title>
        <Row gutter={[24, 24]}>
          {[...Array(8)].map((_, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                className="h-full border-0 rounded-lg"
                bodyStyle={{ padding: "16px" }}
              >
                <Skeleton.Image className="!w-full !h-48 mb-4 rounded-lg" />
                <Skeleton active paragraph={{ rows: 3 }} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Title level={2} className="text-center mb-8">
          Available Rooms
        </Title>
        <Card className="text-center py-12 border-0 shadow-lg">
          <Text type="danger" className="text-lg">
            Error loading rooms. Please try again later.
          </Text>
        </Card>
      </div>
    );
  }

  // No rooms found
  if (!data?.data || data?.data?.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Title level={2} className="text-center mb-8">
          Available Rooms
        </Title>
        <Card className="text-center py-12 border-0 shadow-lg">
          <Text type="secondary" className="text-lg">
            No rooms available at the moment.
          </Text>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <Title level={1} className="text-gray-900 mb-4 text-3xl md:text-4xl">
          Luxury Rooms & Suites
        </Title>
        <Paragraph className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover our carefully curated selection of rooms designed for your
          comfort and luxury
        </Paragraph>
      </div>

      {/* Rooms Grid */}
      <Row gutter={[24, 24]}>
        {data.data.map((room) => (
          <Col xs={24} sm={12} md={8} lg={6} key={room.id}>
            <RoomCard
              room={room}
              user={user}
              onViewDetails={handleViewDetails}
              onBookNow={handleBookNow}
              showHotelInfo={true}
              showRating={true}
              showCapacity={true}
            />
          </Col>
        ))}
      </Row>

      {/* Booking Modal */}
      <BookingModal
        visible={isBookingModalVisible}
        onCancel={() => setIsBookingModalVisible(false)}
        selectedRoom={selectedRoom}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
}

export default HomePageRoom;
