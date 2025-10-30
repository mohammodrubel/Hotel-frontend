"use client";

import { Layout, Row, Col, Card, Button, List, Badge, Divider } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import Footer from "./Footer";

const { Content } = Layout;

const PLANS = [
  {
    name: "Basic",
    price: 0,
    period: "month",
    description: "For occasional travelers",
    recommended: false,
    features: [
      "Access to all hotels",
      "Basic search filters",
      "Email support",
      "Standard booking rates",
      "Up to 5 saved hotels",
    ],
  },
  {
    name: "Premium",
    price: 2999,
    period: "month",
    description: "For frequent travelers",
    recommended: true,
    features: [
      "Everything in Basic",
      "15% discount on all bookings",
      "Priority customer support",
      "Exclusive deals and early access",
      "Unlimited saved hotels",
      "Free cancellation up to 48 hours",
      "Loyalty points on every booking",
    ],
  },
  {
    name: "Elite",
    price: 5999,
    period: "month",
    description: "For luxury seekers",
    recommended: false,
    features: [
      "Everything in Premium",
      "25% discount on all bookings",
      "VIP concierge service",
      "Complimentary room upgrades",
      "Free airport transfers",
      "Exclusive access to luxury properties",
      "Personal travel assistant",
      "Priority booking guarantee",
    ],
  },
];

export default function Subscription() {
  return (
    <Content>
      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <Row gutter={[24, 24]}>
            {[
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes, you can cancel your subscription at any time without any penalties. Your access will continue until the end of your billing period.",
              },
              {
                q: "Do discounts apply to all hotels?",
                a: "Discounts apply to most hotels in our network. Some exclusive properties may have different terms.",
              },
              {
                q: "How do loyalty points work?",
                a: "Earn 1 point per ৳100 spent. Redeem 1000 points for ৳500 discount on your next booking.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes! Premium and Elite plans come with a 7-day free trial. No credit card required.",
              },
            ].map((item, idx) => (
              <Col key={idx} xs={24} md={12}>
                <Card>
                  <h4 className="font-bold mb-2">{item.q}</h4>
                  <p className="text-gray-600 text-sm">{item.a}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Content>
  );
}
