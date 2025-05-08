import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import PhonenumberModal from './PhoneNumberModal';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  BannerContainer, 
  PriceCard, 
  PriceHeading, 
  PriceAmount, 
  PriceDetail,
  FounderTag,
  BenefitsList,
  BenefitItem
} from './styles';

const FormContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
    url('https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
    no-repeat center/cover fixed;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const PromoBanners = styled(motion.div)`
  flex: 1;
  max-width: 500px;
  @media (max-width: 1200px) {
    max-width: 600px;
    width: 100%;
    margin-top: 2em
  }
`;

const FormWrapper = styled.div`
  flex: 1;
  max-width: 500px;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`;

const FormSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
`;

const MaintenanceFeeNote = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-style: italic;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
`;

const StyledForm = styled(Form)`
  .ant-form-item-label > label {
    color: white;
  }

  .ant-input,
  .ant-input-password {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white !important;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:hover,
    &:focus,
    &:focus-within {
      background: rgba(255, 255, 255, 0.05) !important;
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
    }
  }

  .ant-input-password {
    input {
      background: transparent !important;
      color: white !important;
    }

    .ant-input-password-icon {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .ant-checkbox-wrapper {
    color: rgba(255, 255, 255, 0.8);
  }

  .ant-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    height: 50px;
    font-size: 1.125rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
    }
  }

  a {
    color: white;
    text-decoration: underline;
    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

const stripePromise = loadStripe("pk_live_51R0485GHcVHSTvgIIklSPgIuBQRKFLnkzkW3X1XqAuwzNiMdc5KQI8yYBRCI2qzGoT9WW9eptoZQhNOMR2mxSaxo00AtKHFX5N");

export const SignUpForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const contract = searchParams.get('contract');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validatedOtp, setValidatedOtp] = useState(false);
  const [referralCode, setReferralCode] = useState('')
  const [referedUser, setReferredUser] = useState();

  const baseAPI = 'https://boss-lifting-club-api.onrender.com'

  const sendOTP = async (phone?: string) => {
    setLoading(true);
    try {
      const response = await fetch(baseAPI + '/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: `${phone}` }),
      });
      const data = await response.json();
      if (response.ok) {
        message.success('OTP sent to your phone!');
        setOtpSent(true);
      } else {
        message.error(data.error || 'Failed to send OTP');
      }
    } catch {
      message.error('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleReferrerUser = () => {
      if (referralCode.length === 10) {
        fetch(`${baseAPI}/users/referralCode/${referralCode}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log('User Data:', data);
            setReferredUser(data)
          })
          .catch((error) => {
            console.error('Error fetching user:', error);
            setReferredUser("Not Found")
          });
      } else {
        console.log('Referral code must be 10 characters long');
        setReferredUser("Not Found")
      }
    }

    handleReferrerUser()
  }, [referralCode]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    sendOTP(`+1${phoneNumber}`);
  };

  const handleCancel = () => {
    setOtpSent(false);
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!otpSent) {
        showModal();
        return;
      }
      if (!validatedOtp) {
        const verifyResponse = await fetch(baseAPI + '/api/auth/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNumber: `+1 ${phoneNumber}`, otp: otpValue }),
        });
        const verifyData = await verifyResponse.json();
        if (!verifyData.isValid) {
          message.error('Invalid OTP');
          setValidatedOtp(false);
          return;
        }
      }

      const signupResponse = await fetch(baseAPI + '/signupWithCard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          password,
          membershipName: "Founder",
          referralId: referedUser?.id,
          lockedInRate: contract === "Annual" ? "948.00" : "99.99"
        }),
      });
      const signupData = await signupResponse.json();

      if (!signupResponse.ok) {
        message.error(signupData.error || 'Failed to sign up');
        return;
      }

      const { sessionId } = signupData;
      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({ sessionId });
      if (error) {
        message.error(`Card setup failed: ${error.message}`);
      }
    } catch {
      message.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <ContentWrapper>
        <PromoBanners
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BannerContainer>
            <PriceCard 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)' }}
            >
              <FounderTag>
                <Star size={14} />
                <span>{contract === "Founding" ? "Founding Member" : (contract === "Annual" ? "Annual" : "")}</span>
              </FounderTag>
              
              <PriceHeading>CLT Lifting Club</PriceHeading>
              
              <PriceAmount>
                <span className="currency">$</span>
                <span className="amount">{contract === "Founding" ? "99" : (contract === "Annual" ? "948" : "")}</span>
                <span className="period">{contract === "Founding" ? "/month" : (contract === "Annual" ? "/year" : "")}</span>
              </PriceAmount>
              
              <PriceDetail>
                <div>
                  <span className="label">Activation Fee</span>
                  <span className="value"> $50</span>
                </div>
                {contract === "Founding" && (
                  <div>
                    <span className="label">Tax (5%)</span>
                    <span className="value"> $4.99</span>
                  </div>
                )}
              </PriceDetail>
              
              <BenefitsList>
                <BenefitItem>
                  <Star size={16} />
                  <span>Operating Hours: 5AM - 9PM</span>
                </BenefitItem>
                <BenefitItem>
                  <Star size={16} />
                  <span>Premium Equipment</span>
                </BenefitItem>
                <BenefitItem>
                  <Star size={16} />
                  <span>Founder Status Benefits</span>
                </BenefitItem>
                <BenefitItem>
                  <Star size={16} />
                  <span>Community Events</span>
                </BenefitItem>
              </BenefitsList>
            </PriceCard>
          </BannerContainer>
        </PromoBanners>

        <FormWrapper>
          <FormHeader>
            <FormTitle>Join CLT Lifting Club</FormTitle>
            <FormSubtitle>Become a founding member today</FormSubtitle>
          </FormHeader>

          <StyledForm form={form} layout="vertical" onFinish={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter your first name' }]}>
                <Input size="large" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </Form.Item>
              <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter your last name' }]}>
                <Input size="large" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </Form.Item>
            </div>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }, { min: 8, message: 'Password must be at least 8 characters' }]}>
              <Input.Password size="large" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item 
              label="Confirm Password" 
              name="confirmPassword" 
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password size="large" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Item>

            <Form.Item label="Referral Code" name="Referral Code" rules={[{ min: 10, message: 'Referral Code must be 10 characters' }]}>
              <Input size="large" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} />
            </Form.Item>
            {referedUser &&
            <MaintenanceFeeNote>
              {referedUser === "Not Found" ? (
                <>Cannot Find reference</>
              ) : (
                <>Referred By: {referedUser?.firstName} {referedUser?.lastName}</>
              )}
            </MaintenanceFeeNote> 
            }

            <MaintenanceFeeNote>
              Note: All memberships include a bi-annual maintenance fee of $59.99 charged in January and July
            </MaintenanceFeeNote>

            <Form.Item name="termsAndConditions" valuePropName="checked" rules={[{ required: true, message: 'Please accept the terms and conditions' }]}>
              <Checkbox>
                I agree to the <Link to={"/terms-and-conditions"}><a target="_blank">Terms and Conditions</a></Link>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" loading={loading} block>
                Join Now
              </Button>
            </Form.Item>
          </StyledForm>
        </FormWrapper>
      </ContentWrapper>

      <PhonenumberModal 
        isVisible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        phoneNumber={phoneNumber}
        onPhoneNumberChange={(e) => setPhoneNumber(e.target.value)}
        verifyResponse={handleSubmit}
        otpValue={otpValue}
        setOtpValue={setOtpValue}
        setPhoneNumber={setPhoneNumber}
      />
    </FormContainer>
  );
};