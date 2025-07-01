import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Shield, Dumbbell, Clock, Calendar, Lock } from 'lucide-react';
import { Link } from 'react-router-dom'; // Added import for Link
import { Flex, Radio, RadioChangeEvent } from 'antd';
import { useState } from 'react';
import BigWeight from '../assets/RedbullCar.jpg'
const Section = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem;
  background: url(${BigWeight}) no-repeat center/cover; /* No fixed by default */
  background-position: 50% 60%;
  position: relative;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center; /* Center the plan card */

  @media (min-width: 769px) {
    background-attachment: fixed; /* Fixed only on desktop */
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem; /* Smaller padding on mobile */
    background-position: center; /* Optional: adjust if 75% looks off */
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

const PlanCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  text-align: center; /* Center the text */

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
 const [contractMonthTime, setContractMonthTime] = useState("12 Month")
const onChange = (e: RadioChangeEvent) => {
  setContractMonthTime(e.target.value);
};
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
        <Grid>
          {/* <PlanCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <PlanName>{contractMonthTime}</PlanName>
            <Price>${contractMonthTime === "No Contract" ? 109 : contractMonthTime === "6 Month" ? 99 : 89} <span>/ month</span></Price>
            <div
  style={{
    width: '100%',
    marginBottom: '1em',
    padding: '.5rem',
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '1.125rem',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    transition: 'all 0.3s ease',
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  }}
>
  <Radio.Group
    onChange={onChange}
    value={contractMonthTime}
    options={[
      {
        value: "No Contract",
        label: (
          <Flex gap="small" justify="center" align="center" vertical style={{ color: 'white' }}>
            No Contract
          </Flex>
        ),
      },
      {
        value: "6 Month",
        label: (
          <Flex gap="small" justify="center" align="center" vertical style={{ color: 'white' }}>
            6 Month
          </Flex>
        ),
      },
      {
        value: "12 Month",
        
        label: (
          <Flex gap="small" justify="center" align="center" vertical style={{ color: 'white' }}>
            12 Month
          </Flex>
        ),
      },
    ]}
    defaultValue="12 Month"
  />
</div>
            <ActivationFee> $49 Activation Fee </ActivationFee>
            <Features>
                            <Feature>
                <Calendar size={20} />
               {contractMonthTime =="No Contract"? <>Month-to-Month Freedom</>:<> Locked in Contract</>}
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
            <Button disabled>
              <Lock size={18} />
              Coming Soon
            </Button>
          </PlanCard> */}
          

          <PlanCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <PlanName>Founding Member</PlanName>
            <Price>$99 <span>/ month</span></Price>
            <ActivationFee>$50 Activation Fee</ActivationFee>
            <Features>
              {/* <Feature>
                <Star size={20} />
                First Month Free
              </Feature> */}
              
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

          
          
        </Grid>

        <MaintenanceFee>
          <p>Every membership includes a bi-annual maintenance fee of $59.99.</p>
        </MaintenanceFee>
      </Container>
    </Section>
  );
};