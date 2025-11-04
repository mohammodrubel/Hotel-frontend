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
  Descriptions,
  Space,
  Divider,
} from "antd";
import {
  CheckCircleOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { toast } from "sonner";
import {useAddNewBookingMutation} from '../redux/features/booking/bookingApi'
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
  const [bookingData, setBookingData] = useState(null);
  const user = useSelector((state) => state?.auth?.user);
  const [addNewBooking] = useAddNewBookingMutation()
 
  // Calculate total price based on dates and room price
  const calculateTotalPrice = (dateRange, guestCount) => {
    if (
      !dateRange ||
      !dateRange[0] ||
      !dateRange[1] ||
      !selectedRoom?.pricePerNight
    ) {
      return 0;
    }

    const nights = dateRange[1].diff(dateRange[0], "days");
    return nights * selectedRoom.pricePerNight;
  };

  // Custom validator for date range
  const validateDateRange = (_, value) => {
    if (!value || value.length < 2) {
      return Promise.reject(
        new Error("Please select both check-in and check-out dates")
      );
    }

    const checkIn = value[0];
    const checkOut = value[1];

    // Check if check-in is before today
    if (checkIn.isBefore(dayjs(), "day")) {
      return Promise.reject(new Error("Check-in date cannot be in the past"));
    }

    // Check if check-out is after check-in
    if (!checkOut.isAfter(checkIn, "day")) {
      return Promise.reject(
        new Error("Check-out date must be after check-in date")
      );
    }

    return Promise.resolve();
  };

  const handleStep1Submit = async(values) => {
    const { dateRange, guests } = values;

    // Prepare booking data according to your Prisma schema
    const bookingInfo = {
      roomId: selectedRoom?.id,
      userId: user?.id,
      checkIn: dateRange[0].toDate(),
      checkOut: dateRange[1].toDate(),
      guestCount: guests,
      totalPrice: calculateTotalPrice(dateRange, guests),
      dateRange: dateRange,
    };
    setBookingData(bookingInfo);
    setCurrentStep(1);
  };

  const handleBookingSubmit = async (values) => {
    try {
      const finalBookingData = {
        ...bookingData,
        ...values,
        dateRange: undefined,
        guests: undefined,
      };

      const res = await addNewBooking(finalBookingData);
      console.log(res);

      if (res?.data?.success) {
        // ✅ Success: Redirect to Stripe payment
        const paymentUrl = res.data.data.paymentSession.url;

        // Show success message
        toast.success("Redirecting to payment...");

        // Redirect to Stripe payment page
        window.location.href = paymentUrl;
      } else if (res?.error?.data?.success === false) {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create booking");
    }
  };
  const handleCancel = () => {
    setCurrentStep(0);
    setBookingData(null);
    form.resetFields();
    onCancel();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date) => {
    return dayjs(date).format("MMM DD, YYYY");
  };

  // Disabled dates for DatePicker (past dates)
  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
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
      width={700}
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
              { title: "Dates & Guests" },
              { title: "Guest Info" },
              { title: "Confirmation" },
            ]}
          />

          {currentStep === 0 && (
            <Form
              form={form}
              layout="vertical"
              onFinish={handleStep1Submit}
              initialValues={{
                guests: 1,
              }}
            >
              <Form.Item
                name="dateRange"
                label="Select Date Range"
                rules={[
                  {
                    required: true,
                    message: "Please select check-in and check-out dates!",
                  },
                  { validator: validateDateRange },
                ]}
              >
                <RangePicker
                  style={{ width: "100%" }}
                  size="large"
                  disabledDate={disabledDate}
                  format="MMM DD, YYYY"
                />
              </Form.Item>

              <Form.Item
                name="guests"
                label="Number of Guests"
                rules={[
                  { required: true, message: "Please enter number of guests" },
                  {
                    type: "number",
                    min: 1,
                    max: selectedRoom?.capacity || 10,
                    message: `Must be between 1 and ${selectedRoom?.capacity} guests`,
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  max={selectedRoom?.capacity || 10}
                  style={{ width: "100%" }}
                  size="large"
                  placeholder={`Maximum: ${selectedRoom?.capacity} guests`}
                />
              </Form.Item>

              {/* Price Preview */}
              <Form.Item shouldUpdate>
                {() => {
                  const dateRange = form.getFieldValue("dateRange");
                  const guests = form.getFieldValue("guests") || 1;
                  const totalPrice = calculateTotalPrice(dateRange, guests);

                  if (totalPrice > 0) {
                    const nights = dateRange
                      ? dateRange[1].diff(dateRange[0], "days")
                      : 0;
                    return (
                      <div
                        style={{
                          backgroundColor: "#f8f9fa",
                          padding: "16px",
                          borderRadius: "8px",
                          marginBottom: "16px",
                        }}
                      >
                        <Space direction="vertical" style={{ width: "100%" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text>
                              ${selectedRoom.pricePerNight} × {nights} nights
                            </Text>
                            <Text>
                              {formatCurrency(
                                selectedRoom.pricePerNight * nights
                              )}
                            </Text>
                          </div>
                          <Divider style={{ margin: "8px 0" }} />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text strong>Total</Text>
                            <Text strong>{formatCurrency(totalPrice)}</Text>
                          </div>
                        </Space>
                      </div>
                    );
                  }
                  return null;
                }}
              </Form.Item>

              <Button type="primary" htmlType="submit" block size="large">
                Continue to Guest Info
              </Button>
            </Form>
          )}

          {currentStep === 1 && bookingData && (
            <Form
              layout="vertical"
              onFinish={handleBookingSubmit}
              initialValues={{
                name: user?.name || "",
                email: user?.email || "",
              }}
            >
              {/* Booking Summary */}
              <div
                style={{
                  backgroundColor: "#f0f7ff",
                  padding: "16px",
                  borderRadius: "8px",
                  marginBottom: "24px",
                }}
              >
                <Title level={5} style={{ marginBottom: "12px" }}>
                  <CalendarOutlined /> Booking Summary
                </Title>
                <Descriptions size="small" column={1}>
                  <Descriptions.Item label="Room">
                    {selectedRoom.type} - {selectedRoom.hotel?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Dates">
                    {formatDate(bookingData.checkIn)} -{" "}
                    {formatDate(bookingData.checkOut)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Guests">
                    <UserOutlined /> {bookingData.guests} guest
                    {bookingData.guests > 1 ? "s" : ""}
                  </Descriptions.Item>
                  <Descriptions.Item label="Total Price">
                    <Text strong>{formatCurrency(bookingData.totalPrice)}</Text>
                  </Descriptions.Item>
                </Descriptions>
              </div>

              <Title level={5}>Guest Information</Title>

              <Form.Item
                name="name"
                label="Full Name"
                rules={[
                  { required: true, message: "Please enter your full name" },
                ]}
              >
                <Input placeholder="Your full name" size="large" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email address",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input placeholder="example@mail.com" size="large" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input placeholder="+1 234 567 8900" size="large" />
              </Form.Item>

              <Space style={{ width: "100%" }} direction="vertical">
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  style={{ marginBottom: "8px" }}
                >
                  Confirm Booking
                </Button>
                <Button onClick={() => setCurrentStep(0)} block size="large">
                  Back to Dates
                </Button>
              </Space>
            </Form>
          )}

          {currentStep === 2 && bookingData && (
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
              <div style={{ marginBottom: 16 }}>
                <Text strong>
                  {formatDate(bookingData.checkIn)} -{" "}
                  {formatDate(bookingData.checkOut)}
                </Text>
                <br />
                <Text type="secondary">
                  {bookingData.guests} guest{bookingData.guests > 1 ? "s" : ""}{" "}
                  • {formatCurrency(bookingData.totalPrice)}
                </Text>
              </div>
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
