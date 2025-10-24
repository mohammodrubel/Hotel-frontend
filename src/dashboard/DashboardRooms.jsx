import React, { useState, useEffect } from "react";
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
  Modal,
  Table,
  Space,
} from "antd";
import {
  LoadingOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useGetAllHotelQuery } from "../redux/features/hotel/hotelApi";

import { toast } from "sonner";
import { useDeleteRoomMutation, useGetAllRoomsQuery, useUpdateRoomMutation } from "../redux/features/room/roomApi";

const roomTypeOptions = [
  { label: "Single", value: "SINGLE" },
  { label: "Double", value: "DOUBLE" },
  { label: "Deluxe", value: "DELUXE" },
  { label: "Suite", value: "SUITE" },
];

function DashboardRooms() {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [updateRoom] = useUpdateRoomMutation();
  const [deleteRoom] = useDeleteRoomMutation();

  // Hotel data query
  const { data: hotelsData, isLoading: hotelsLoading } = useGetAllHotelQuery([
    {
      name: "limit",
      value: 1000,
    },
    {
      name: "page",
      value: 1,
    },
  ]);

  // Rooms data query
  const {
    data: roomsData,
    isLoading: roomsLoading,
    refetch: refetchRooms,
  } = useGetAllRoomsQuery([
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
    hotelsData?.data?.map((item) => ({ label: item?.name, value: item?.id })) ||
    [];

  const rooms = roomsData?.data?.data || [];

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



  const handleUpdate = async (values) => {
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
        : values.amenities.split(",").map((item) => item.trim()),
    };

    formData.append("data", JSON.stringify(payload));

    // Only append new files if they exist
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("file", file.originFileObj);
      }
    });

    try {
      const response = await updateRoom({
        id: editingRoom.id,
        data: formData,
      }).unwrap();

      if (response.success) {
        toast.success(response?.message);
        refetchRooms();
        handleCloseModal();
      }
    } catch (error) {
      if (error?.data?.message) {
        toast.error(error?.data?.message);
      }
      console.error("Error updating room:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (roomId) => {
   
   
        try {
          const response = await deleteRoom(roomId).unwrap();
          if (response.success) {
            toast.success(response?.message);
            refetchRooms();
          }
        } catch (error) {
          if (error?.data?.message) {
            toast.error(error?.data?.message);
          }
          console.error("Error deleting room:", error);
        }
    
    
  };

  const handleEdit = (room) => {
    console.log("Editing room:", room); // Debug log
    setEditingRoom(room);
    setIsModalOpen(true);

    // Set form values for editing
    form.setFieldsValue({
      hotelId: room.hotelId,
      type: room.type,
      pricePerNight: room.pricePerNight,
      capacity: room.capacity,
      available: room.available,
      amenities: room.amenities,
      location: room.location,
    });

    // Set existing images to fileList
    if (room.images && room.images.length > 0) {
      const existingFiles = room.images.map((image, index) => ({
        uid: `-${index}`,
        name: `image-${index}.jpg`,
        status: "done",
        url: image,
      }));
      setFileList(existingFiles);
    } else {
      setFileList([]);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRoom(null);
    setFileList([]);
    form.resetFields();
  };

  const [form] = Form.useForm();

  // Table columns
  const columns = [
    {
      title: "Room Type",
      dataIndex: "type",
      key: "type",
      render: (type) =>
        roomTypeOptions.find((opt) => opt.value === type)?.label || type,
    },
    {
      title: "Price/Night",
      dataIndex: "pricePerNight",
      key: "pricePerNight",
      render: (price) => `$${price}`,
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      render: (available) => (
        <span style={{ color: available ? "#52c41a" : "#ff4d4f" }}>
          {available ? "Yes" : "No"}
        </span>
      ),
    },
    {
      title: "Amenities",
      dataIndex: "amenities",
      key: "amenities",
      render: (amenities) => (
        <span
          title={Array.isArray(amenities) ? amenities.join(", ") : amenities}
        >
          {Array.isArray(amenities)
            ? amenities.length > 2
              ? `${amenities.slice(0, 2).join(", ")}...`
              : amenities.join(", ")
            : amenities}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            size="small"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Show loading spinner when hotels are loading
  if (hotelsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
      
        {/* Rooms Table */}
        <div className="bg-white p-8 rounded-2xl shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">All Rooms</h2>
            <Button
              type="primary"
              onClick={refetchRooms}
              loading={roomsLoading}
            >
              Refresh
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={rooms}
            rowKey="id"
            loading={roomsLoading}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 800 }}
          />
        </div>
      </div>

      {/* Edit Room Modal */}
      <Modal
        title={`Edit Room - ${editingRoom?.type || "Room"}`}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
        destroyOnClose
      >
        <Spin spinning={loading} tip="Updating room...">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdate}
            className="space-y-4 mt-4"
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
              label="Room Images"
              tooltip="Existing images will be kept. Upload new ones to add or replace."
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={() => false}
                accept="image/*"
                multiple
              >
                {fileList.length < 5 ? "+ Upload" : null}
              </Upload>
              <div className="text-xs text-gray-500 mt-1">
                Upload up to 5 images. Existing images are shown above.
              </div>
            </Form.Item>

            {/* Update Button */}
            <Form.Item className="mb-0">
              <div className="flex gap-4">
                <Button onClick={handleCloseModal} className="flex-1 py-3">
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="flex-1 py-3 text-base font-semibold h-auto"
                  loading={loading}
                  disabled={loading}
                >
                  {loading ? "Updating Room..." : "Update Room"}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
}

export default DashboardRooms;
