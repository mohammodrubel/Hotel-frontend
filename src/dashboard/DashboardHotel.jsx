import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  Upload,
  Card,
  Image,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import {
  useGetAllHotelQuery,
  useDeleteHotelMutation,
  useUpdateHotelMutation,
} from "../redux/features/hotel/hotelApi";

const { TextArea } = Input;

const DashboardHotel = () => {
  const { data: hotelsData, isLoading, refetch } = useGetAllHotelQuery();
  const [deleteHotel] = useDeleteHotelMutation();
  const [updateHotel, { isLoading: updating }] = useUpdateHotelMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [existingImage, setExistingImage] = useState(null);

  const hotels = hotelsData?.data || [];

  // Delete hotel
  const handleDelete = async (id) => {
    try {
      const res = await deleteHotel(id).unwrap();
      toast.success(res?.message || "Hotel deleted successfully!");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete hotel!");
    }
  };

  // Open edit modal
  const handleEdit = (record) => {
    setEditingHotel(record);
    form.setFieldsValue({
      name: record.name,
      location: record.location,
      description: record.description,
    });

    // Show existing image
    setExistingImage(record.images || null);
    setFileList([]);
    setIsModalOpen(true);
  };

  // Upload config
  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Only image files allowed!");
        return Upload.LIST_IGNORE;
      }
      setFileList([file]);
      return false; // prevent auto upload
    },
    onRemove: () => setFileList([]),
    fileList,
    listType: "picture-card",
    maxCount: 1,
  };

  // Update hotel - FIXED VERSION
  const handleUpdate = async (values) => {
    try {
      // Create FormData to handle file upload
      const formData = new FormData();

      // Append the form data as JSON string (matching your backend expectation)
      formData.append(
        "data",
        JSON.stringify({
          name: values.name,
          location: values.location,
          description: values.description,
        })
      );

      // Append the file if a new one is selected
      if (fileList.length > 0) {
        formData.append("file", fileList[0]);
      }

      const res = await updateHotel({
        id: editingHotel.id,
        data: formData, // Send FormData object
      }).unwrap();

      toast.success(res?.message || "Hotel updated successfully!");
      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
      setExistingImage(null);
      setEditingHotel(null);
      refetch();
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error?.data?.message || "Failed to update hotel!");
    }
  };

  // Close modal handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingHotel(null);
    setFileList([]);
    setExistingImage(null);
    form.resetFields();
  };

  // Table columns
  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (url) => (
        <Image
          src={url}
          alt="hotel"
          width={80}
          height={60}
          style={{ objectFit: "cover", borderRadius: 8 }}
        />
      ),
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="primary"
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete this hotel?"
            description="Are you sure you want to delete this hotel?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card
        title="Manage Hotels"
        className="shadow-md rounded-xl overflow-hidden"
      >
        <Table
          columns={columns}
          dataSource={hotels}
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>

      {/* Edit Modal */}
      <Modal
        title="Update Hotel"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
          autoComplete="off"
        >
          <Form.Item label="Hotel Image">
            <Upload {...uploadProps}>
              {fileList.length >= 1 ? null : (
                <div className="!mx-auto !text-center">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>

            {/* Show existing image preview */}
            {!fileList.length && existingImage && (
              <div style={{ marginTop: 16 }}>
                <p>Current Image:</p>
                <Image
                  src={existingImage}
                  alt="hotel"
                  width={100}
                  height={80}
                  style={{ objectFit: "cover", borderRadius: 8, marginTop: 8 }}
                />
              </div>
            )}
          </Form.Item>

          <Form.Item
            label="Hotel Name"
            name="name"
            rules={[{ required: true, message: "Please enter hotel name!" }]}
          >
            <Input placeholder="Enter hotel name" size="large" />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please enter location!" }]}
          >
            <Input placeholder="Enter location" size="large" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description!" }]}
          >
            <TextArea rows={3} placeholder="Enter hotel description" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={updating}>
                Update Hotel
              </Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DashboardHotel;
