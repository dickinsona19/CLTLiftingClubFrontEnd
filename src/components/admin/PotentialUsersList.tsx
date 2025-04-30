import { useEffect, useState } from 'react';
import { Table, Input, Space, Tag, Tooltip, Button } from 'antd';
import styled from 'styled-components';
import { Search, CheckCircle, XCircle, Copy } from 'lucide-react';
import { useAdminStore } from '../../contexts/AdminContext';
import { message } from 'antd';

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

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ReferralCode = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const PotentialUsersList = (props) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const setSelectedUser = useAdminStore((state) => state.setSelectedUser);


  const usedFreePass = async (userId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`https://boss-lifting-club-api.onrender.com/api/potential-users/${userId}/free-pass`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      const data = await response.json();
      console.log('User status updated:', data);
      message.success('User status updated successfully');
    } catch (error) {
      console.error('Error updating user status:', error);
      message.error('Failed to update user status');
    }
    
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://boss-lifting-club-api.onrender.com/api/potential-users');
        const data = await response.json();
        console.log(data)
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [loading]);

  const handleCopyReferralCode = (e: React.MouseEvent, code: string) => {
    e.stopPropagation(); // Prevent the row click event
    navigator.clipboard.writeText(code)
      .then(() => message.success('Referral code copied to clipboard!'))
      .catch(() => message.error('Failed to copy referral code'));
  };

  const getEligibilityStatus = (user: any) => {
    const issues = [];
    
    if (!user.waiverSignature) {
      issues.push('Waiver not signed');
    }
    if (!user.over18) {
      issues.push('Under 18');
    }
    if (user.hasReddemedFreePass) {
      issues.push('Not eligible');
    }

    if (issues.length === 0) {
      return (
        <StatusIcon>
          <CheckCircle color="green" size={16} />
          <span style={{ color: 'green' }}>Eligible</span>
        </StatusIcon>
      );
    }

    return (
      <Tooltip title={issues.join(', ')}>
        <StatusIcon>
          <XCircle color="red" size={16} />
          <span style={{ color: 'red' }}>Issues Found</span>
        </StatusIcon>
      </Tooltip>
    );
  };

  const columns = [
    {
      title: 'Photo',
      key: 'photo',
      width: 60,
      render: (text: any, record: any) => (
        <UserAvatar 
          src={record.profilePictureUrl || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=100'} 
          alt={`${record.firstName} ${record.lastName}`} 
        />
      ),
    },
    {
      title: 'Name',
      key: 'name',
      render: (text: any, record: any) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Used Free Pass',
      render: (text: any, record: any) => (
        <>
          {record.hasReddemedFreePass ? 'Yes' : 'No'}
          {!record.hasReddemedFreePass && <Button onClick={()=>{usedFreePass(record.id)}} size="small" style={{ marginLeft: '8px' }}>Used Free Pass</Button>}
        </>
      ),
      key: 'membershipName',
    },
    {
      title: 'Signed Waiver',
      key: 'referralCode',
      render: (text: any, record: any) => (
        <ReferralCode onClick={(e) => handleCopyReferralCode(e, record.referralCode)}>
          <span>{record.waiverSignature ? "True": "False"}</span>

        </ReferralCode>
      ),
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
            onClick: () => {
              console.log(record)
            },
          })}
        />
      </TableContainer>
    </Space>
  );
};

export default PotentialUsersList;