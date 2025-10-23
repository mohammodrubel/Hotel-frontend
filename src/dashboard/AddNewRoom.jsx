import React, { useState } from "react";
import {
  Select,
  Upload,
  Switch,
  Button,
  Form,
  Input,
  InputNumber,
  Spin,
  message,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useGetAllHotelQuery } from "../redux/features/hotel/hotelApi";
import { useAddNewRoomMutation } from "../redux/features/room/roomApi";
import { toast } from "sonner";

const roomTypeOptions = [
  { label: "Single", value: "SINGLE" },
  { label: "Double", value: "DOUBLE" },
  { label: "Deluxe", value: "DELUXE" },
  { label: "Suite", value: "SUITE" },
];

function DashboardRooms() {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addNewRoom] = useAddNewRoomMutation();

  // Hotel data query with loading state
  const { data, isLoading: hotelsLoading } = useGetAllHotelQuery([
    {
      name: "limit",
      value: 1000,
    },
    {
      name: "page",
      value: 1,
    },
  ]);

  const hotelOptions =
    data?.data?.map((item) => ({ label: item?.name, value: item?.id })) || [];

  const onChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

const handleSubmit = async (values) => {
  setLoading(true);

  const formData = new FormData();

  const payload = {
    hotelId: values.hotelId,
    type: values.type,
    pricePerNight: values.pricePerNight,
    capacity: values.capacity,
    available: values.available,
    amenities: Array.isArray(values.amenities)
      ? values.amenities
      : values.amenities.split(",").map((item) => item.trim()), // 👈 handles "rubel, hasan" input
  };

  formData.append("data", JSON.stringify(payload));

  fileList.forEach((file) => {
    formData.append("file", file.originFileObj);
  });

  try {
    const response = await addNewRoom(formData).unwrap();
    if(response.success){
      toast.success(response?.message)
    }
    form.resetFields();
    setFileList([]);
  } catch (error) {
    if(error?.data?.message){
      toast.error(error?.data?.message)
    }
    console.log()
  } 
};

  const [form] = Form.useForm();

  // Show loading spinner when hotels are loading
  if (hotelsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add New Room
        </h2>

        <Spin spinning={loading} tip="Adding room...">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-4"
            initialValues={{
              available: true,
              capacity: 1,
              pricePerNight: 0,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Available */}
              <Form.Item
                label="Available"
                name="available"
                valuePropName="checked"
                className="mb-0"
              >
                <Switch />
              </Form.Item>

              {/* Price Per Night */}
              <Form.Item
                label="Price Per Night"
                name="pricePerNight"
                rules={[{ required: true, message: "Enter price per night" }]}
                className="mb-0"
              >
                <InputNumber
                  min={0}
                  className="!w-full"
                  placeholder="Enter price per night"
                  prefix="$"
                />
              </Form.Item>

              {/* Capacity */}
              <Form.Item
                label="Capacity"
                name="capacity"
                rules={[{ required: true, message: "Enter room capacity" }]}
                className="mb-0"
              >
                <InputNumber
                  min={1}
                  max={10}
                  className="!w-full"
                  placeholder="Enter room capacity"
                />
              </Form.Item>
            </div>

            {/* Location */}
            <Form.Item
              label="Location"
              name="location"
              rules={[
                { required: true, message: "Enter room location/address" },
              ]}
            >
              <Input placeholder="Enter room location/address" />
            </Form.Item>

            {/* Hotel Selection */}
            <Form.Item
              label="Select Hotel"
              name="hotelId"
              rules={[{ required: true, message: "Please select a hotel" }]}
            >
              <Select
                className="w-full"
                options={hotelOptions}
                placeholder="Select Hotel"
                loading={hotelsLoading}
                showSearch
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>

            {/* Room Type */}
            <Form.Item
              label="Room Type"
              name="type"
              rules={[{ required: true, message: "Please select a room type" }]}
            >
              <Select
                className="w-full"
                options={roomTypeOptions}
                placeholder="Select room type"
              />
            </Form.Item>

            {/* Amenities */}
            <Form.Item
              label="Amenities"
              name="amenities"
              rules={[
                { required: true, message: "Enter at least one amenity" },
              ]}
              tooltip="Type amenities and press Enter or comma to add multiple"
            >
              <Select
                mode="tags"
                tokenSeparators={[","]}
                placeholder="Type amenities and press Enter or comma"
                className="w-full"
              />
            </Form.Item>

            {/* Upload Images */}
            <Form.Item
              label="Upload Room Images"
              rules={[
                {
                  required: true,
                  validator: () => {
                    if (fileList.length === 0) {
                      return Promise.reject(
                        new Error("Please upload at least one image")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={() => false} // Prevent auto upload
                accept="image/*"
                multiple
              >
                {fileList.length < 3 ? "+ Upload" : null}
              </Upload>
              <div className="text-xs text-gray-500 mt-1">
                Upload up to 5 images (Recommended)
              </div>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full py-4 text-base font-semibold h-auto"
                loading={loading}
                disabled={loading}
              >
                {loading ? "Adding Room..." : "Add New Room"}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </div>
  );
}

export default DashboardRooms;
