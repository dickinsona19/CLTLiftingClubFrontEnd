import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: clamp(400px, 60vh, 600px);
  
  .swiper-slide {
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9));
    }
  }
  
  .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s ease;
    filter: grayscale(100%);
  }

  .swiper-slide-active img {
    transform: scale(1.05);
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: white;
    background: rgba(255, 255, 255, 0.1);
    width: clamp(35px, 6vw, 50px);
    height: clamp(35px, 6vw, 50px);
    border-radius: 50%;
    transition: all 0.3s ease;

    &:after {
      font-size: clamp(16px, 3vw, 20px);
    }

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 640px) {
      display: none;
    }
  }

  .swiper-pagination-bullet {
    width: clamp(20px, 4vw, 30px);
    height: 4px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
    
    &-active {
      background: white;
      width: clamp(30px, 6vw, 50px);
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }
  }
`;

const SlideOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
  width: 100%;
  padding: 0 1rem;
`;

const SlideTitle = styled.h3`
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 800;
  color: white;
  text-transform: uppercase;
  margin-bottom: clamp(0.5rem, 2vw, 1rem);
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
  letter-spacing: 2px;
`;

const SlideDescription = styled.p`
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
  padding: 0 1rem;
  font-weight: 300;
  letter-spacing: 1px;
`;

interface ImageCarouselProps {
  images: {
    url: string;
    alt: string;
    title?: string;
    description?: string;
  }[];
}

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  return (
    <StyledSwiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      effect="fade"
      speed={1000}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image.url} alt={image.alt} />
          {(image.title || image.description) && (
            <SlideOverlay>
              {image.title && <SlideTitle>{image.title}</SlideTitle>}
              {image.description && <SlideDescription>{image.description}</SlideDescription>}
            </SlideOverlay>
          )}
        </SwiperSlide>
      ))}
    </StyledSwiper>
  );
};