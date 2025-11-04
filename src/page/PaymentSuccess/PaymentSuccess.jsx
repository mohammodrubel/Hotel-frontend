// components/PaymentSuccess.js
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Result, Button, Spin, Alert, Card, Descriptions } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useAddSessionVerifyMutation } from "../../redux/features/payment/paymentApi";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const [paymentStatus, setPaymentStatus] = useState("verifying");
  const [verificationData, setVerificationData] = useState(null);
  const [error, setError] = useState("");
  const [verifySession] = useAddSessionVerifyMutation();

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setPaymentStatus("invalid");
        setError("No session ID found");
        return;
      }

      try {
        console.log("🔄 Verifying payment with session:", sessionId);

        // Call the Redux mutation to verify payment
        const res = await verifySession(sessionId);
        console.log("📊 Verification response:", res);

        if (res?.data?.success) {
          setPaymentStatus("success");
          setVerificationData(res.data.data);
          console.log("✅ Payment verified and record created");
        } else {
          setPaymentStatus("failed");
          setError(res?.error?.data?.message || "Payment verification failed");
        }
      } catch (error) {
        console.error("❌ Payment verification error:", error);
        setPaymentStatus("error");
        setError("Network error while verifying payment");
      }
    };

    verifyPayment();
  }, [sessionId, verifySession]);

  // Loading state
  if (paymentStatus === "verifying") {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px 20px",
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        <div style={{ marginTop: 24 }}>
          <h2>Verifying Your Payment</h2>
          <p>
            Please wait while we confirm your payment and create your booking...
          </p>
          <p style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
            Session: {sessionId?.substring(0, 20)}...
          </p>
        </div>
      </div>
    );
  }

  // Success state
  if (paymentStatus === "success") {
    return (
      <div style={{ padding: "20px", maxWidth: 800, margin: "0 auto" }}>
        <Result
          icon={
            <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 72 }} />
          }
          status="success"
          title="Payment Successful!"
          subTitle="Your booking has been confirmed and payment recorded."
          extra={[
            <Button
              type="primary"
              key="bookings"
              size="large"
              onClick={() => navigate("/my-bookings")}
            >
              View My Bookings
            </Button>,
            <Button key="home" size="large" onClick={() => navigate("/")}>
              Back to Home
            </Button>,
          ]}
        />

        {verificationData && (
          <Card title="Booking Details" style={{ marginTop: 24 }}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Booking ID">
                {verificationData.bookingId}
              </Descriptions.Item>
              <Descriptions.Item label="Amount Paid">
                ${verificationData.amount}
              </Descriptions.Item>
              <Descriptions.Item label="Payment Status">
                <span style={{ color: "#52c41a", fontWeight: "bold" }}>
                  CONFIRMED
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Stripe Session">
                {verificationData.sessionId}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
      </div>
    );
  }

  // Error states
  if (paymentStatus === "failed" || paymentStatus === "error") {
    return (
      <div style={{ padding: "20px", maxWidth: 600, margin: "0 auto" }}>
        <Result
          icon={
            <CloseCircleOutlined style={{ color: "#ff4d4f", fontSize: 72 }} />
          }
          status="error"
          title="Payment Verification Failed"
          subTitle={error || "There was an issue verifying your payment."}
          extra={[
            <Button
              type="primary"
              key="retry"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>,
            <Button key="support" onClick={() => navigate("/contact")}>
              Contact Support
            </Button>,
          ]}
        />
      </div>
    );
  }

  // Invalid session
  return (
    <div style={{ padding: "20px", maxWidth: 600, margin: "0 auto" }}>
      <Alert
        message="Invalid Payment Session"
        description="No valid payment session found. Please start the booking process again."
        type="warning"
        showIcon
        action={
          <Button size="small" onClick={() => navigate("/")}>
            Go Home
          </Button>
        }
      />
    </div>
  );
};

export default PaymentSuccess;
