import React from "react";
import { Card, Divider, Tag, Button, Tooltip, Space, Typography } from "antd";
import {
  UserOutlined,
  WifiOutlined,
  CarOutlined,
  CoffeeOutlined,
  EnvironmentOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const RoomCard = ({ room, user, onViewDetails, onBookNow }) => {
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

  return (
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
            }}
          />
          {!user && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  background: "rgba(0,0,0,0.7)",
                  padding: "8px 16px",
                  borderRadius: 20,
                }}
              >
                Login to View Details
              </Text>
            </div>
          )}
        </div>
      }
      style={{
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        background: "white",
        border: "none",
        height: "100%",
        cursor: user ? "pointer" : "not-allowed",
      }}
      bodyStyle={{ padding: 20 }}
      onClick={user ? () => onViewDetails(room) : undefined}
    >
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

      <div style={{ marginBottom: 16 ,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
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

      <Divider style={{ margin: "16px 0", background: "#f0f0f0" }} />

      <div
      >
        <div>
          <Text
            strong
            style={{
              fontSize: "24px",
              color: "#1890ff",
              background: "linear-gradient(135deg, #1890ff, #722ed1)",
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
         
        </div>
        <Space>
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(room);
              }}
            >
              Details
            </Button>
          </Tooltip>
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              onBookNow(room);
            }}
            disabled={!user}
          >
            {user ? "Book Now" : "Login to Book"}
          </Button>
        </Space>
      </div>
    </Card>
  );
};

export default RoomCard;
