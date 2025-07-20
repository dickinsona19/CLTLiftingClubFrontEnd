import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import CloseUpHexLight from '../assets/CloseUpHexLight.jpg'
import TwoDudes from '../assets/2Dudes.jpg'
import CLTSign from '../assets/CLTSign.jpg'
import Attachment from '../assets/attachments.jpg'
import Redbull from '../assets/RedbullCar.jpg'
import PosingRoom from '../assets/PosingRoom.jpg'
import CoolSauna from '../assets/CoolSaunaPics.jpg'

const Section = styled.section`
  padding: 0;
  background: #000;
  color: white;
  position: relative;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  
  @media (max-width: 768px) {
    height: 80vh; /* Increased from 60vh to 75vh for taller mobile pictures */
  }

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    height: 100%;
  }

  .swiper-button-next,
  .swiper-button-prev {
    display: none !important;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
    
    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

const PrevButton = styled(NavigationButton)`
  left: 20px;

  @media (max-width: 768px) {
    left: 15px;
  }
`;

const NextButton = styled(NavigationButton)`
  right: 20px;

  @media (max-width: 768px) {
    right: 15px;
  }
`;

const FreePassButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FreePassButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid white;
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.875rem 2rem;
    font-size: 1rem;
    letter-spacing: 1px;
  }
`;

const communityPhotos = [
  CloseUpHexLight,
  CLTSign,
  TwoDudes,
  Attachment,
  Redbull,
  PosingRoom,
  CoolSauna
];

const InstagramWidget = () => {
  const [swiperRef, setSwiperRef] = React.useState<any>(null);

  const handlePrevSlide = () => {
    if (swiperRef) {
      swiperRef.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef) {
      swiperRef.slideNext();
    }
  };

  const scrollToFreePass = () => {
    // Find the free pass section and scroll to it
    const freePassSection = document.querySelector('[data-section="free-pass"]');
    if (freePassSection) {
      freePassSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: scroll down by a reasonable amount
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <Section data-section="instagram">
      <CarouselWrapper>
        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={3}
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {communityPhotos.map((photo, index) => (
            <SwiperSlide key={index}>
              <SlideImage src={photo} alt={`Community ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>

        <PrevButton onClick={handlePrevSlide} aria-label="Previous slide">
          <ChevronLeft size={24} />
        </PrevButton>

        <NextButton onClick={handleNextSlide} aria-label="Next slide">
          <ChevronRight size={24} />
        </NextButton>

        <FreePassButtonWrapper>
          <FreePassButton
            onClick={scrollToFreePass}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Gift size={20} />
            Free Pass
          </FreePassButton>
        </FreePassButtonWrapper>
      </CarouselWrapper>
    </Section>
  );
};

export default InstagramWidget;