import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import styled from 'styled-components';
import { useAdminStore } from '../../contexts/AdminContext';
import UsersList from './UsersList';
import UserDetails from './UserDetails';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #1a1a1a;
  color: white;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: white;
  margin-bottom: 0.5rem;
`;

const UserCount = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  span {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
  }
  
  label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    display: block;
  }
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 2rem;
    
    &::before {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  .ant-tabs-tab {
    color: rgba(255, 255, 255, 0.7);
    
    &:hover {
      color: white;
    }
  }

  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: white !important;
    }
  }

  .ant-tabs-ink-bar {
    background: white;
  }
`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, selectedUser } = useAdminStore();
  const [keyValue, setKeyValue] = useState('1');
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch('https://boss-lifting-club-api.onrender.com/users');
        const data = await response.json();
        setTotalUsers(data.length);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTotalUsers();
  }, []);

  if (!user) {
    return null;
  }

  const onChange = (key: string) => {
    setKeyValue(key);
  };

  const items = [
    {
      key: '1',
      label: 'Users',
      children: <UsersList setKeyValue={setKeyValue} />,
    },
    {
      key: '2',
      label: 'User Details',
      children: <UserDetails setKeyValue={setKeyValue} />,
      disabled: !selectedUser,
    },
  ];

  return (
    <DashboardContainer>
      <Header>
        <Title>Admin Dashboard</Title>
        <UserCount>
          <label>Total Users</label>
          <span>{totalUsers}</span>
        </UserCount>
      </Header>
      <StyledTabs items={items} activeKey={keyValue} onChange={onChange}/>
    </DashboardContainer>
  );
};

export default AdminDashboard;