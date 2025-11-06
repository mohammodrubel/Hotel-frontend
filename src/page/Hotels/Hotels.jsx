import React, { useState } from "react";
import { Skeleton, Card, Button, Row, Col, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetAllHotelQuery } from "../../redux/features/hotel/hotelApi";
import Navbar from "../../components/Navigation";

const HotelList = () => {
  const navigate = useNavigate();
  const [limit,setLimit]=useState(4)
  const [page,setPage]=useState(1)
  const { data, isLoading, error } = useGetAllHotelQuery([
    { name: "limit", value: limit },
    { name: "page", value: page },
  ]);

  const generateStars = (rating) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${
            star <= Math.floor(rating)
              ? "text-yellow-400"
              : star === Math.ceil(rating) && rating % 1 !== 0
              ? "text-yellow-400 opacity-70"
              : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
      <span className="text-gray-600 text-sm ml-2 font-medium">({rating})</span>
    </div>
  );

  const handleHotel = (value) => {
    navigate(`/room?searchTerm=${value?.name}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="text-center mb-12">
          <Skeleton
            active
            paragraph={{ rows: 0 }}
            className="!w-96 !h-12 mx-auto mb-4"
          />
          <Skeleton
            active
            paragraph={{ rows: 1 }}
            className="!w-80 !h-6 mx-auto"
          />
        </div>
        <Row gutter={[24, 24]}>
          {[...Array(8)].map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card className="rounded-2xl shadow-lg">
                <Skeleton.Image
                  active
                  className="!w-full !h-60 rounded-t-2xl"
                />
                <div className="p-6">
                  <Skeleton active paragraph={{ rows: 3 }} />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
          Discover Amazing Hotels
        </h2>
        <p className="text-red-600 text-lg">
          Error loading hotels. Please try again later.
        </p>
      </div>
    );
  }

  if (!data?.data || data?.data.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
          Discover Amazing Hotels
        </h2>
        <p className="text-gray-600 text-lg">No hotels found.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 min-h-screen">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Discover Amazing Hotels
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Handpicked luxury stays with exceptional service and amenities
          </p>
        </div>

        {/* Grid Layout */}
        <Row gutter={[24, 24]}>
          {data?.data?.map((hotel) => (
            <Col key={hotel.id} xs={24} sm={12} md={8} lg={6}>
              <div
                onClick={() => handleHotel(hotel)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={hotel.images}
                    alt={hotel.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200/4A6572/FFFFFF?text=Hotel+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl line-clamp-1 font-bold text-gray-800 leading-tight flex-1 mr-3">
                      {hotel.name}
                    </h3>
                    {hotel.rating > 0 && generateStars(hotel.rating)}
                  </div>

                  <div className="flex items-center text-gray-600 text-sm mb-4 gap-2">
                    <span>📍</span>
                    {hotel.location}
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-2">
                    {hotel.description}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <span>🛏️</span>
                      <span className="text-gray-700 text-sm font-medium">
                        {hotel.rooms ? hotel.rooms.length : 0}{" "}
                        {hotel.rooms && hotel.rooms.length === 1
                          ? "Room"
                          : "Rooms"}{" "}
                        Available
                      </span>
                    </div>

                    <Button
                      type="primary"
                      className="px-4 py-2 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                    >
                      View Details →
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div className="mx-auto py-5 text-center flex justify-center">
          <Pagination
            current={page}
            pageSize={limit}
            total={data?.meta?.total}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </>
  );
};

export default HotelList;
