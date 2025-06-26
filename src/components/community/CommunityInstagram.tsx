import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink, Heart, Camera, Dumbbell } from 'lucide-react';

const InstagramSection = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  }

  @media (max-width: 768px) {
    padding: 6rem 1rem;
  }
`;

const InstagramContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const InstagramTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: 2rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
`;

const InstagramSubtitle = styled(motion.p)`
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 4rem;
  line-height: 1.8;
  letter-spacing: 1px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 4rem;
`;

const InstagramButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 4rem;
  background: linear-gradient(135deg, #E4405F 0%, #C13584 50%, #833AB4 100%);
  color: white;
  border: none;
  border-radius: 60px;
  font-weight: 700;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  cursor: pointer;
  transition: all 0.4s ease;
  text-decoration: none;
  box-shadow: 0 15px 40px rgba(228, 64, 95, 0.4);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 25px 60px rgba(228, 64, 95, 0.5);
    color: white;

    &:before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }

  @media (max-width: 768px) {
    padding: 1.5rem 3rem;
    font-size: 1.25rem;
    gap: 1rem;
  }
`;

const InstagramIcon = styled(Instagram)`
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
`;

const InstagramFeatures = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 6rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 4rem;
  }
`;

const InstagramFeature = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  text-align: center;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(228, 64, 95, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E4405F 0%, #C13584 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: white;
  box-shadow: 0 10px 25px rgba(228, 64, 95, 0.4);
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  font-size: 1.125rem;
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

const featuresData = [
  {
    icon: Heart,
    title: "Daily Motivation",
    description: "Get inspired with daily posts featuring member achievements, workout tips, and motivational content."
  },
  {
    icon: Camera,
    title: "Member Spotlights",
    description: "See real transformations and success stories from our amazing community members."
  },
  {
    icon: Dumbbell,
    title: "Behind the Scenes",
    description: "Get exclusive access to gym events, new equipment arrivals, and community gatherings."
  }
];

export const CommunityInstagram = () => {
  return (
    <InstagramSection>
      <InstagramContainer>

        <InstagramButton
          href="https://instagram.com/cltliftingclub"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <InstagramIcon size={32} />
          <span>Follow @CLTLiftingClub</span>
          <ExternalLink size={24} />
        </InstagramButton>



      </InstagramContainer>
    </InstagramSection>
  );
};