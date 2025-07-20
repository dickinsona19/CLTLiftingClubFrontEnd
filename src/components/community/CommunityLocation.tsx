import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';

const LocationSection = styled.section`
  padding: 8rem 2rem;
  background: #0a0a0a;
  color: white;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  }

  @media (max-width: 768px) {
    padding: 6rem 1rem;
  }
`;

const LocationContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 5rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const InfoSection = styled(motion.div)`
  padding: 3rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const LocationTitle = styled.h2`
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 3rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const InfoText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  font-size: 1.125rem;
  margin-bottom: 1rem;
`;

const DirectionsButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    color: white;
  }
`;

const MapWrapper = styled(motion.div)`
  position: relative;
  padding-bottom: 75%;
  height: 0;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  @media (min-width: 1024px) {
    padding-bottom: 100%;
  }
`;

export const CommunityLocation = () => {
  return (
    <LocationSection>
      <LocationContainer>
        <InfoSection
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <LocationTitle>Where to Find Us</LocationTitle>
          <InfoItem>
            <IconWrapper>
              <MapPin size={28} />
            </IconWrapper>
            <InfoContent>
              <InfoTitle>Address</InfoTitle>
              <InfoText>3100 South Boulevard<br />Charlotte, NC 28203</InfoText>
              <DirectionsButton 
                href="https://www.google.com/maps/dir//3100+South+Boulevard+Charlotte+NC+28203" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MapPin size={20} />
                Get Directions
              </DirectionsButton>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <IconWrapper>
              <Phone size={28} />
            </IconWrapper>
            <InfoContent>
              <InfoTitle>Contact</InfoTitle>
              <InfoText>
                Phone: (704) 785-5797<br />
                Email: cltlifting@cltliftingclub.com
              </InfoText>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <IconWrapper>
              <Clock size={28} />
            </IconWrapper>
            <InfoContent>
              <InfoTitle>Hours</InfoTitle>
              <InfoText>
                M-T: 5 AM - 9PM, F: 5AM - 8PM<br />
                Saturday: 7AM - 5PM, Sunday: 10AM - 5PM
              </InfoText>
            </InfoContent>
          </InfoItem>
        </InfoSection>
        
        <MapWrapper
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.1742851347897!2d-80.85772492357897!3d35.20603497252095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8856a1e8b61d3c15%3A0x3b3c6c3c3c3c3c3c!2s3100%20South%20Blvd%2C%20Charlotte%2C%20NC%2028203!5e0!3m2!1sen!2sus!4v1709940001234!5m2!1sen!2sus"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="CLT Lifting Club Location"
          />
        </MapWrapper>
      </LocationContainer>
    </LocationSection>
  );
};