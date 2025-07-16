import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Space, Tag, Modal, Button, Tooltip } from 'antd';
import styled from 'styled-components';
import { useAdminStore } from '../../contexts/AdminContext';
import UsersList from './UsersList';
import UserDetails from './UserDetails';
import ProductsManager from './ProductsManager';
import { CheckCircle, XCircle, LogOut } from 'lucide-react';
import PotentialUsersList from './PotentialUsersList';
import PromosManager from './PromosManager';
import AnalyticsPage from './AnalyticsPage';
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
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: white;
  margin: 0;
`;

const IconButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    border-color: rgba(255, 255, 255, 0.3) !important;
    color: white !important;
  }
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

const SelectedUserBar = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const UserAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: rgba(0, 0, 0, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0;
    overflow: hidden;
  }

  .ant-modal-close {
    color: white;
  }

  .ant-modal-body {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: white;
`;

const UserMetadata = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  display: flex;
  gap: 1rem;
  margin-top: 0.25rem;
`;

const StatusTag = styled(Tag)<{ $type: 'success' | 'error' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: ${props => props.$type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  border: 1px solid ${props => props.$type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  color: ${props => props.$type === 'success' ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'};
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
  const { user, selectedUser, setSelectedUser } = useAdminStore();
  const [keyValue, setKeyValue] = useState('1');
  const [totalUsers, setTotalUsers] = useState(0);
  const [isImagePreviewVisible, setIsImagePreviewVisible] = useState(false);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  
  useEffect(() => {
    let tempBuffer = '';
  
    const handleKeyPress = (e: KeyboardEvent) => {
      tempBuffer = '';
      if (e.key === 'Enter') {
        const scannedCode = tempBuffer.trim();
        console.log('Scanned:', scannedCode);
  
        if (scannedCode) {
          fetch(`https://boss-lifting-club-api.onrender.com/users/barcode/${scannedCode}`)
            .then(res => {
              console.log(res);
              return res.json();
            })
            .then(data => {
              if (data) {
                console.log(data)
                setSelectedUser(data)
              }
            })
            .catch(err => {
              console.error('Error fetching scanned user:', err);
            });
        }
  
        tempBuffer = '';  // Clear buffer after submit.
      } else if (/^[a-zA-Z0-9]$/.test(e.key)) {
        tempBuffer += e.key.toUpperCase();  // Add only valid chars, uppercase.
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  
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
        const activeUsersCount = data.filter(user => user.isInGoodStanding).length;
        setTotalActiveUsers(activeUsersCount);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTotalUsers();
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate('/admin');
  };

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
    {
      key: '3',
      label: 'Products',
      children: <ProductsManager />,
    },
    {
      key: '4',
      label: 'Potential Users',
      children: <PotentialUsersList setKeyValue={setKeyValue} />
    },
    {
      key: '5',
      label: 'Promos',
      children: <PromosManager />,
    },
    {
      key: '6',
      label: 'Analytics',
      children: <AnalyticsPage />,
    }
  ];

  if (!user) {
    return null;
  }

  return (
    <DashboardContainer>
      <Header>
        <HeaderLeft>
          <Title>Admin Dashboard</Title>
          <UserCount>
            <label>Total Users</label>
            <span>{totalUsers}</span>
          </UserCount>
          <UserCount>
            <label>Total Active Users</label>
            <span>{totalActiveUsers}</span>
          </UserCount>
        <Button variant="contained" color="primary" onClick={()=>console.log("HEllo")}>
          Open CLT Lifting Club
        </Button>
        </HeaderLeft>
        <HeaderRight>

          <Tooltip title="Logout">
            <IconButton onClick={handleLogout}>
              <LogOut size={18} />
            </IconButton>
          </Tooltip>
        </HeaderRight>
      </Header>

      {selectedUser && (
        <SelectedUserBar>
          <UserAvatar 
            src={selectedUser.profilePictureUrl|| 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=100'} 
            alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
            onClick={() => setIsImagePreviewVisible(true)}
          />
          <UserInfo>
            <UserName>{selectedUser.firstName} {selectedUser.lastName}</UserName>
            <UserMetadata>
              <span>Member since: {new Date(selectedUser.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>{selectedUser.membershipName}</span>
            </UserMetadata>
          </UserInfo>
          <Space>
            <StatusTag $type={selectedUser.signatureData ? 'success' : 'error'}>
              {selectedUser.signatureData ? <CheckCircle size={14} /> : <XCircle size={14} />}
              Waiver
            </StatusTag>
            <StatusTag $type={selectedUser.over18 ? 'success' : 'error'}>
              {selectedUser.over18 ? <CheckCircle size={14} /> : <XCircle size={14} />}
              Age 18+
            </StatusTag>
            <StatusTag $type={selectedUser.isInGoodStanding ? 'success' : 'error'}>
              {selectedUser.isInGoodStanding ? <CheckCircle size={14} /> : <XCircle size={14} />}
              Eligible
            </StatusTag>
          </Space>
        </SelectedUserBar>
      )}

      <StyledTabs items={items} activeKey={keyValue} onChange={onChange}/>

      <StyledModal
        open={isImagePreviewVisible}
        footer={null}
        onCancel={() => setIsImagePreviewVisible(false)}
        width={800}
        centered
      >
        <PreviewImage
          src={selectedUser?.profilePictureUrl || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=800'}
          alt={`${selectedUser?.firstName} ${selectedUser?.lastName}`}
        />
      </StyledModal>
    </DashboardContainer>
  );
};

export default AdminDashboard;