import styled from 'styled-components';
import { motion } from 'framer-motion';

// Import community images
import Liam from '../../assets/Liam.jpg';
import ZyzzPose from '../../assets/ZyzzPose.jpg';
import Girl2 from '../../assets/Girl2.jpg';
import Girl1 from '../../assets/Girl1.jpg';
import Zyzz2 from '../../assets/Zyzz2.jpg';
import CrackHeadShit from '../../assets/CrackHeadShi.jpg';
import FrontDoubleBicep from '../../assets/FrontDoubleBi.jpg';
import HippieGirl from '../../assets/HippieGirl.jpg';

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%);
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

const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &:nth-child(1), &:nth-child(5) {
    grid-column: span 2;
    aspect-ratio: 16/9;

    @media (max-width: 768px) {
      grid-column: span 1;
      aspect-ratio: 4/3;
    }
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
  filter: grayscale(40%) brightness(0.7);

  ${GalleryItem}:hover & {
    transform: scale(1.15);
    filter: grayscale(0%) brightness(1);
  }
`;

const GalleryOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.5s ease;

  ${GalleryItem}:hover & {
    opacity: 1;
  }
`;

const GalleryText = styled.div`
  text-align: center;
  color: white;
  padding: 2rem;
  transform: translateY(30px);
  transition: all 0.5s ease;

  ${GalleryItem}:hover & {
    transform: translateY(0);
  }

  h3 {
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    font-weight: 700;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }

  p {
    font-size: clamp(1rem, 2.5vw, 1.375rem);
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    letter-spacing: 1px;
  }
`;

const communityImages = [
  {
    src: Liam,
    title: "Our Home",
    description: "Where champions are made every day"
  },
  {
    src: CrackHeadShit,
    title: "Versatility",
    description: "Every tool for every goal and ambition"
  },

  {
    src: ZyzzPose,
    title: "Elite Equipment",
    description: "Professional grade gear for serious athletes"
  },
  {
    src: FrontDoubleBicep,
    title: "Transformation",
    description: "See your progress unfold before your eyes"
  },
  {
    src: HippieGirl,
    title: "Brotherhood",
    description: "Training together, growing stronger"
  },
  {
    src: Girl2,
    title: "Recovery Zone",
    description: "Restore, rejuvenate, and prepare for tomorrow"
  },
  {
    src: Zyzz2,
    title: "Community Events",
    description: "More than just a gym - we're family"
  },
  {
    src: Girl1,
    title: "Dedication",
    description: "Push beyond your limits every single day"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const galleryItem = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const CommunityGallery = () => {
  return (
    <Section>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Life at CLT Lifting
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Take a glimpse into our world. From intense training sessions to community events - this is what makes us more than just a gym.
        </SectionSubtitle>

        <GalleryGrid
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {communityImages.map((image, index) => (
            <GalleryItem key={index} variants={galleryItem}>
              <GalleryImage src={image.src} alt={image.title} />
              <GalleryOverlay>
                <GalleryText>
                </GalleryText>
              </GalleryOverlay>
            </GalleryItem>
          ))}
        </GalleryGrid>
      </Container>
    </Section>
  );
};