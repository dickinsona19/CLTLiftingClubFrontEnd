import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Form, Input, Button, Select, message, Spin } from 'antd';
import { Users, Heart, Shield, Star, Phone, Mail, User, Calendar } from 'lucide-react';
import { Footer } from '../Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
    url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')
    no-repeat center/cover fixed;
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;

  @media (max-width: 768px) {
    padding: 6rem 1rem 2rem;
  }
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
`;

const Subtitle = styled.p`
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  letter-spacing: 1px;
`;

const ContentWrapper = styled.div`
  display: grid;
  gap: 4rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;

const BenefitsSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
`;

const BenefitsTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  svg {
    color: #3B82F6;
    flex-shrink: 0;
    margin-top: 0.25rem;
  }
`;

const BenefitContent = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }
`;

const FormSection = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  text-align: center;
`;

const FormSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const StyledForm = styled(Form)`
  .ant-form-item-label > label {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    font-size: 1rem;
  }

  .ant-input,
  .ant-select-selector {
    height: 50px;
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white !important;
    transition: all 0.3s ease;
    font-size: 1rem;

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

  .ant-select-selection-item {
    color: white !important;
  }

  .ant-select-arrow {
    color: rgba(255, 255, 255, 0.5);
  }

  .ant-input-number {
    width: 100%;
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.2);

    .ant-input-number-input {
      color: white !important;
    }
  }

  .ant-btn {
    height: 50px;
    font-size: 1.125rem;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2) !important;
      border-color: rgba(255, 255, 255, 0.3) !important;
      color: white !important;
      transform: translateY(-2px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }

    &:disabled {
      background: rgba(255, 255, 255, 0.05) !important;
      border-color: rgba(255, 255, 255, 0.1) !important;
      color: rgba(255, 255, 255, 0.5) !important;
    }
  }
`;

const PricingNote = styled.div`
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;

  h3 {
    color: #3B82F6;
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }
`;

const { Option } = Select;

const FamilyMembershipsPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // API call to submit family membership application
      const response = await fetch('https://boss-lifting-club-api.onrender.com/api/family-memberships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          primaryMember: {
            firstName: values.primaryFirstName,
            lastName: values.primaryLastName,
            email: values.primaryEmail,
            phoneNumber: values.primaryPhone,
            dateOfBirth: values.primaryDob,
          },
          familyMembers: values.familyMembers || [],
          membershipType: values.membershipType,
          additionalNotes: values.additionalNotes,
          emergencyContact: {
            name: values.emergencyContactName,
            phone: values.emergencyContactPhone,
            relationship: values.emergencyContactRelationship,
          },
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit family membership application');
      }

      const result = await response.json();
      console.log('Family membership application submitted:', result);
      
      message.success('Family membership application submitted successfully! We will contact you within 24 hours.');
      form.resetFields();
      
    } catch (error) {
      console.error('Error submitting family membership application:', error);
      message.error('Failed to submit application. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: Users,
      title: "Family Access",
      description: "Up to 4 family members can access all gym facilities with one membership plan."
    },
    {
      icon: Heart,
      title: "Health Together",
      description: "Build healthy habits as a family with shared fitness goals and motivation."
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Supervised environment with family-friendly policies and safety protocols."
    },
    {
      icon: Star,
      title: "Special Rates",
      description: "Significant savings compared to individual memberships for each family member."
    }
  ];

  return (
    <PageContainer>
      <Container>
        <Header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title>Family Memberships</Title>
          <Subtitle>
            Strengthen your family bonds while building strength together. 
            Our family membership plans are designed to bring your loved ones closer through fitness.
          </Subtitle>
        </Header>

        <ContentWrapper>
          <BenefitsSection
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <BenefitsTitle>
              <Users size={32} />
              Family Benefits
            </BenefitsTitle>
            
            <BenefitsList>
              {benefits.map((benefit, index) => (
                <BenefitItem key={index}>
                  <benefit.icon size={24} />
                  <BenefitContent>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </BenefitContent>
                </BenefitItem>
              ))}
            </BenefitsList>
          </BenefitsSection>

          <FormSection
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FormTitle>Apply for Family Membership</FormTitle>
            <FormSubtitle>Fill out the form below and we'll contact you within 24 hours</FormSubtitle>

            <PricingNote>
              <h3>Special Family Pricing</h3>
              <p>Starting at $199/month for up to 4 family members</p>
            </PricingNote>

            <StyledForm
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem' }}>Primary Member Information</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Form.Item
                    label="First Name"
                    name="primaryFirstName"
                    rules={[{ required: true, message: 'Please enter first name' }]}
                  >
                    <Input prefix={<User size={18} />} placeholder="John" />
                  </Form.Item>

                  <Form.Item
                    label="Last Name"
                    name="primaryLastName"
                    rules={[{ required: true, message: 'Please enter last name' }]}
                  >
                    <Input prefix={<User size={18} />} placeholder="Doe" />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Email"
                  name="primaryEmail"
                  rules={[
                    { required: true, message: 'Please enter email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input prefix={<Mail size={18} />} placeholder="john.doe@example.com" />
                </Form.Item>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Form.Item
                    label="Phone Number"
                    name="primaryPhone"
                    rules={[{ required: true, message: 'Please enter phone number' }]}
                  >
                    <Input prefix={<Phone size={18} />} placeholder="(555) 123-4567" />
                  </Form.Item>

                  <Form.Item
                    label="Date of Birth"
                    name="primaryDob"
                    rules={[{ required: true, message: 'Please enter date of birth' }]}
                  >
                    <Input prefix={<Calendar size={18} />} type="date" />
                  </Form.Item>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem' }}>Membership Details</h3>
                
                <Form.Item
                  label="Membership Type"
                  name="membershipType"
                  rules={[{ required: true, message: 'Please select membership type' }]}
                >
                  <Select placeholder="Select membership type">
                    <Option value="family-2">Family Plan (2 Members) - $149/month</Option>
                    <Option value="family-3">Family Plan (3 Members) - $179/month</Option>
                    <Option value="family-4">Family Plan (4 Members) - $199/month</Option>
                    <Option value="family-custom">Custom Plan (5+ Members) - Contact for pricing</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Number of Family Members (including primary)"
                  name="familyMemberCount"
                  rules={[{ required: true, message: 'Please enter number of family members' }]}
                >
                  <Select placeholder="Select number of members">
                    <Option value={2}>2 Members</Option>
                    <Option value={3}>3 Members</Option>
                    <Option value={4}>4 Members</Option>
                    <Option value={5}>5+ Members</Option>
                  </Select>
                </Form.Item>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem' }}>Emergency Contact</h3>
                
                <Form.Item
                  label="Emergency Contact Name"
                  name="emergencyContactName"
                  rules={[{ required: true, message: 'Please enter emergency contact name' }]}
                >
                  <Input prefix={<User size={18} />} placeholder="Jane Smith" />
                </Form.Item>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Form.Item
                    label="Emergency Contact Phone"
                    name="emergencyContactPhone"
                    rules={[{ required: true, message: 'Please enter emergency contact phone' }]}
                  >
                    <Input prefix={<Phone size={18} />} placeholder="(555) 987-6543" />
                  </Form.Item>

                  <Form.Item
                    label="Relationship"
                    name="emergencyContactRelationship"
                    rules={[{ required: true, message: 'Please enter relationship' }]}
                  >
                    <Select placeholder="Select relationship">
                      <Option value="spouse">Spouse</Option>
                      <Option value="parent">Parent</Option>
                      <Option value="sibling">Sibling</Option>
                      <Option value="friend">Friend</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <Form.Item
                label="Additional Notes or Special Requests"
                name="additionalNotes"
              >
                <Input.TextArea 
                  rows={4} 
                  placeholder="Tell us about any specific needs, goals, or questions you have about our family membership..."
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large" 
                  loading={loading} 
                  block
                  disabled={loading}
                >
                  {loading ? <Spin size="small" /> : 'Submit Family Membership Application'}
                </Button>
              </Form.Item>
            </StyledForm>
          </FormSection>
        </ContentWrapper>
      </Container>
      
      <Footer />
    </PageContainer>
  );
};

export default FamilyMembershipsPage;