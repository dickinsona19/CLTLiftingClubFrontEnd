import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Dumbbell, Users, Trophy } from 'lucide-react';

const Section = styled.section`
  padding: 8rem 1rem;
  background: url('https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
    no-repeat center/cover fixed;
  position: relative;
  overflow: hidden;
  
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

  @media (min-width: 640px) {
    padding: 8rem 2rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: 4rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
  position: relative;
  z-index: 1;
`;

const Grid = styled.div`
  display: grid;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Feature = styled(motion.div)`
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-10px);
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
  padding: 2rem;
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

const Title = styled.h3`
  font-size: clamp(1.5rem, 4vw, 1.75rem);
  margin-bottom: 1rem;
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

const Button = styled(motion.button)`
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 1rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

interface FeaturesProps {
  onSaunaClick?: () => void;
  onColdPlungeClick?: () => void;
}

export const Features = ({ onSaunaClick, onColdPlungeClick }: FeaturesProps) => {
  return (
    <Section>
      <SectionTitle
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        The CLT Advantage
      </SectionTitle>
      <Grid
        as={motion.div}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Feature variants={item}>
          <IconWrapper>
            <Dumbbell size={48} strokeWidth={1.5} />
          </IconWrapper>
          <Title>Elite Equipment</Title>
          <Description>
            Train with competition-grade equipment from top manufacturers. Every piece carefully selected for peak performance.
          </Description>
        </Feature>
        <Feature variants={item}>
          <IconWrapper>
            <Users size={48} strokeWidth={1.5} />
          </IconWrapper>
        <Title>Recovery</Title>       
          <Description> Discover expert recovery techniques from world-class coaches with proven success in optimizing strength, conditioning, and restoration. </Description>
          <Button onClick={onSaunaClick}>
            Learn More
          </Button>
        </Feature>
        <Feature variants={item}>
          <IconWrapper>
            <Trophy size={48} strokeWidth={1.5} />
          </IconWrapper>
          <Title>Champion Results</Title>
          <Description>
            Join our community of record-holders and elite athletes who've achieved extraordinary results.
          </Description>
          <Button onClick={onColdPlungeClick}>
            Explore
          </Button>
        </Feature>
      </Grid>
    </Section>
  );
};