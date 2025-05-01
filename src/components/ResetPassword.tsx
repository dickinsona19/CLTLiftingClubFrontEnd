import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Input, Button, message } from 'antd';
import { Lock } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
    url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')
    no-repeat center/cover fixed;
`;

const FormWrapper = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 2rem;
`;

const StyledForm = styled(Form)`
  .ant-form-item-label > label {
    color: white;
  }

  .ant-input-password {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.1);
    height: 50px;
    border-radius: 8px;

    input {
      background: transparent !important;
      color: white !important;
      height: 48px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    .ant-input-password-icon {
      color: rgba(255, 255, 255, 0.5);
    }

    &:hover,
    &:focus,
    &:focus-within {
      background: rgba(255, 255, 255, 0.05) !important;
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);

      input {
        background: transparent !important;
      }
    }
  }

  .ant-btn {
    height: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.3);
      color: white;
    }
  }
`;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const id = searchParams.get('id');  

  const onFinish = async (values: { password: string }) => {
    if (!id) {
      message.error('Invalid reset id');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://boss-lifting-club-api.onrender.com/users/password/'+id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: values.password,
        }),
      });

      if (response.ok) {
        message.success('Password reset successfully');
        navigate('/');
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (error) {
      message.error('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Reset Password</Title>
        <Subtitle>Enter your new password below</Subtitle>

        <StyledForm
          name="resetPassword"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="password"
            label="New Password"
            rules={[
              { required: true, message: 'Please enter your new password' },
              { min: 8, message: 'Password must be at least 8 characters' }
            ]}
          >
            <Input.Password
              prefix={<Lock size={16} />}
              placeholder="Enter your new password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<Lock size={16} />}
              placeholder="Confirm your new password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Reset Password
            </Button>
          </Form.Item>
        </StyledForm>
      </FormWrapper>
    </Container>
  );
};

export default ResetPassword;