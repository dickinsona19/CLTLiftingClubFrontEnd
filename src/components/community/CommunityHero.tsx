import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainFloor from '../../assets/MainFloor.jpg';

const HeroSection = styled.section`
  height: 70vh;
  min-height: 600px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)),
    url(${MainFloor}) no-repeat center/cover;
  
  @media (max-width: 768px) {
    height: 60vh;
    min-height: 500px;
    background-position: center 30%;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(transparent, #0a0a0a);
  }
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  max-width: 900px;
  padding: 0 2rem;
  z-index: 1;
  position: relative;
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 6rem;
  left: 2rem;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
    color: white;
  }

  @media (max-width: 768px) {
    top: 5rem;
    left: 1rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3.5rem, 10vw, 6rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-shadow: 0 0 50px rgba(255, 255, 255, 0.5);
  line-height: 1;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.25rem, 4vw, 2rem);
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 2rem;
  font-weight: 300;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  line-height: 1.4;
`;

export const CommunityHero = () => {
  return (
    <HeroSection>
      <BackButton to="/">
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </BackButton>
      
      <HeroContent
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <HeroTitle
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Our Community
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Where strength meets family, and every member becomes a champion
        </HeroSubtitle>
      </HeroContent>
    </HeroSection>
  );
};