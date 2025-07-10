import { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import styled from 'styled-components';
import { Users } from 'lucide-react';

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
  }

  .ant-modal-header {
    background: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 2rem;
  }

  .ant-modal-title {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .ant-modal-close {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const FormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    color: rgba(255, 255, 255, 0.9);
  }

  .ant-input {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;

    &:hover,
    &:focus {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.3);
    }
  }
`;

const SubmitButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  height: 40px;
  width: 100%;

  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    border-color: rgba(255, 255, 255, 0.3) !important;
    color: white !important;
  }
`;

interface JointAccountModalProps {
  isVisible: boolean;
  onClose: () => void;
  userId: string;
  onSuccess: () => void;
}

const JointAccountModal = ({ isVisible, onClose, userId, onSuccess }: JointAccountModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  console.log(userId)
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch(`https://boss-lifting-club-api.onrender.com/${userId.toString()}/sendFamilyInviteEmail?newCusEmail=${values.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create joint account');
      }

      message.success('Joint account created successfully');
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Failed to create joint account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledModal
      title="Add Joint Account"
      open={isVisible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >

        <FormItem
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="Enter email" />
        </FormItem>


        <FormItem>
          <SubmitButton
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<Users size={16} />}
          >
            Send Invite
          </SubmitButton>
        </FormItem>
      </Form>
    </StyledModal>
  );
};

export default JointAccountModal;