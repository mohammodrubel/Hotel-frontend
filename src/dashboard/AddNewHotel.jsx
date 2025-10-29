import React, { useState } from "react";
import { Form, Input, Button, Upload, message, Card, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAddNewHotelMutation } from "../redux/features/hotel/hotelApi";
import { toast } from "sonner";

const { TextArea } = Input;

const AddNewHotel = () => {
  const [addNewHotel] = useAddNewHotelMutation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ local loading

  // ✅ Upload configuration (single image only)
  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return Upload.LIST_IGNORE;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Image must be smaller than 5MB!");
        return Upload.LIST_IGNORE;
      }

      setFileList([file]); // only one image
      return false; // prevent auto upload
    },
    onRemove: () => setFileList([]),
    fileList,
    listType: "picture-card",
    maxCount: 1,
  };

  const uploadButton = (
    <div className="!mx-auto !text-center">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleAddHotel = async (values) => {
    if (fileList.length === 0) {
      return message.error("Please upload an image!");
    }

    setLoading(true); // ✅ start loading
    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          name: values.name,
          location: values.location,
          description: values.description,
        })
      );
      formData.append("file", fileList[0]);

      const res = await addNewHotel(formData).unwrap();

      if (res?.success) {
        toast.success("Hotel created successfully!");
        form.resetFields();
        setFileList([]);
      } else {
        toast.error(res?.message || "Failed to create hotel");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="p-6">
      <Card
        title="Create New Hotel"
        className="max-w-3xl !mx-auto shadow-md rounded-xl"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddHotel}
          autoComplete="off"
          encType="multipart/form-data"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Hotel Image" name="image">
                <Upload {...uploadProps}>
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Hotel Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter hotel name!" },
                ]}
              >
                <Input placeholder="Enter hotel name" size="large" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: "Please enter location!" }]}
              >
                <Input placeholder="Enter location" size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description!" }]}
          >
            <TextArea rows={4} placeholder="Enter hotel description" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading} // ✅ use local loading
              block
            >
              Create Hotel
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddNewHotel;
