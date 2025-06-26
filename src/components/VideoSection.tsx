import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Play, Pause, ArrowRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import mainVideo from '../assets/MainVideo.mp4'

const Section = styled.section`
  padding: 0;
  background: #000;
  color: white;
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 60vh;
    min-height: 400px;
  }
`;

const VideoWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const VideoOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  pointer-events: none;
`;

const VideoTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: 1rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
`;

const VideoSubtitle = styled(motion.p)`
  font-size: clamp(1rem, 3vw, 1.25rem);
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
  letter-spacing: 1px;
  padding: 0 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const PlayPauseButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid white;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  z-index: 3;
  pointer-events: auto;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translate(-50%, -50%) scale(0.95);
  }

  svg {
    margin-left: ${props => props.children?.type === Play ? '4px' : '0'}; /* Slight offset for play icon */
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const VolumeControl = styled(motion.button)`
  position: absolute;
  bottom: 30px;
  right: 30px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  z-index: 3;
  pointer-events: auto;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    border-color: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    padding: 0.5rem;
    font-size: 0.75rem;
  }
`;

const CTAButtons = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  padding: 3rem 2rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  pointer-events: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 1rem;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid white;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  text-decoration: none;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    color: white;
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 3rem;
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
`;

interface VideoSectionProps {
  onFreePassClick?: () => void;
}

export const VideoSection = ({ onFreePassClick }: VideoSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(console.error);
    }
  };

  const handleFreePassClick = () => {
    if (onFreePassClick) {
      onFreePassClick();
    }
  };

  return (
    <Section>
      <VideoWrapper
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <Video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={mainVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </Video>
        
        <VideoOverlay>
          <VideoTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Experience CLT Lifting
          </VideoTitle>

        </VideoOverlay>



        <CTAButtons
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <PrimaryButton to="/membership">
            <span>Join Now</span>
            <ArrowRight size={20} />
          </PrimaryButton>
          
          <SecondaryButton onClick={handleFreePassClick}>
            <span>Try Free Pass</span>
          </SecondaryButton>
        </CTAButtons>
      </VideoWrapper>
    </Section>
  );
};