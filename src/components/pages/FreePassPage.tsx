import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Form, Input, Button, message, Spin } from 'antd';
import { Gift, User, Mail, Dumbbell, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../Footer';
import DumbellsSide from '../../assets/DumbellsSide.jpg';

const PageContainer = styled.div`
margin-top: 5em;
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
    url(${DumbellsSide}) no-repeat center/cover fixed;
  color: white;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 90vh;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const HeroContent = styled(motion.div)`
  text-align: left;
  
  @media (max-width: 1023px) {
    text-align: center;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
  line-height: 1.1;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.25rem, 4vw, 1.75rem);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  line-height: 1.6;
  letter-spacing: 1px;
  font-weight: 300;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: clamp(1rem, 3vw, 1.25rem);
  color: rgba(255, 255, 255, 0.9);
  
  svg {
    color: #10B981;
    flex-shrink: 0;
  }
`;

const FormSection = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const FormSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
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

const SubmitButton = styled(motion.button)<{ disabled?: boolean }>`
  width: 100%;
  height: 60px;
  font-size: 1.25rem;
  font-weight: 700;
  border-radius: 15px;
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  border: none;
  color: white;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-3px)'};
    box-shadow: ${props => props.disabled ? '0 10px 30px rgba(16, 185, 129, 0.3)' : '0 15px 40px rgba(16, 185, 129, 0.4)'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(-1px)'};
  }
`;

const BackToHome = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
    color: white;
  }

  @media (max-width: 768px) {
    top: 1rem;
    left: 1rem;
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 20px;
  
  h3 {
    color: #10B981;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    color: white;
  }
`;

const FreePassPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const searchParams = new URLSearchParams(window.location.search);
  const comingFrom = searchParams.get('comingFrom');
  useEffect(() => {

    console.log(`Coming from: ${comingFrom}`);
  }, []);

  const baseURL='https://boss-lifting-club-api.onrender.com';
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const url = comingFrom ? `${baseURL}/api/potential-users?from=${comingFrom.toUpperCase()}` : baseURL+'/api/potential-users';
      const createUserResponse = await fetch(url, {
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

      const waiverUrl = `/signWaiver?userId=${potentialUserId}&isPotentialUser=true`;
      const emailResponse = await fetch(baseURL+ '/api/email/send', {
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

      message.success('Free pass claimed successfully! Check your email for next steps.');
      setSubmitted(true);
      form.resetFields();

    } catch (error) {
      console.error('Error:', error.message);
      message.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>

      <HeroSection>
        <ContentWrapper>
          <HeroContent
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>
              Claim Your<br />
              <span style={{ color: '#10B981' }}>Free Day Pass</span>
            </HeroTitle>
            
            <HeroSubtitle>
              Experience CLT Lifting Club with no commitment. 
              Train with elite equipment and discover what makes us different.
            </HeroSubtitle>

            <BenefitsList>
              <BenefitItem>
                <CheckCircle size={24} />
                <span>Full access to all equipment</span>
              </BenefitItem>
              <BenefitItem>
                <CheckCircle size={24} />
                <span>Use of recovery facilities</span>
              </BenefitItem>
              <BenefitItem>
                <CheckCircle size={24} />
                <span>No hidden fees or commitments</span>
              </BenefitItem>
              <BenefitItem>
                <CheckCircle size={24} />
                <span>Valid for one full day</span>
              </BenefitItem>
            </BenefitsList>
          </HeroContent>

          <FormSection
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {submitted ? (
              <SuccessMessage
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3>
                  <CheckCircle size={32} />
                  Free Pass Claimed!
                </h3>
                <p>
                  We've sent you an email with instructions to complete your waiver. 
                  Once signed, you'll be ready to experience CLT Lifting Club!
                </p>
                <HomeButton to="/">
                  <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} />
                  Return Home
                </HomeButton>
              </SuccessMessage>
            ) : (
              <>
                <FormTitle>Get Started</FormTitle>
                <FormSubtitle>
                  Fill out the form below to claim your free day pass. 
                  We'll send you a waiver to sign and you'll be ready to train!
                </FormSubtitle>

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
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <InputWrapper>
                      <Mail className="input-prefix" size={18} />
                      <Input placeholder="john.doe@example.com" />
                    </InputWrapper>
                  </Form.Item>

                  <Form.Item>
                    <SubmitButton
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                      {loading ? (
                        <Spin size="small" />
                      ) : (
                        <>
                          <Gift size={24} />
                          Claim Free Pass
                        </>
                      )}
                    </SubmitButton>
                  </Form.Item>
                </StyledForm>
              </>
            )}
          </FormSection>
        </ContentWrapper>
      </HeroSection>

      <Footer />
    </PageContainer>
  );
};

export default FreePassPage;