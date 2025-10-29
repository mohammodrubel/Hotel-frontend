import React, { useState } from "react";
import { DatePicker, Button, Input, Select } from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import bannerImage from "../assets/bedroom.jpg";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;
const { Option } = Select;

const HotelBanner = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    checkIn: null,
    checkOut: null,
    guestCount: 1,
  });

  const handleSearch = () => {
    const formatDate = (date) =>
      date ? dayjs(date).format("YYYY-MM-DD") : null;

    const formattedData = {
      ...searchData,
      checkIn: formatDate(searchData.checkIn),
      checkOut: formatDate(searchData.checkOut),
    };

    const params = new URLSearchParams();
    if (formattedData.searchTerm)
      params.append("searchTerm", formattedData.searchTerm);
    if (formattedData.checkIn) params.append("checkIn", formattedData.checkIn);
    if (formattedData.checkOut)
      params.append("checkOut", formattedData.checkOut);
    if (formattedData.guestCount && formattedData.guestCount > 0)
      params.append("guestCount", formattedData.guestCount.toString());

    const queryString = params.toString();
    const url = `/room?${queryString}`;

    console.log("Navigating to:", url);
    navigate(url);
  };

  const handleDateChange = (dates) => {
    if (dates) {
      setSearchData({ ...searchData, checkIn: dates[0], checkOut: dates[1] });
    } else {
      setSearchData({ ...searchData, checkIn: null, checkOut: null });
    }
  };

  return (
    <div
      className="relative min-h-[70vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {/* 🔳 Black Overlay Layer */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="w-full max-w-6xl mx-auto text-center">
          {/* Title Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Stay
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Discover amazing hotels and resorts around the world. Book your
              dream vacation with the best deals and exclusive offers.
            </p>
          </div>

          {/* Search Card */}
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-white border-opacity-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
              {/* Destination */}
              <div className="lg:col-span-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                  Destination
                </label>
                <div className="relative">
                  <EnvironmentOutlined className="absolute left-3 top-3 text-gray-400 text-lg" />
                  <Input
                    placeholder="Where are you going?"
                    value={searchData.searchTerm}
                    onChange={(e) =>
                      setSearchData({
                        ...searchData,
                        searchTerm: e.target.value,
                      })
                    }
                    className="pl-10 h-12 rounded-xl border-gray-300 hover:border-blue-400 focus:border-blue-500"
                    size="large"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="lg:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                  Check-in / Check-out
                </label>
                <RangePicker
                  className="w-full h-12 rounded-xl border-gray-300 hover:border-blue-400 focus:border-blue-500"
                  size="large"
                  placeholder={["Check-in", "Check-out"]}
                  onChange={handleDateChange}
                  disabledDate={(current) =>
                    current && current < dayjs().startOf("day")
                  }
                  getPopupContainer={(trigger) => trigger.parentNode}
                />
              </div>

              {/* Guests */}
              <div className="lg:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                  Guests
                </label>
                <div className="relative">
                  <UserOutlined className="absolute left-3 top-3 z-10 text-gray-400 text-lg" />
                  <Select
                    value={searchData.guestCount.toString()}
                    className="w-full h-12 rounded-xl"
                    size="large"
                    onChange={(value) =>
                      setSearchData({
                        ...searchData,
                        guestCount: parseInt(value),
                      })
                    }
                    dropdownClassName="rounded-xl"
                    suffixIcon={null}
                  >
                    <Option value="1">1 Guest</Option>
                    <Option value="2">2 Guests</Option>
                    <Option value="3">3 Guests</Option>
                    <Option value="4">4 Guests</Option>
                    <Option value="5">5+ Guests</Option>
                  </Select>
                </div>
              </div>

              {/* Search Button */}
              <div className="lg:col-span-2">
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  size="large"
                  onClick={handleSearch}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { value: "10K+", label: "Hotels Worldwide" },
              { value: "500+", label: "Cities" },
              { value: "1M+", label: "Happy Guests" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBanner;
