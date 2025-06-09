import { Card, Descriptions, Space, Tag, Button, Input, message } from 'antd';
import styled from 'styled-components';
import { useAdminStore } from '../../contexts/AdminContext';
import { Edit2, Save, X, Copy, Send, Users, CreditCard, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import JointAccountModal from './JointAccountModal';
import UpdateCardModal from './UpdateCardModal';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
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

  &:use {
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

const ActionsPanel = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const JointAccountsSection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const JointAccountCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const UserInfo = styled.div`
  flex: 1;

  h4 {
    color: white;
    margin: 0;
    font-size: 1rem;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
    font-size: 0.875rem;
  }
`;
const stripePromise = loadStripe('pk_live_51R0485GHcVHSTvgIIklSPgIuBQRKFLnkzkW3X1XqAuwzNiMdc5KQI8yYBRCI2qzGoT9WW9eptoZQhNOMR2mxSaxo00AtKHFX5N');
const UserDetails = (props) => {
  const { selectedUser, setSelectedUser } = useAdminStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedCode, setEditedCode] = useState('');
  const [error, setError] = useState('');
  const [isJointAccountModalVisible, setIsJointAccountModalVisible] = useState(false);
  const [isUpdateCardModalVisible, setIsUpdateCardModalVisible] = useState(false);
  const [jointAccounts, setJointAccounts] = useState([]);

  useEffect(() => {
    if (selectedUser?.id) {
      fetchJointAccounts();
    }
  }, [selectedUser]);

  const fetchJointAccounts = async () => {
    try {
      const response = await fetch(`https://boss-lifting-club-api.onrender.com/users/${selectedUser.id}/joint-accounts`);
      if (response.ok) {
        const data = await response.json();
        setJointAccounts(data);
      }
    } catch (error) {
      console.error('Error fetching joint accounts:', error);
    }
  };

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

  const handleSendPasswordReset = async () => {
    try {
      const response = await fetch(`https://boss-lifting-club-api.onrender.com/${selectedUser.id}/sendPasswordEmail?cusId=${selectedUser.userStripeMemberId}`, {
        method: 'POST',
      });

      if (response.ok) {
        message.success('Password reset email sent successfully');
      } else {
        throw new Error('Failed to send password reset');
      }
    } catch (error) {
      console.error('Error sending password reset:', error);
      message.error('Failed to send password reset email');
    }
  };

  async function updateUserOver18(userId) {
    try {
      if (!Number.isInteger(userId) || userId <= 0) {
        throw new Error('Invalid userId: must be a positive integer');
      }

      const response = await fetch(`https://boss-lifting-club-api.onrender.com/users/${userId}/over18`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found');
        }
        throw new Error(`HTTP error: ${response.status}`);
      }

      const updatedUser = await response.json();
      setSelectedUser(updatedUser)
      console.log('User updated successfully:', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error.message);
      throw error;
    }
  }
  async function HandleSendAndroidLink(userId) {
    // Validate userId
    if (!userId || isNaN(userId)) {
      throw new Error("Invalid userId. Please provide a valid number.");
    }
  
    const apiUrl = `https://boss-lifting-club-api.onrender.com/${userId}/sendAndroidEmail`; // Update to your API URL
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData}`);
      }
  
      const result = await response.text();
      console.log('Email sent successfully:', result);
      return result; // e.g., "Test email sent to user@example.com"
    } catch (error) {
      console.error('Error sending test email:', error.message);
      throw error; // Re-throw for caller to handle if needed
    }
  }
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
        <Card title={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>User Information</span>
            <div>
              <span>Stripe Account: </span>
              <a href={`https://dashboard.stripe.com/customers/${selectedUser.userStripeMemberId}`} target="_blank" rel="noopener noreferrer">Click Here</a>
            </div>
            <div>
              <span>Over 18: </span>
              {selectedUser.over18? <>True</>:<Button type="primary" onClick={()=>updateUserOver18(selectedUser.id)}>Confirm 18 +</Button>}
            </div>
          </div>
        }>
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
          <ActionsPanel>
            <Button 
              type="primary" 
              icon={<Send size={16} />}
              onClick={handleSendPasswordReset}
            >
              Send Password Reset
            </Button>
            <Button
              type="primary"
              icon={<CreditCard size={16} />}
              onClick={() => setIsUpdateCardModalVisible(true)}
            >
              Update Card Data
            </Button>
            <Button
              type="primary"
              icon={<Phone size={16} />}
              onClick={()=> HandleSendAndroidLink(selectedUser.id)}
            >
              Send Android Download 
            </Button>
          </ActionsPanel>
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

        <Card title="Joint Accounts">
          <Button 
            type="primary"
            icon={<Users size={16} />}
            onClick={() => setIsJointAccountModalVisible(true)}
            style={{ marginBottom: '1rem' }}
          >
            Add Joint Account
          </Button>

          <JointAccountsSection>
            {jointAccounts.length > 0 ? (
              jointAccounts.map((account: any) => (
                <JointAccountCard key={account.id}>
                  <Avatar>
                    {account.firstName[0]}{account.lastName[0]}
                  </Avatar>
                  <UserInfo>
                    <h4>{account.firstName} {account.lastName}</h4>
                    <p>{account.email}</p>
                    <p>{account.phoneNumber}</p>
                  </UserInfo>
                  <Tag color={account.status === 'active' ? 'green' : 'red'}>
                    {account.status}
                  </Tag>
                </JointAccountCard>
              ))
            ) : (
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
                No joint accounts found
              </p>
            )}
          </JointAccountsSection>
        </Card>
      </Space>

      <JointAccountModal
        isVisible={isJointAccountModalVisible}
        onClose={() => setIsJointAccountModalVisible(false)}
        userId={selectedUser.id}
        onSuccess={fetchJointAccounts}
      />
<Elements stripe={stripePromise}>      <UpdateCardModal
        isVisible={isUpdateCardModalVisible}
        onClose={() => setIsUpdateCardModalVisible(false)}
        stripeCustomerId={selectedUser.userStripeMemberId}
      /></Elements>

    </DetailsContainer>
  );
};

export default UserDetails;