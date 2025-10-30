import React from "react";
import {
  Card,
  Row,
  Col,
  Tag,
  Button,
  Image,
  Skeleton,
  Typography,
  Space,
  Divider,
  Rate,
} from "antd";
import {
  UserOutlined,
  WifiOutlined,
  CarOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import { useGetAllRoomsQuery } from "../redux/features/room/roomApi";
import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

// Room type colors
const roomTypeColors = {
  SINGLE: "blue",
  DOUBLE: "green",
  DELUXE: "purple",
  SUITE: "gold",
  FAMILY: "orange",
};

// Amenity icons mapping
const amenityIcons = {
  wifi: <WifiOutlined />,
  parking: <CarOutlined />,
  breakfast: <CoffeeOutlined />,
  pool: "🏊",
  gym: "💪",
  spa: "💆",
};

function HomePageRoom() {
  const { data, isLoading, error } = useGetAllRoomsQuery([]);

  // Function to render amenities with icons
  const renderAmenities = (amenities) => {
    return amenities?.slice(0, 3).map((amenity, index) => (
      <div key={index} className="flex items-center gap-1">
        <span className="text-xs text-gray-500">
          {amenityIcons[amenity.toLowerCase()] || "•"}
        </span>
        <Text className="text-xs text-gray-600">
          {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
        </Text>
      </div>
    ));
  };

  // Function to format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);
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
    <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 ">
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
          { xs: 12, sm: 16, md: 20 }, // Horizontal gutter
          { xs: 12, sm: 16, md: 20 }, // Vertical gutter
        ]}
      >
        {data?.data?.map((room) => (
          <Col
            xs={24} // 1 column on extra small screens (<576px)
            sm={12} // 2 columns on small screens (≥576px)
            md={8} // 3 columns on medium screens (≥768px)
            lg={6} // 4 columns on large screens (≥992px)
            key={room.id}
          >
            <Card
              className="h-full shadow-sm hover:shadow-lg transition-all duration-300 border-0 rounded-lg overflow-hidden group flex flex-col"
              bodyStyle={{
                padding: "12px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
              cover={
                <div className="relative overflow-hidden">
                  <Image
                    alt={room.type}
                    src={room.images?.[0]}
                    preview={{
                      mask: (
                        <div className="flex items-center gap-1 text-white text-xs">
                          <span>Preview</span>
                        </div>
                      ),
                    }}
                    fallback="https://via.placeholder.com/300x200/4A6572/FFFFFF?text=Room+Image"
                    className="h-32 sm:h-36 md:h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <Tag
                      color={roomTypeColors[room.type] || "blue"}
                      className="text-xs font-semibold border-0 m-0 px-2 py-1"
                    >
                      {room.type.replace("_", " ")}
                    </Tag>
                    <Tag
                      color={room.available ? "green" : "red"}
                      className="text-xs font-semibold border-0 m-0 px-2 py-1"
                    >
                      {room.available ? "Available" : "Booked"}
                    </Tag>
                  </div>
                </div>
              }
            >
              {/* Room Header */}
              <div className="mb-3 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <Text
                    strong
                    className="text-gray-800 text-sm sm:text-base line-clamp-1"
                  >
                    {room.type.replace("_", " ")} Room
                  </Text>
                </div>

                {/* Rating */}
                {room.rating && (
                  <div className="mb-2">
                    <Rate
                      disabled
                      defaultValue={room.rating}
                      size="small"
                      className="text-xs"
                    />
                    <Text className="text-xs text-gray-500 ml-2">
                      ({room.reviewCount || 0})
                    </Text>
                  </div>
                )}

                {/* Price */}
                <Text
                  strong
                  className="text-base sm:text-lg text-blue-600 block mb-2"
                >
                  {formatPrice(room.pricePerNight)}
                  <Text className="text-xs text-gray-500">/night</Text>
                </Text>

                {/* Hotel Info */}
                <div className="mb-2">
                  <Text type="secondary" className="text-xs line-clamp-1">
                    {room.hotel?.name}
                  </Text>
                </div>

                {/* Capacity */}
                <div className="flex items-center gap-1 mb-3">
                  <UserOutlined className="text-gray-400 text-xs" />
                  <Text className="text-gray-600 text-xs">
                    {room.capacity} {room.capacity === 1 ? "Person" : "People"}
                  </Text>
                </div>
              </div>

              {/* Book Button */}
              <Button
                type="primary"
                size="middle"
                block
                disabled={!room.available}
                className="font-medium text-xs  mt-auto"
              >
                {room.available ? "Book Now" : "Not Available"}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePageRoom;
