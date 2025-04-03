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
`;

const Title = styled.h1`
  font-size: 2rem;
  color: white;
  margin-bottom: 0.5rem;
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

  useEffect(() => {
    if (!user) {
      navigate('/admin');
    }
  }, [user, navigate]);

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
      children: <UserDetails setKeyValue={setKeyValue}  />,
      disabled: !selectedUser,
    },
  ];

  return (
    <DashboardContainer>
      <Header>
        <Title>Admin Dashboard</Title>
      </Header>
      <StyledTabs items={items} activeKey={keyValue} onChange={onChange}/>
    </DashboardContainer>
  );
};

export default AdminDashboard;