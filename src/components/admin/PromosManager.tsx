import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Space, Tag, Collapse } from 'antd';
import { PlusCircle, Trash2, Building, Users, Gift, Eye, QrCode } from 'lucide-react';
import styled from 'styled-components';

const Container = styled.div`
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ActionButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    border-color: rgba(255, 255, 255, 0.3) !important;
    color: white !important;
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: #2a2a2a;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .ant-modal-header {
    background: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .ant-modal-title {
    color: white;
  }

  .ant-modal-close-x {
    color: white;
  }

  .ant-form-item-label > label {
    color: white;
  }

  .ant-input {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    color: white !important;

    &:hover, 
    &:focus {
      border-color: rgba(255, 255, 255, 0.3) !important;
      background: rgba(255, 255, 255, 0.05) !important;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.5) !important;
    }
  }
`;

const UsersList = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    margin-bottom: 0;
  }
`;

const UserInfo = styled.div`
  color: rgba(255, 255, 255, 0.9);
  
  .name {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .details {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const PromoCode = styled.span`
  font-family: 'Courier New', monospace;
  background: rgba(59, 130, 246, 0.2);
  color: #60A5FA;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid rgba(59, 130, 246, 0.3);
`;

interface Business {
  id: string;
  name: string;
  promoCode: string;
  recruitedUsers: User[];
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  membershipName: string;
  createdAt: string;
}

const PromosManager = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  // Mock API URL - replace with your actual API endpoint
  const API_URL = 'https://boss-lifting-club-api.onrender.com/api/promos';

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBusinesses(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      message.error('Failed to load businesses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBusiness = async (values: { name: string; promoCode: string }) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          codeToken: values.promoCode.toUpperCase(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add business');
      }

      message.success('Business added successfully');
      form.resetFields();
      setIsModalVisible(false);
      fetchBusinesses(); // Recall fetchBusinesses to update the list
    } catch (error) {
      console.error('Error adding business:', error);
      message.error('Failed to add business');
    }
  };
  const handleQRCode = async (promoCode: string) => {
    try {
      const response = await fetch(`${API_URL}/api/promos/generate-qr?comingFrom=${promoCode}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to generate QR code');
      }
      const data = await response.json();
      console.log('QR code URL:', data.url);
      // Optionally open the URL in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error generating QR code:', error);
      message.error('Failed to generate QR code');
    }
  };

  const handleDeleteBusiness = async (businessId: string) => {
    try {
      const response = await fetch(`${API_URL}/${businessId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete business');
      }
      setBusinesses(businesses.filter(b => b.id !== businessId));
      message.success('Business deleted successfully');
    } catch (error) {
      console.error('Error deleting business:', error);
      message.error('Failed to delete business');
    }
  };

  const toggleExpanded = (businessId: string) => {
    setExpandedRows(prev => 
      prev.includes(businessId) 
        ? prev.filter(id => id !== businessId)
        : [...prev, businessId]
    );
  };

  const columns = [
    {
      title: 'Business Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Building size={16} />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Promo Code',
      dataIndex: 'codeToken',
      key: 'codeToken',
      render: (code: string) => <PromoCode>{code}</PromoCode>,
    },
    {
      title: 'Recruited Users',
      key: 'recruitedCount',
      render: (_, record: Business) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={16} />
          <span>{record.users.length}</span>
        </div>
      ),
    }, {
        title: 'Free Passes ',
        key: 'freePasses',
        render: (_, record: Business) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={16} />
            <span>{record.freePassCount}</span>
          </div>
        ),
      },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Business) => (
        <Space>
          <Button
            icon={<Eye size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              toggleExpanded(record.id);
            }}
            size="small"
          >
            {expandedRows.includes(record.id) ? 'Hide' : 'View'} Users
          </Button>
          <Button
            icon={<QrCode size={16} />}
            onClick={(e) => {
              handleQRCode(record.promoCode);
            }}

            size="small"
          >
            Get Qr Code
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this business?"
            onConfirm={(e) => {
              e?.stopPropagation();
              handleDeleteBusiness(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              icon={<Trash2 size={16} />} 
              size="small"
              onClick={(e) => e.stopPropagation()}
            />
          </Popconfirm>

         
        </Space>
      ),
    },
  ];

  const expandedRowRender = (record: Business) => {
    if (!expandedRows.includes(record.id)) return null;

    return (
      <UsersList>
        <h4 style={{ color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={18} />
          Recruited Users ({record.users.length})
        </h4>
        {record.users.length === 0 ? (
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', margin: '2rem 0' }}>
            No users recruited yet
          </p>
        ) : (
          record.users.map((user) => (
            <UserItem key={user.id}>
              <UserInfo>
                <div className="name">{user.firstName} {user.lastName}</div>
                <div className="details">
                  {user.email} • {user.phoneNumber} • {user.membershipName}
                </div>
              </UserInfo>
              <Tag color="blue">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </Tag>
            </UserItem>
          ))
        )}
      </UsersList>
    );
  };

  return (
    <Container>
      <Header>
        <Title>
          <Gift size={24} />
          Business Promos
        </Title>
        <ActionButton
          icon={<PlusCircle size={16} />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Business
        </ActionButton>
      </Header>

      <Table
        columns={columns}
        dataSource={businesses}
        loading={loading}
        rowKey="id"
        expandable={{
          expandedRowRender,
          showExpandColumn: false,
          expandedRowKeys: expandedRows,
        }}
        onRow={(record) => ({
          onClick: () => toggleExpanded(record.id),
        })}
      />

      <StyledModal
        title="Add New Business"
        open={isModalVisible}
        onOk={form.submit}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        okText="Add Business"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddBusiness}
        >
          <Form.Item
            name="name"
            label="Business Name"
            rules={[{ required: true, message: 'Please enter business name' }]}
          >
            <Input placeholder="Enter business name" />
          </Form.Item>

          <Form.Item
            name="promoCode"
            label="Promo Code"
            rules={[
              { required: true, message: 'Please enter promo code' },
              { min: 3, message: 'Promo code must be at least 3 characters' },
              { max: 20, message: 'Promo code must be less than 20 characters' }
            ]}
          >
            <Input 
              placeholder="Enter promo code" 
              style={{ textTransform: 'uppercase' }}
              onChange={(e) => {
                const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                form.setFieldsValue({ promoCode: value });
              }}
            />
          </Form.Item>
        </Form>
      </StyledModal>
    </Container>
  );
};

export default PromosManager;