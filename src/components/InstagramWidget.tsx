import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
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
  CloseUpHexLight,
  CLTSign,
  TwoDudes,
  Attachment,
  Redbull,
  PosingRoom,
  CoolSauna
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