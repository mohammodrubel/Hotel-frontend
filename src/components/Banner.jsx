"use client";
import React from "react";
import { Button, DatePicker, Input, Select } from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { Option } = Select;

const Banner = () => {
  return (
    <section
      className="relative w-full h-screen min-h-[700px] bg-cover bg-center flex items-center justify-center text-center"
      style={{
        backgroundImage: "url('/bedroom.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/50 to-indigo-900/70"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Banner Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-white px-4 w-full">
        {/* Main Heading with Animation */}
        <div className="mb-8 transform transition-all duration-700 hover:scale-105">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-light max-w-2xl mx-auto leading-relaxed">
            Discover exclusive hotels, luxurious rooms, and amazing deals
            tailored for your comfort
          </p>
        </div>

        {/* Enhanced Search Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8 max-w-4xl mx-auto transform hover:shadow-2xl transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
            {/* Location Input */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium flex items-center gap-2">
                <EnvironmentOutlined className="text-blue-300" />
                Destination
              </label>
              <Input
                placeholder="Where are you going?"
                className="h-14 rounded-xl border-white/30 bg-white/90 hover:bg-white focus:bg-white transition-all duration-300 [&_.ant-input]:h-12"
                size="large"
                prefix={<EnvironmentOutlined className="text-gray-400" />}
              />
            </div>

            {/* Date Range Picker */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium flex items-center gap-2">
                <CalendarOutlined className="text-blue-300" />
                Dates
              </label>
              <RangePicker
                className="h-14 rounded-xl border-white/30 bg-white/90 hover:bg-white focus:bg-white w-full [&_.ant-picker-input]:h-10 [&_.ant-picker-input>input]:h-10"
                placeholder={["Check In", "Check Out"]}
                size="large"
              />
            </div>

            {/* Guests Selector */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium flex items-center gap-2">
                <UserOutlined className="text-blue-300" />
                Guests
              </label>
              <Select
                defaultValue="2 Guests"
                className="h-14 rounded-xl border-white/30 bg-white/90 hover:bg-white focus:bg-white w-full [&_.ant-select-selector]:h-12"
                size="large"
                suffixIcon={<UserOutlined className="text-gray-400" />}
              >
                <Option value="1">1 Guest</Option>
                <Option value="2">2 Guests</Option>
                <Option value="3">3 Guests</Option>
                <Option value="4">4+ Guests</Option>
              </Select>
            </div>

            {/* Search Button */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium opacity-0">
                Action
              </label>
              <Button
                type="primary"
                size="large"
                icon={<SearchOutlined className="text-lg" />}
                className="h-14 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 border-none text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-full"
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Best Price Guarantee</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm">24/7 Customer Support</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Free Cancellation</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
