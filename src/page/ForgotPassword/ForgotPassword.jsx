// src/components/ForgotPassword.jsx
import React from "react";
import { Form, Input, Button, Card } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "../../redux/features/auth/authApi";
import Navbar from "../../components/Navigation";
import Footer from "../../components/Footer";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [forgotEmail, { isLoading }] = useForgotPasswordMutation();

  const onFinish = async (values) => {
    console.log(values);

    try {
      const res = await forgotEmail(values).unwrap();

      if (res.success) {
        toast.success(res.message || "Password reset link sent to your email!");
        form.resetFields(); // Clear the form after successful submission
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error(
        error?.data?.message || "Failed to send reset link. Please try again."
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Forgot Password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          <Card className="mt-8">
            <Form
              form={form}
              name="forgotPassword"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="on"
              size="large"
              className="p-6"
            >
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="Enter your email"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-12 text-lg font-semibold"
                  loading={isLoading}
                >
                  {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
                </Button>
              </Form.Item>

              <div className="text-center text-sm text-gray-600">
                Remember your password?{" "}
                <a
                  href="/login"
                  className="text-blue-600 hover:underline font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                >
                  Sign in
                </a>
              </div>
            </Form>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
