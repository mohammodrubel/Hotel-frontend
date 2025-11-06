
import { Table, Button, Select, message, Space, Tag } from 'antd';
import { UserOutlined, CrownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useAllUsersQuery } from '../redux/features/user/userApi';

const UserManagementTable = () => {
 const { data } = useAllUsersQuery()

  const [loading, setLoading] = useState(false);

  const handleRoleChange = async (userId, newRole) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user role in state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, role: newRole, updatedAt: new Date().toISOString() }
            : user
        )
      );
      
      message.success(`Role updated to ${newRole} successfully!`);
    } catch (error) {
      message.error('Failed to update role');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <span>{text}</span>
          {record.role === 'ADMIN' && <CrownOutlined style={{ color: '#ffc107' }} />}
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag 
          color={role === 'ADMIN' ? 'gold' : 'blue'}
          icon={role === 'ADMIN' ? <CrownOutlined /> : <UserOutlined />}
        >
          {role}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'is_deleted',
      key: 'status',
      render: (isDeleted) => (
        <Tag color={isDeleted ? 'red' : 'green'}>
          {isDeleted ? 'Deleted' : 'Active'}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Select
            defaultValue={record.role}
            style={{ width: 100 }}
            onChange={(value) => handleRoleChange(record.id, value)}
            loading={loading}
            options={[
              { value: 'USER', label: 'User' },
              { value: 'ADMIN', label: 'Admin' },
            ]}
          />
        </Space>
      ),
    },
  ];
console.log(data)
  return (
    <div style={{ padding: '20px' }}>
      <h2>User Management</h2>
      <Table 
        columns={columns} 
        dataSource={data?.data} 
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} users`,
        }}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default UserManagementTable;