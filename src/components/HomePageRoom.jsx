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

  // Try different selector patterns
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
      console.log("No user found, showing login modal");
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
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <Title level={2} className="text-center mb-6 sm:mb-8">
          Available Rooms
        </Title>
        <Row gutter={[16, 16]}>
          {[...Array(8)].map((_, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                className="h-full shadow-sm hover:shadow-md transition-shadow duration-300 border-0"
                bodyStyle={{ padding: "12px" }}
              >
                <Skeleton.Image
                  active
                  className="!w-full !h-32 sm:!h-36 mb-3"
                />
                <Skeleton active paragraph={{ rows: 2 }} />
                <Skeleton.Button active className="!w-full !h-8 mt-2" />
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
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <Title level={2} className="text-center mb-6 sm:mb-8">
          Available Rooms
        </Title>
        <Card className="text-center py-8">
          <Text type="danger">
            Error loading rooms. Please try again later.
          </Text>
        </Card>
      </div>
    );
  }

  // No rooms found
  if (!data?.data || data?.data?.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <Title level={2} className="text-center mb-6 sm:mb-8">
          Available Rooms
        </Title>
        <Card className="text-center py-8">
          <Text type="secondary">No rooms available at the moment.</Text>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-12">
        <Title
          level={2}
          className="text-gray-800 mb-3 sm:mb-4 text-xl sm:text-2xl lg:text-3xl"
        >
          Luxury Rooms & Suites
        </Title>
        <Paragraph className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
          Discover our carefully curated selection of rooms designed for your
          comfort and luxury
        </Paragraph>
      </div>

      {/* Responsive Rooms Grid */}
      <Row
        gutter={[
          { xs: 12, sm: 16, md: 20 },
          { xs: 12, sm: 16, md: 20 },
        ]}
      >
        {data?.data?.map((room) => (
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

      {/* Global Booking Modal */}
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
