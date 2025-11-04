// components/BookingModal.js
import React, { useState } from "react";
import {
  Modal,
  Form,
  DatePicker,
  InputNumber,
  message,
  Steps,
  Input,
  Typography,
  Button,
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;
const { Step } = Steps;

const BookingModal = ({
  visible,
  onCancel,
  selectedRoom,
  onBookingSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const user = useSelector((state) => state?.auth?.user);

  console.log("BookingModal props:", { visible, selectedRoom, user }); // Debug log

  const handleBookingSubmit = (values) => {
    console.log("Booking details:", {
      ...values,
      room: selectedRoom,
      user: user?.id,
    });
    message.success("Booking successful!");
    onBookingSuccess();
    setCurrentStep(0);
    form.resetFields();
    onCancel();
  };

  const handleCancel = () => {
    setCurrentStep(0);
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={
        selectedRoom
          ? `Book ${selectedRoom?.hotel?.name} - ${selectedRoom?.type}`
          : "Book Room"
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      style={{ borderRadius: 12 }}
    >
      {!selectedRoom ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Text type="secondary">No room selected</Text>
        </div>
      ) : (
        <>
          <Steps
            current={currentStep}
            style={{ marginBottom: 32 }}
            items={[
              { title: "Select Dates" },
              { title: "Guest Info" },
              { title: "Confirm" },
            ]}
          />

          {currentStep === 0 && (
            <Form
              form={form}
              layout="vertical"
              onFinish={() => setCurrentStep(1)}
            >
              <Form.Item
                name="dateRange"
                label="Select Date Range"
                rules={[{ required: true, message: "Please select dates!" }]}
              >
                <RangePicker style={{ width: "100%" }} size="large" />
              </Form.Item>
              <Form.Item
                name="guests"
                label="Number of Guests"
                rules={[{ required: true, message: "Enter number of guests" }]}
              >
                <InputNumber
                  min={1}
                  max={selectedRoom?.capacity || 10}
                  style={{ width: "100%" }}
                  size="large"
                  placeholder={`Max: ${selectedRoom?.capacity} guests`}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Next
              </Button>
            </Form>
          )}

          {currentStep === 1 && (
            <Form
              form={form}
              layout="vertical"
              onFinish={(values) => {
                handleBookingSubmit(values);
                setCurrentStep(2);
              }}
            >
              <Form.Item
                name="name"
                label="Full Name"
                initialValue={user?.name || ""}
                rules={[{ required: true, message: "Enter your name" }]}
              >
                <Input placeholder="Your full name" size="large" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                initialValue={user?.email || ""}
                rules={[
                  { required: true, message: "Enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="example@mail.com" size="large" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: "Enter your phone number" }]}
              >
                <Input placeholder="+1 234 567 8900" size="large" />
              </Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Confirm Booking
              </Button>
            </Form>
          )}

          {currentStep === 2 && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <CheckCircleOutlined
                style={{ fontSize: 64, color: "#52c41a", marginBottom: 24 }}
              />
              <Title level={3} style={{ color: "#52c41a", marginBottom: 16 }}>
                Booking Confirmed!
              </Title>
              <Paragraph style={{ fontSize: 16, marginBottom: 8 }}>
                Thank you for booking {selectedRoom?.type} room at{" "}
                {selectedRoom?.hotel?.name}.
              </Paragraph>
              <Text type="secondary">
                A confirmation email has been sent to {user?.email}.
              </Text>
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default BookingModal;
