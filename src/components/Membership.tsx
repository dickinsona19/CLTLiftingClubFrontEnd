import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Shield, Dumbbell, Clock, Calendar, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Flex, Radio, RadioChangeEvent } from 'antd';
import { useState } from 'react';
import BigWeight from '../assets/attachments.jpg'

const Section = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem;
  background: url(${BigWeight}) no-repeat center/cover;
  background-position: 50% 60%;
  position: relative;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 769px) {
    background-attachment: fixed;
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
    background-position: center;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
  }
`;

const Container = styled.div`
  margin-top: 4em;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-align: center;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 3vw, 1.25rem);
  text-align: center;
  margin-bottom: 4rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
  letter-spacing: 1px;
`;

// Mobile Tab Navigation
const MobileTabContainer = styled.div`
  @media (min-width: 768px) {
    display: none;
  }

  @media (max-width: 767px) {
    display: block;
    margin-bottom: 2rem;
  }
`;

const TabNavigation = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 1rem;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: ${props => props.active ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const MobileCardContainer = styled.div`
  @media (min-width: 768px) {
    display: none;
  }

  @media (max-width: 767px) {
    display: block;
  }
`;

const DesktopGrid = styled(Grid)`
  @media (max-width: 767px) {
    display: none;
  }

  @media (min-width: 768px) {
    display: grid;
  }
`;

const PlanCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(255, 255, 255, 0.1);
  }
`;

const PlanName = styled.h3`
  font-size: clamp(1.5rem, 4vw, 1.75rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
`;

const Price = styled.div`
  font-size: clamp(2rem, 5vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);

  span {
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.8;
  }
`;

const ActivationFee = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
`;

const PaymentNote = styled.div`
  font-size: 1.1rem;
  color: white;
  margin-bottom: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
`;

const TotalAmount = styled.div`
  font-size: 1.25rem;
  color: white;
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  .label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .amount {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }
`;

const Features = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  letter-spacing: 0.5px;

  svg {
    color: white;
    flex-shrink: 0;
  }
`;

const Button = styled(motion.button)<{ disabled?: boolean }>`
  width: 100%;
  padding: 1.25rem;
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.125rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  opacity: ${props => props.disabled ? 0.7 : 1};
  
  &:hover {
    background: ${props => props.disabled ? 'transparent' : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${props => props.disabled ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.5)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 0 30px rgba(255, 255, 255, 0.2)'};
  }
`;

const MaintenanceFee = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
    margin-bottom: 0;
  }
`;

export const Membership = () => {
  const [activeTab, setActiveTab] = useState<'founding' | 'annual'>('founding');

  const foundingMemberCard = (
    <PlanCard
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      <PlanName>Monthly Membership</PlanName>
      <Price>$99 <span>/ month</span></Price>
      <ActivationFee>$50 Activation Fee</ActivationFee>
      <Features>
        <Feature>
          <Clock size={20} />
          Limited Time Offer
        </Feature>
        <Feature>
          <Dumbbell size={20} />
          All Equipment Access
        </Feature>
        <Feature>
          <Shield size={20} />
          Full Recovery Zone
        </Feature>
      </Features>
      <Link to="/signup?contract=Founding" style={{ textDecoration: 'none' }}>
        <Button>
          Sign up
        </Button>
      </Link>
    </PlanCard>
  );

  const annualCard = (
    <PlanCard
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
    >
      <PlanName>Annual</PlanName>
      <Price>$79 <span>/ month</span></Price>
      <PaymentNote>💳 Paid in Full Upfront</PaymentNote>
      <TotalAmount>
        <span className="label">Total Amount Due Today:</span>
        <span className="amount">$998</span>
      </TotalAmount>
      <ActivationFee>$50 Activation Fee + $948 Annual Fee</ActivationFee>
      <Features>
        <Feature>
          <Calendar size={20} />
          12-Month Commitment
        </Feature>
        <Feature>
          <Dumbbell size={20} />
          All Equipment Access
        </Feature>
        <Feature>
          <Shield size={20} />
          Full Recovery Zone
        </Feature>
      </Features>
      <Link to="/signup?contract=Annual" style={{ textDecoration: 'none' }}>
        <Button>
          Sign up
        </Button>
      </Link>
    </PlanCard>
  );

  return (
    <Section>
      <Container>
        <Title
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Sign up Now
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Select the membership that matches your commitment to excellence. 
          Join our community of dedicated athletes and transform your potential into power.
        </Subtitle>

        {/* Mobile Tab Navigation */}
        <MobileTabContainer>
          <TabNavigation>
            <TabButton 
              active={activeTab === 'founding'} 
              onClick={() => setActiveTab('founding')}
            >
              Founding Member
            </TabButton>
            <TabButton 
              active={activeTab === 'annual'} 
              onClick={() => setActiveTab('annual')}
            >
              Annual
            </TabButton>
          </TabNavigation>

          {/* Mobile Single Card Display */}
          <MobileCardContainer>
            {activeTab === 'founding' ? foundingMemberCard : annualCard}
          </MobileCardContainer>
        </MobileTabContainer>

        {/* Desktop Grid Layout */}
        <DesktopGrid>
          {foundingMemberCard}
          {annualCard}
        </DesktopGrid>

        <MaintenanceFee>
          <p>Every membership includes a bi-annual maintenance fee of $59.99.</p>
        </MaintenanceFee>
      </Container>
    </Section>
  );
};