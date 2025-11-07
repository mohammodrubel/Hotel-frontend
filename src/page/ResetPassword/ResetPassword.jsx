import React from "react";
import { Form, Input, Button, Card } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  // ✅ Get token and email from URL
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [resetPassword] = useResetPasswordMutation();

  console.log(token);

  const onFinish = async (values) => {
    if (!token || !email) {
      toast.error("Invalid or missing reset token/email");
      return;
    }

    setLoading(true);

    try {
      const res = await resetPassword({
        token,
        email,
        newPassword: values.password,
      }).unwrap();

      console.log(res);

      // Show success message
      toast.success(res.message || "Password reset successfully!");

      // Reset form
      form.resetFields();

      // Redirect to login page after successful reset
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error(
        error?.data?.message || "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const passwordRules = [
    { required: true, message: "Please input your password!" },
    { min: 6, message: "Password must be at least 6 characters!" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your new password below.
          </p>
        </div>

        <Card className="mt-8">
          <Form
            form={form}
            name="resetPassword"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
            className="p-6"
          >
            <Form.Item
              name="password"
              label="New Password"
              rules={passwordRules}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter new password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm New Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Confirm new password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-12 text-lg font-semibold"
                loading={loading}
              >
                {loading ? "Resetting Password..." : "Reset Password"}
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
  );
};

export default ResetPassword;
