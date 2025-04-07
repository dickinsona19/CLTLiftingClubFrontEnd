import { Card, Descriptions, Space, Tag, Button, Input, message } from 'antd';
import styled from 'styled-components';
import { useAdminStore } from '../../contexts/AdminContext';
import { Edit2, Save, X, Copy } from 'lucide-react';
import { useState } from 'react';

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



const EditableField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EditButton = styled(Button)`
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const StyledInput = styled(Input)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 200px;
  color: white;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.1);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ActionButtons = styled(Space)`
  margin-left: 0.5rem;
`;

const ErrorMessage = styled.span`
  color: #ff4d4f;
  font-size: 0.875rem;
  margin-left: 0.5rem;
`;

const ReferralCode = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const UserDetails = (props) => {
  const { selectedUser, setSelectedUser } = useAdminStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedCode, setEditedCode] = useState('');
  const [error, setError] = useState('');

  if (!selectedUser) {
    return null;
  }

  const handleEditClick = () => {
    setEditedCode(selectedUser.referralCode);
    setIsEditing(true);
    setError('');
  };

  const validateReferralCode = (code: string) => {
    if (code.length !== 10) {
      setError('Referral code must be exactly 10 characters');
      return false;
    }
    setError('');
    return true;
  };

  const handleSave = async () => {
    if (!validateReferralCode(editedCode)) {
      return;
    }

    try {
      const response = await fetch(`https://boss-lifting-club-api.onrender.com/users/referralCode/${selectedUser.referralCode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: editedCode,
      });

      if (response.ok) {
        setSelectedUser({ ...selectedUser, referralCode: editedCode });
        message.success('Referral code updated successfully');
        setIsEditing(false);
      } else {
        throw new Error('Failed to update referral code');
      }
    } catch (error) {
      console.error('Error updating referral code:', error);
      message.error('Failed to update referral code');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedCode(selectedUser.referralCode);
    setError('');
  };

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(selectedUser.referralCode)
      .then(() => message.success('Referral code copied to clipboard!'))
      .catch(() => message.error('Failed to copy referral code'));
  };

  return (
    <DetailsContainer>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>


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

        <Card title="Referral Information">
          <Descriptions column={1}>
            <Descriptions.Item label="Referral Code">
              <EditableField>
                {isEditing ? (
                  <>
                    <StyledInput
                      value={editedCode}
                      onChange={(e) => {
                        setEditedCode(e.target.value);
                        validateReferralCode(e.target.value);
                      }}
                      maxLength={10}
                      status={error ? 'error' : ''}
                    />
                    <ActionButtons>
                      <EditButton 
                        onClick={handleSave} 
                        title="Save"
                        disabled={!!error || editedCode.length !== 10}
                      >
                        <Save size={16} />
                      </EditButton>
                      <EditButton onClick={handleCancel} title="Cancel">
                        <X size={16} />
                      </EditButton>
                    </ActionButtons>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                  </>
                ) : (
                  <>
                    <ReferralCode onClick={handleCopyReferralCode}>
                      {selectedUser.referralCode}
                      <EditButton title="Copy">
                        <Copy size={16} />
                      </EditButton>
                    </ReferralCode>
                    <EditButton onClick={handleEditClick} title="Edit">
                      <Edit2 size={16} />
                    </EditButton>
                  </>
                )}
              </EditableField>
            </Descriptions.Item>
            <Descriptions.Item label="Referred Members">
              {selectedUser.referredMembersDto?.length > 0 ? (
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
      </Space>
    </DetailsContainer>
  );
};

export default UserDetails;