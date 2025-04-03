import { Card, Descriptions, Space, Tag, Button } from 'antd';
import styled from 'styled-components';
import { useAdminStore } from '../../contexts/AdminContext';
import { ArrowLeft } from 'lucide-react';

const DetailsContainer = styled.div`
  .ant-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }

  .ant-card-head {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
  }

  .ant-descriptions-item-label {
    color: rgba(255, 255, 255, 0.7);
  }

  .ant-descriptions-item-content {
    color: white;
  }
`;

const BackButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    border-color: rgba(255, 255, 255, 0.3) !important;
    color: white !important;
  }
`;

const UserDetails = (props) => {
  const { selectedUser, setSelectedUser } = useAdminStore();

  console.log(selectedUser)
  if (!selectedUser) {
    return null;
  }

  return (
    <DetailsContainer>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <BackButton onClick={() => props.setKeyValue('1')}>
          <ArrowLeft size={16} />
          Back to Users
        </BackButton>

        <Card title="User Information">
          <Descriptions column={2}>
            <Descriptions.Item label="First Name">{selectedUser.firstName}</Descriptions.Item>
            <Descriptions.Item label="Last Name">{selectedUser.lastName}</Descriptions.Item>
            <Descriptions.Item label="Phone">{selectedUser.phoneNumber}</Descriptions.Item>
            <Descriptions.Item label="Membership">
              <Tag color="blue">{selectedUser.membershipName}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={selectedUser.status === 'active' ? 'green' : 'red'}>
                {selectedUser.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(selectedUser.createdAt).toLocaleDateString()}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="Membership Details">
          <Descriptions column={2}>
            <Descriptions.Item label="Contract Type">
              {selectedUser.contractType || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Monthly Fee">
              ${selectedUser.monthlyFee || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Next Billing Date">
              {selectedUser.nextBillingDate ? 
                new Date(selectedUser.nextBillingDate).toLocaleDateString() : 
                'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Last Payment">
              {selectedUser.lastPaymentDate ? 
                new Date(selectedUser.lastPaymentDate).toLocaleDateString() : 
                'N/A'}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {selectedUser.referralCode && (
          <Card title="Referral Information">
            <Descriptions column={1}>
              <Descriptions.Item label="Referral Code">
                {selectedUser.referralCode}
              </Descriptions.Item>
              <Descriptions.Item label="Referred Members">
                {selectedUser.referredMembersDto.length > 0 ? (
                  <div>
                    {selectedUser.referredMembersDto.map((member, index) => (
                      <p key={index}>{member.firstName} {member.lastName}</p>
                    ))}
                  </div>
                ) : (
                  <p>N/A</p>
                )}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
      </Space>
    </DetailsContainer>
  );
};

export default UserDetails;