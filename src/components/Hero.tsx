import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('https://images.unsplash.com/photo-1638805981949-362f5964521e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')
    no-repeat center/cover;
  
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
`;

const MainContent = styled.div`
  max-width: 800px;
`;

const Tagline = styled(motion.p)`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Statement = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
  line-height: 1.4;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
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
`;

const PrimaryButton = styled(Link)`
  padding: clamp(1rem, 2vw, 1.25rem) clamp(2rem, 4vw, 3rem);
  background: transparent;
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
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  }
`;

const SecondaryButton = styled(motion.button)`
  padding: clamp(1rem, 2vw, 1.25rem) clamp(2rem, 4vw, 3rem);
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  font-weight: 600;
  font-size: clamp(1rem, 2vw, 1.25rem);
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;

  transform: translateX(-50%);
  z-index: 2;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  gap: 0.5rem;

  &:hover {
    transform: translateX(-50%) translateY(-3px);
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    
    &:hover {
      transform: translateX(-50%) translateY(-3px);
    }
  }
`;

const ScrollText = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.25rem;
`;

const ScrollArrow = styled(motion.div)`
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${ScrollIndicator}:hover & {
    color: white;
    transform: translateY(2px);
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
            CLT Lifting Club
          </Tagline>
          <Statement
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Founding Members
            <br />
            <Emphasis>Starting at $99 per month!</Emphasis>
          </Statement>
          <CTAContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <PrimaryButton to="/signup?contract=Founding" >
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
        <ScrollText>Community</ScrollText>
        <ScrollArrow
          animate={bounceAnimation}
        >
          <ChevronDown size={24} />
        </ScrollArrow>
      </ScrollIndicator>
    </HeroSection>
  );
};