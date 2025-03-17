import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const Section = styled.section`
  padding: 8rem 2rem;
  background: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #1a1a1a;
`;

const VideoWrapper = styled(motion.div)`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const VideoSection = () => {
  return (
    <Section>
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Experience CLT Lifting
        </Title>
        <VideoWrapper
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <iframe
            src="https://www.youtube.com/embed/your-video-id"
            title="CLT Lifting Experience"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoWrapper>
      </Container>
    </Section>
  );
};