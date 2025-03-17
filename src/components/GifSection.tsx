import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 8rem 0;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
`;

const GifBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')
    no-repeat center/cover;
  opacity: 0.3;
  filter: grayscale(100%);

  &:after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, rgba(0,0,0,0.9), rgba(0,0,0,0.7));
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 0 2rem;
`;

const Title = styled(motion.h2)`
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 800;
  margin-bottom: 2rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.25rem, 4vw, 1.5rem);
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.8;
  font-weight: 300;
  letter-spacing: 1px;
`;

const Button = styled(motion.button)`
  display: inline-block;
  padding: 1.5rem 3.5rem;
  background: transparent;
  color: white;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
  }
`;

interface GifSectionProps {
  onJoinClick: () => void;
}

export const GifSection = ({ onJoinClick }: GifSectionProps) => {
  return (
    <Section>
      <GifBackground />
      <Content>
        <Title
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          FORGE YOUR LEGACY
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Join the elite. Train like champions. Become legendary.
        </Subtitle>
        <Button
          onClick={onJoinClick}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin Your Journey
        </Button>
      </Content>
    </Section>
  );
};