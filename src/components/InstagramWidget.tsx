import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Section = styled.section`
  padding: 0;
  background: #000;
  color: white;
  position: relative;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  height: 100vh;
  
  @media (max-width: 768px) {
    height: 60vh;
  }

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    height: 100%;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const communityPhotos = [
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1517344800994-80b20463999c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
];

const InstagramWidget = () => {
  return (
    <Section data-section="instagram">
      <CarouselWrapper>
        <Swiper
          slidesPerView={3}
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
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
      </CarouselWrapper>
    </Section>
  );
};

export default InstagramWidget;