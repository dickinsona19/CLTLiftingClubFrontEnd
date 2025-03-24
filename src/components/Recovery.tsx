import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Waves, Snowflake, Wind, Leaf, Timer, Heart } from 'lucide-react';

const Section = styled.section`
  padding: 8rem 2rem;
  background-image: url('https://images.unsplash.com/photo-1523471826770-c437b4636fe6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    background-image: url('https://images.unsplash.com/photo-1523471826770-c437b4636fe6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  }

  @media (max-width: 480px) {
    background-image: url('https://images.unsplash.com/photo-1523471826770-c437b4636fe6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: 1rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
`;

const Subtitle = styled(motion.p)`
  text-align: center;
  font-size: clamp(1rem, 3vw, 1.25rem);
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  margin: 0 auto 4rem;
  line-height: 1.8;
  letter-spacing: 1px;
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Feature = styled(motion.div)`
  padding: 3rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(255, 255, 255, 0.1);
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 2rem;
  color: white;
  display: inline-flex;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  ${Feature}:hover & {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
  }
`;

const FeatureTitle = styled.h3`
  font-size: clamp(1.5rem, 4vw, 1.75rem);
  margin-bottom: 1.5rem;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  font-size: clamp(1rem, 3vw, 1.125rem);
  margin-bottom: 2rem;
  letter-spacing: 0.5px;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BenefitItem = styled.li`
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

const Stats = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 4rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
  }
`;

const StatNumber = styled.div`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(0.9rem, 2.5vw, 1.125rem);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const Recovery = () => {
  return (
    <Section>
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Elite Recovery Zone
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Accelerate your recovery and optimize your performance with our state-of-the-art recovery facilities.
          Designed for athletes who demand the best in their recovery protocol.
        </Subtitle>
        <Grid>
          <Feature
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <IconWrapper>
              <Waves size={48} />
            </IconWrapper>
            <FeatureTitle>Infrared and Traditional Sauna Suite</FeatureTitle>
            <Description>
              Experience deep tissue healing and relaxation in our premium infrared saunas. 
              Utilizing advanced technology for optimal therapeutic benefits.
            </Description>
            <BenefitsList>
              <BenefitItem>
                <Timer size={20} />
                30-60 minute therapeutic sessions
              </BenefitItem>
              <BenefitItem>
                <Heart size={20} />
                Improved circulation and recovery
              </BenefitItem>
              <BenefitItem>
                <Wind size={20} />
                Enhanced detoxification
              </BenefitItem>
            </BenefitsList>
          </Feature>
          <Feature
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <IconWrapper>
              <Snowflake size={48} />
            </IconWrapper>
            <FeatureTitle>Elite Cold Plunge</FeatureTitle>
            <Description>
              Immerse yourself in our professional-grade cold plunge pools.
              Precisely temperature-controlled for optimal recovery benefits.
            </Description>
            <BenefitsList>
              <BenefitItem>
                <Timer size={20} />
                3-10 minute immersion protocols
              </BenefitItem>
              <BenefitItem>
                <Leaf size={20} />
                Reduced inflammation and soreness
              </BenefitItem>
              <BenefitItem>
                <Heart size={20} />
                Enhanced mental clarity and focus
              </BenefitItem>
            </BenefitsList>
          </Feature>
        </Grid>
        {/* <Stats>
          <StatItem
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <StatNumber>140°F</StatNumber>
            <StatLabel>Peak Sauna Temperature</StatLabel>
          </StatItem>
          <StatItem
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <StatNumber>38°F</StatNumber>
            <StatLabel>Cold Plunge Temperature</StatLabel>
          </StatItem>
          <StatItem
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <StatNumber>24/7</StatNumber>
            <StatLabel>Recovery Access</StatLabel>
          </StatItem>
        </Stats> */}
      </Container>
    </Section>
  );
};