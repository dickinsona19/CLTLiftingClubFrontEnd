import React,{useState} from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Calendar, Clock, Dumbbell, User, Calendar as CalendarIcon, MailIcon } from 'lucide-react';
import { Form, Input, message, Spin } from 'antd';
import DumbellsSide from '../assets/DumbellsSide.jpg';
import { Link } from 'react-router-dom';

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
    url(${DumbellsSide}) no-repeat center/cover;
  position: relative;
  color: white;
  overflow: hidden;

  @media (min-width: 769px) {
    background-attachment: fixed;
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 4rem;
  position: relative;
  z-index: 1;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const PromoSection = styled(motion.div)`
  padding: 3rem;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 1023px) {
    text-align: center;
    padding: 2rem;
  }
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 2rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
  line-height: 1.2;
`;

const PromoHighlight = styled(motion.div)`
  margin: 2rem 0;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 1023px) {
    flex-direction: column;
    text-align: center;
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
`;

const HighlightContent = styled.div`
  flex: 1;
`;

const HighlightTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
`;

const HighlightText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
`;

const FormWrapper = styled(motion.div)`
  background: rgba(0, 0, 0, 0.6);
  padding: 3rem;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);

  @media (max-width: 640px) {
    padding: 2rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-align: center;
  letter-spacing: -0.5px;
  color: white;
`;

const FormSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 3rem;
  font-size: 1.1rem;
`;

const StyledForm = styled(Form)`
  .ant-form-item-label > label {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    font-size: 1rem;
  }

  .ant-input {
    height: 50px;
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white !important;
    transition: all 0.3s ease;
    font-size: 1rem;
    padding-left: 3rem;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:hover,
    &:focus {
      background: rgba(255, 255, 255, 0.05) !important;
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
    }
  }

  .input-prefix {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.6);
    z-index: 1;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledButton = styled(motion.button)<{ disabled?: boolean }>`
  width: 100%;
  height: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    background: ${props => props.disabled ? 'transparent' : 'rgba(255, 255, 255, 0.2)'};
    border-color: ${props => props.disabled ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.3)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 15px 30px rgba(0, 0, 0, 0.2)'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(0)'};
  }
`;

export const FreePass = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const createUserResponse = await fetch('https://boss-lifting-club-api.onrender.com/api/potential-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (!createUserResponse.ok) {
        const errorData = await createUserResponse.json();
        throw new Error(errorData.error || 'Failed to claim free pass');
      }
  
      const data = await createUserResponse.json();
      const potentialUserId = data.id;
      const email = values.email;
      console.log(potentialUserId)
      console.log(data)

      const waiverUrl = `/signWaiver?userId=${potentialUserId}&isPotentialUser=true`;
      const emailResponse = await fetch('https://boss-lifting-club-api.onrender.com/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: "Welcome to CLT Lifting Club!",
          text: `Thank you for signing up! Please sign the waiver to claim your free pass: https://www.cltliftingclub.com${waiverUrl}`,
        }),
      });
  
      if (!emailResponse.ok) {
        const contentType = emailResponse.headers.get('content-type');
        let emailError;
        if (contentType && contentType.includes('application/json')) {
          emailError = await emailResponse.json();
          throw new Error(emailError.error || 'Failed to send email');
        } else {
          const errorText = await emailResponse.text();
          throw new Error(errorText || 'Failed to send email');
        }
      }
  
      const emailResult = await emailResponse.text();
      console.log('Email sent:', emailResult);
      message.success('Email sent successfully!');
      form.resetFields();
  
    } catch (error) {
      console.error('Error:', error.message);
      message.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <Container>
        {/* <PromoSection
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Experience Excellence</Title>
          
          <PromoHighlight whileHover={{ scale: 1.02 }}>
            <IconWrapper>
              <Calendar size={24} />
            </IconWrapper>
            <HighlightContent>
              <HighlightTitle>Full Day Access</HighlightTitle>
              <HighlightText>Experience all our premium amenities and equipment</HighlightText>
            </HighlightContent>
          </PromoHighlight>

          <PromoHighlight whileHover={{ scale: 1.02 }}>
            <IconWrapper>
              <Clock size={24} />
            </IconWrapper>
            <HighlightContent>
              <HighlightTitle>Flexible Timing</HighlightTitle>
              <HighlightText>Choose any day that works best for you</HighlightText>
            </HighlightContent>
          </PromoHighlight>

          <PromoHighlight whileHover={{ scale: 1.02 }}>
            <IconWrapper>
              <Dumbbell size={24} />
            </IconWrapper>
            <HighlightContent>
              <HighlightTitle>Expert Guidance</HighlightTitle>
              <HighlightText>Get a complimentary equipment orientation</HighlightText>
            </HighlightContent>
          </PromoHighlight>
        </PromoSection> */}

        <FormWrapper
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FormTitle>Claim Your Free Pass</FormTitle>
          <FormSubtitle>Start your journey to excellence today</FormSubtitle>

          <StyledForm
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please enter your first name' }]}
              >
                <InputWrapper>
                  <User className="input-prefix" size={18} />
                  <Input placeholder="John" />
                </InputWrapper>
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please enter your last name' }]}
              >
                <InputWrapper>
                  <User className="input-prefix" size={18} />
                  <Input placeholder="Doe" />
                </InputWrapper>
              </Form.Item>
            </div>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter your email' }]}
            >
              <InputWrapper>
                <MailIcon className="input-prefix" size={18} />
                <Input placeholder="john.doe@example.com" />
              </InputWrapper>
            </Form.Item>

            <Form.Item>
              <StyledButton type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.05 }}>
                {loading ? <Spin size="small" /> : 'Claim Free Day Pass'}
              </StyledButton>
            </Form.Item>
          </StyledForm>
        </FormWrapper>
      </Container>
    </Section>
  );
};