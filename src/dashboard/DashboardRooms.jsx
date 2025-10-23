import React from "react";
import { Table, Tag, Image, Switch, Dropdown, Button, Spin } from "antd";
import { DownOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetAllRoomsQuery } from "../redux/features/room/roomApi";

const RoomsTable = () => {
  const { data, isLoading } = useGetAllRoomsQuery();

  const handleEdit = (record) => {
    console.log("Edit:", record);
  };

  const handleDelete = (record) => {
    console.log("Delete:", record);
  };

  const actionMenu = (record) => [
    {
      key: "edit",
      label: (
        <span onClick={() => handleEdit(record)}>
          <EditOutlined /> Edit
        </span>
      ),
    },
    {
      key: "delete",
      label: (
        <span onClick={() => handleDelete(record)}>
          <DeleteOutlined /> Delete
        </span>
      ),
    },
  ];

  const columns = [
    {
      title: "Hotel Name",
      dataIndex: ["hotel", "name"],
      key: "hotelName",
      align: "center",
      width: 200,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      width: 120,
    },
    {
      title: "Price Per Night",
      dataIndex: "pricePerNight",
      key: "pricePerNight",
      render: (price) => `$${price}`,
      align: "center",
      width: 150,
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      align: "center",
      width: 100,
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      render: (available) => <Switch checked={available} disabled />,
      align: "center",
      width: 120,
    },
    {
      title: "Amenities",
      dataIndex: "amenities",
      key: "amenities",
      render: (amenities) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {amenities?.map((item) => (
            <Tag color="blue" key={item} style={{ margin: 2 }}>
              {item}
            </Tag>
          ))}
        </div>
      ),
      align: "center",
      width: 250,
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) => <Image width={50} src={images?.[0]} />,
      align: "center",
      width: 100,
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Dropdown menu={{ items: actionMenu(record) }} trigger={["click"]}>
          <Button>
            Actions <DownOutlined />
          </Button>
        </Dropdown>
      ),
      width: 150,
    },
  ];

  return (
    <Spin spinning={isLoading}>
      <Table
        rowKey="id"
        dataSource={data?.data?.data || []}
        columns={columns}
        scroll={{ x: 1200 }} // horizontal scroll enabled
      />
    </Spin>
  );
};

export default RoomsTable;
