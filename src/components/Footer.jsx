
import { Layout, Row, Col, Divider, Space, Button } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";


const { Footer: AntFooter } = Layout;

export default function Footer() {
  return (
    <AntFooter className="bg-primary text-white mt-20">
      <div className="max-w-6xl mx-auto">
        <Row gutter={[32, 32]} className="mb-8">
          <Col xs={24} sm={12} md={6}>
            <h4 className="text-lg font-bold mb-4">LuxeStay</h4>
            <p className="text-white/80 text-sm">
              Your trusted partner for luxury hotel bookings worldwide.
            </p>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <Space direction="vertical" className="w-full">
              <Link to="/" className="text-white/80 hover:text-white text-sm">
                Home
              </Link>
              <Link
                to="/hotels"
                className="text-white/80 hover:text-white text-sm"
              >
                Hotels
              </Link>
              <Link
                to="/subscription"
                className="text-white/80 hover:text-white text-sm"
              >
                Subscription
              </Link>
              <Link
                to="/contact"
                className="text-white/80 hover:text-white text-sm"
              >
                Contact
              </Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <h4 className="font-bold mb-4">Support</h4>
            <Space direction="vertical" className="w-full">
              <a href="#" className="text-white/80 hover:text-white text-sm">
                Help Center
              </a>
              <a href="#" className="text-white/80 hover:text-white text-sm">
                Contact Us
              </a>
              <a href="#" className="text-white/80 hover:text-white text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-white/80 hover:text-white text-sm">
                Terms of Service
              </a>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <Space>
              <Button
                type="text"
                icon={<FacebookOutlined />}
                className="text-white hover:text-accent"
              />
              <Button
                type="text"
                icon={<TwitterOutlined />}
                className="text-white hover:text-accent"
              />
              <Button
                type="text"
                icon={<InstagramOutlined />}
                className="text-white hover:text-accent"
              />
              <Button
                type="text"
                icon={<LinkedinOutlined />}
                className="text-white hover:text-accent"
              />
            </Space>
          </Col>
        </Row>

        <Divider className="bg-white/20 my-8" />

        <div className="text-center text-gray-900 text-sm">
          <p>&copy; 2025 LuxeStay. All rights reserved.</p>
        </div>
      </div>
    </AntFooter>
  );
}
