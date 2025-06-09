import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Lock, Mail } from 'lucide-react';
import { useAdminStore } from '../../contexts/AdminContext';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
    url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')
    no-repeat center/cover fixed;
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: bold;
`;

const StyledForm = styled(Form)`
  .ant-form-item-label > label {
    color: white;
  }

  .ant-input-affix-wrapper {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;

    input {
      background: transparent !important;
      color: white !important;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    .anticon {
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

  .ant-input-password {
    background: rgba(255, 255, 255, 0.05) !important;

    input {
      background: transparent !important;
      color: white !important;
    }

    .ant-input-password-icon {
      color: rgba(255, 255, 255, 0.5);
    }

    &:hover,
    &:focus,
    &:focus-within {
      background: rgba(255, 255, 255, 0.05) !important;
    }
  }

  .ant-btn {
    height: 45px;
    font-size: 1.1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.3);
    }
  }
`;

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAdminStore((state) => state.setUser);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      if (values.email === 'cltlifting' && values.password === 'NewCltCrew') {
        setUser({
          id: '1',
          email: values.email,
          role: 'admin'
        });
        message.success('Login successful');
        navigate('/admin/dashboard');
      } else {
        message.error('Invalid credentials');
      }
    } catch (error) {
      message.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Admin Login</Title>
        <StyledForm
          name="admin_login"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
            ]}
          >
            <Input prefix={<Mail size={16} />} placeholder="admin@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<Lock size={16} />} placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </StyledForm>
      </LoginCard>
    </LoginContainer>
  );
};

export default AdminLogin;