import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Waves, Wind, Leaf, Timer, Heart, Sun } from 'lucide-react';
import ColdPlunge from '../assets/SaunaBasic.jpg'

const Section = styled.section`
  padding: 8rem 2rem;
  background-image: url(${ColdPlunge});
  background-size: cover;
  background-repeat: no-repeat;
  color: white;
  position: relative;
  overflow: hidden;

  /* Default background-position (optional, if not set it defaults to center) */
  background-position: center;

  @media (max-width: 768px) {
    background-position: top; /* Aligns the top of the image with the top of the container */
  }

  @media (max-width: 480px) {
    background-position: top; /* Keeps it at the top for smaller screens */
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
    grid-template-columns: 1fr;
    max-width: 800px;
    margin: 0 auto 4rem;
  }
`;

const Feature = styled(motion.div)`
  padding: 3rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  text-align: center;

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

const RecoveryMethods = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 4rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const MethodCard = styled(motion.div)`
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

const MethodIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const MethodTitle = styled.h4`
  font-size: clamp(1.125rem, 3vw, 1.25rem);
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const MethodDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: clamp(0.875rem, 2vw, 1rem);
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
          Sauna Suite
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Discover the power of our premium sauna experience.
          Designed for athletes who understand that recovery is just as important as training.
        </Subtitle>
        
        <Grid>
          <Feature
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <IconWrapper>
              <Waves size={48} />
            </IconWrapper>
            <FeatureTitle>Premium Sauna Experience</FeatureTitle>
            <Description>
              Relax and unwind in our traditional sauna, perfect for soothing muscles, improving circulation, 
              and promoting deep relaxation after intense training sessions.
            </Description>
            <BenefitsList>
              <BenefitItem>
                <Sun size={20} />
                Warm, therapeutic sessions for muscle relaxation
              </BenefitItem>
              <BenefitItem>
                <Heart size={20} />
                Enhanced circulation and cardiovascular health
              </BenefitItem>
              <BenefitItem>
                <Wind size={20} />
                Improved skin health and detoxification
              </BenefitItem>
              <BenefitItem>
                <Leaf size={20} />
                Stress reduction and mental clarity
              </BenefitItem>
            </BenefitsList>
          </Feature>
        </Grid>

        <RecoveryMethods>
          <MethodCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <MethodIcon>
              <Timer size={32} />
            </MethodIcon>
            <MethodTitle>Active Recovery</MethodTitle>
            <MethodDescription>
              Light movement and stretching protocols to enhance blood flow and reduce muscle stiffness.
            </MethodDescription>
          </MethodCard>

          <MethodCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <MethodIcon>
              <Heart size={32} />
            </MethodIcon>
            <MethodTitle>Heat Therapy</MethodTitle>
            <MethodDescription>
              Sauna sessions to promote muscle relaxation, improve flexibility, and enhance recovery.
            </MethodDescription>
          </MethodCard>

          <MethodCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <MethodIcon>
              <Leaf size={32} />
            </MethodIcon>
            <MethodTitle>Mindful Recovery</MethodTitle>
            <MethodDescription>
              Quiet spaces for meditation, breathing exercises, and mental recovery techniques.
            </MethodDescription>
          </MethodCard>
        </RecoveryMethods>
      </Container>
    </Section>
  );
};