
import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer, Button } from "antd";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { key: "rooms", label: "Rooms", href: "/room" },
    { key: "about", label: "About", href: "/about" },
    { key: "login", label: "Login", href: "/login" },
  ];

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            MyHotel
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              type="text"
              icon={<MenuOutlined className="text-2xl" />}
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        title={
          <span className="text-xl font-semibold text-blue-600">MyHotel</span>
        }
        placement="left"
        closable
        onClose={() => setOpen(false)}
        open={open}
        bodyStyle={{ padding: "1rem" }}
      >
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              className="text-lg text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
