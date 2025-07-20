import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import GymInterior from '../assets/MainFloor.jpg';

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)),
    url(${GymInterior}) no-repeat center/cover;
  
  @media (max-width: 768px) {
    background-position: center 30%;
    background-size: cover;
    align-items: flex-start;
    padding-top: 25vh;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(transparent, #0a0a0a);
  }
`;

const HeroContent = styled(motion.div)`
  text-align: left;
  max-width: 1200px;
  padding: 0 2rem;
  z-index: 1;
  width: 100%;
  
  @media (max-width: 768px) {
    text-align: center;
    padding: 0 1.5rem;
  }
`;

const MainContent = styled.div`
  max-width: 800px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Tagline = styled(motion.h1)`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 1rem;
    letter-spacing: 1px;
    margin-bottom: 0.75rem;
  }
`;

const Statement = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
  line-height: 1.4;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: clamp(1.75rem, 8vw, 2.5rem);
    line-height: 1.3;
    margin-bottom: 3rem; /* Increased from 1.5rem to 3rem for more space */
  }
`;

const Emphasis = styled.span`
  color: white;
  font-style: italic;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem; /* Added extra margin on mobile */
  }
`;

const PrimaryButton = styled(Link)`
  padding: clamp(1rem, 2vw, 1.25rem) clamp(2rem, 4vw, 3rem);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid white;
  border-radius: 50px;
  font-weight: 600;
  font-size: clamp(1rem, 2vw, 1.25rem);
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  text-decoration: none;
  display: inline-block;
  
  @media (max-width: 768px) {
    margin-top: 14em;
    padding: 1rem 2rem;
    font-size: 0.9rem;
    letter-spacing: 1px;
    width: 100%;
    max-width: 280px;
    text-align: center;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    color: white;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateX(-50%) translateY(-3px);
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    left: 48%; /* Moved from 50% to 30% to position it more to the left */
    transform: translateX(-30%);
    
    &:hover {
      transform: translateX(-30%) translateY(-3px);
    }
  }
`;

const ScrollArrow = styled(motion.div)`
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  ${ScrollIndicator}:hover & {
    color: white;
    transform: translateY(2px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const bounceAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

interface HeroProps {
  onJoinClick: () => void;
  onFreePassClick: () => void;
}

export const Hero = ({ onJoinClick, onFreePassClick }: HeroProps) => {
  const scrollToCommunity = () => {
    // Scroll to the Instagram widget section
    const instagramSection = document.querySelector('[data-section="instagram"]');
    if (instagramSection) {
      instagramSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: scroll down by viewport height
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <HeroSection>
      <HeroContent
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
      >
        <MainContent>
          <Tagline
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            CLT Lifting Club: Weight Lifting Gym in Charlotte, NC
          </Tagline>
          <Statement
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Memberships
            <br />
            <Emphasis>Starting at $99 per month!</Emphasis>
          </Statement>
          <CTAContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <PrimaryButton to="/membership" >
              Memberships
            </PrimaryButton>
          </CTAContainer>
        </MainContent>
      </HeroContent>

      <ScrollIndicator
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        onClick={scrollToCommunity}
      >
        <ScrollArrow
          animate={bounceAnimation}
        >
          <ChevronDown size={24} />
        </ScrollArrow>
      </ScrollIndicator>
    </HeroSection>
  );
};