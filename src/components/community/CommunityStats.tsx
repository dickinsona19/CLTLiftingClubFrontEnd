import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Users, Heart, Trophy, Star } from 'lucide-react';

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
  color: white;
  position: relative;

  @media (max-width: 768px) {
    padding: 6rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
  text-align: center;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  color: rgba(255, 255, 255, 0.9);
  max-width: 900px;
  margin: 0 auto 5rem;
  line-height: 1.8;
  letter-spacing: 1px;
  text-align: center;
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3B82F6, #60A5FA);
  }

  &:hover {
    transform: translateY(-15px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
  }
`;

const StatIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;

  ${StatCard}:hover & {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.1);
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

const StatNumber = styled.div`
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const statsData = [
  {
    icon: Users,
    number: "500+",
    label: "Active Members"
  },
  {
    icon: Trophy,
    number: "50+",
    label: "Competition Winners"
  },
  {
    icon: Heart,
    number: "98%",
    label: "Member Satisfaction"
  },
  {
    icon: Star,
    number: "2+",
    label: "Years of Excellence"
  }
];

export const CommunityStats = () => {
  return (
    <Section>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          By the Numbers
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Our community speaks for itself. These numbers represent real people, 
          real transformations, and real achievements that happen every day at CLT Lifting Club.
        </SectionSubtitle>

        <StatsGrid
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {statsData.map((stat, index) => (
            <StatCard key={index} variants={item}>
              <StatIcon>
                <stat.icon size={40} />
              </StatIcon>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </Container>
    </Section>
  );
};