import { useEffect, useState } from 'react';
import { Table, Input, Space } from 'antd';
import styled from 'styled-components';
import { Search } from 'lucide-react';
import { useAdminStore } from '../../contexts/AdminContext';

const TableContainer = styled.div`
  .ant-table {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }

  .ant-table-thead > tr > th {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
  }

  .ant-table-tbody > tr:hover > td {
    background: rgba(255, 255, 255, 0.1) !important;
  }

  .ant-table-row {
    cursor: pointer;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 1rem;

  .ant-input-affix-wrapper {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    input {
      background: transparent;
      color: white;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    .anticon {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

const UsersList = (props) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const setSelectedUser = useAdminStore((state) => state.setSelectedUser);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://boss-lifting-club-api.onrender.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (text: any, record: any) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Membership',
      dataIndex: 'membershipName',
      key: 'membershipName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const filteredUsers = users.filter((user) => {
    const searchLower = searchText.toLowerCase();
    return (
      user.firstName?.toLowerCase().includes(searchLower) ||
      user.lastName?.toLowerCase().includes(searchLower) ||
      user.phoneNumber?.toLowerCase().includes(searchLower) ||
      user.membershipName?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <SearchContainer>
        <Input
          prefix={<Search size={16} />}
          placeholder="Search users..."
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
      </SearchContainer>
      <TableContainer>
        <Table
          columns={columns}
          dataSource={filteredUsers}
          loading={loading}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => {setSelectedUser(record); props.setKeyValue('2')},
          })}
        />
      </TableContainer>
    </Space>
  );
};

export default UsersList;