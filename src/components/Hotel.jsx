import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Skeleton, Card, Row, Col, Button } from "antd";
import { useGetAllHotelQuery } from "../redux/features/hotel/hotelApi";
import { useNavigate } from "react-router-dom";

const HotelSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate()
  const {
    data,
    isLoading,
    error,
  } = useGetAllHotelQuery([
    { name: "limit", value: 1000 },
    { name: "page", value: 1 },
  ]);

  // Function to generate star rating
  const generateStars = (rating) => {
    return (
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
        <span className="text-gray-600 text-sm ml-2 font-medium">
          ({rating})
        </span>
      </div>
    );
  };

  // Slick slider settings with proper spacing
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: !isLoading,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    beforeChange: (current, next) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleHotel = (value)=>{
    navigate(`/room?searchTerm=${value?.name}`)
  }

  // Skeleton Loading Component
  const HotelSkeleton = () => {
    return (
      <div className="px-3 pb-6">
        <Card className="rounded-2xl shadow-lg">
          <Skeleton.Image active className="!w-full !h-60 rounded-t-2xl" />
          <div className="p-6">
            <Skeleton active paragraph={{ rows: 0 }} className="mb-3" />
            <Skeleton active paragraph={{ rows: 0 }} className="mb-4" />
            <Skeleton active paragraph={{ rows: 2 }} className="mb-6" />
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <Skeleton active paragraph={{ rows: 0 }} className="!w-24" />
              <Skeleton.Button active className="!w-32 !h-10" />
            </div>
          </div>
        </Card>
      </div>
    );
  };

  // Loading state with skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
        {/* Header Skeleton */}
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

        {/* Skeleton Slider */}
        <div className="px-2">
          <Slider {...sliderSettings} className="hotel-slider">
            {[...Array(8)].map((_, index) => (
              <HotelSkeleton key={index} />
            ))}
          </Slider>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Discover Amazing Hotels
          </h2>
          <p className="text-red-600 text-lg">
            Error loading hotels. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // No hotels found
  if (!data?.data || data?.data.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Discover Amazing Hotels
          </h2>
          <p className="text-gray-600 text-lg">No hotels found.</p>
        </div>
      </div>
    );
  }

  return (
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

      {/* Slider Container */}
      <div className="px-2">
        <Slider {...sliderSettings} className="hotel-slider">
          {data?.data?.map((hotel, index) => (
            <div
              key={hotel.id}
              className="px-3 pb-6"
              onClick={() => handleHotel(hotel)}
            >
              <div
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-400 ease-out border border-white/20 backdrop-blur-sm ${
                  index === activeSlide ? "border-blue-500 border-2" : ""
                } hover:-translate-y-3 hover:scale-105 hover:shadow-2xl`}
              >
                {/* Image Container */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={hotel.images}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-600 ease-out hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200/4A6572/FFFFFF?text=Hotel+Image";
                    }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Header with Name and Rating */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl line-clamp-1 font-bold text-gray-800 leading-tight flex-1 mr-3">
                      {hotel.name}
                    </h3>
                    {hotel.rating > 0 && generateStars(hotel.rating)}
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 text-sm mb-4 gap-2">
                    <span>📍</span>
                    {hotel.location}
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-2">
                    {hotel.description}
                  </p>

                  {/* Footer */}
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

                    <Button type="primary" className=" px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ease-out shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
                      View Details
                      <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                        →
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .hotel-slider .slick-prev,
        .hotel-slider .slick-next {
          width: 50px;
          height: 50px;
          z-index: 10;
          background: white;
          border-radius: 50%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .hotel-slider .slick-prev:hover,
        .hotel-slider .slick-next:hover {
          background: #3b82f6;
          transform: scale(1.1);
        }

        .hotel-slider .slick-prev {
          left: -25px;
        }

        .hotel-slider .slick-next {
          right: -25px;
        }

        .hotel-slider .slick-prev:before,
        .hotel-slider .slick-next:before {
          font-family: "slick";
          font-size: 20px;
          line-height: 1;
          opacity: 0.75;
          color: #374151;
          transition: all 0.3s ease;
        }

        .hotel-slider .slick-prev:hover:before,
        .hotel-slider .slick-next:hover:before {
          color: white;
          opacity: 1;
        }

        .hotel-slider .slick-dots {
          bottom: -50px;
        }

        .hotel-slider .slick-dots li button:before {
          font-size: 12px;
          color: #cbd5e1;
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        .hotel-slider .slick-dots li.slick-active button:before {
          color: #3b82f6;
          opacity: 1;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .hotel-slider .slick-prev {
            left: -15px;
          }
          .hotel-slider .slick-next {
            right: -15px;
          }
        }
      `}</style>
    </div>
  );
};

export default HotelSlider;
