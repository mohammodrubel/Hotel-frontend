import React, { useState } from "react";
import { Select, Upload, Switch, Button, Form, Input, InputNumber } from "antd";

const roomTypeOptions = [
  { label: "Single", value: "SINGLE" },
  { label: "Double", value: "DOUBLE" },
  { label: "Deluxe", value: "DELUXE" },
  { label: "Suite", value: "SUITE" },
];

function DashboardRooms() {
  const [fileList, setFileList] = useState([]);

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

  const handleSubmit = (values) => {
    const payload = {
      hotelId: "4b3fb114-f005-4874-990d-f57b6710d196",
      type: values.type,
      pricePerNight: values.pricePerNight,
      capacity: values.capacity,
      available: values.available,
      amenities: values.amenities, // array of strings from tags input
      images: fileList.map((f) => f.url || f.originFileObj),
    };

    console.log("Room Payload:", payload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add New Room
        </h2>

        <Form layout="vertical" onFinish={handleSubmit} className="space-y-4">
          <div className="flex justify-between gap-2">
            {/* Available */}
            <Form.Item
              label="Available"
              name="available"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>

            {/* Price Per Night */}
            <Form.Item
              label="Price Per Night"
              name="pricePerNight"
              rules={[{ required: true, message: "Enter price per night" }]}
            >
              <InputNumber
                min={0}
                className="!w-full"
                placeholder="Enter price per night"
              />
            </Form.Item>

            {/* Capacity */}
            <Form.Item
              label="Capacity"
              name="capacity"
              rules={[{ required: true, message: "Enter room capacity" }]}
            >
              <InputNumber
                min={1}
                className="!w-full"
                placeholder="Enter room capacity"
              />
            </Form.Item>
          </div>
          {/* Hotel  */}
          <Form.Item
            label="Select  Hotel"
            name="type"
            rules={[{ required: true, message: "Please select a Hotel type" }]}
          >
            <Select
              className="w-full"
              options={roomTypeOptions}
              placeholder="Select Hotel "
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

          {/* Amenities (Custom Tags Input) */}
          <Form.Item
            label="Amenities"
            name="amenities"
            rules={[{ required: true, message: "Enter amenities" }]}
          >
            <Select
              mode="tags"
              tokenSeparators={[","]}
              placeholder="Type amenities and press Enter"
              className="w-full"
            />
          </Form.Item>

          {/* Upload Images */}
          <Form.Item label="Upload Room Images">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 3 && "+ Upload"}
            </Upload>
          </Form.Item>

          {/* Submit */}
          <Button
            type="primary"
            htmlType="submit"
            className="w-full py-2 text-base"
          >
            Submit Room
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default DashboardRooms;
