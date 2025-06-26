import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const FooterSection = styled.footer`
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
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
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;

  @media (max-width: 768px) {
    padding: 3rem 1rem 2rem;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.h2`
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  letter-spacing: 2px;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
  }
`;

const ColumnTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;

  svg {
    color: white;
    flex-shrink: 0;
  }
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: block;

  &:hover {
    color: white;
    transform: translateX(5px);
  }
`;

const ExternalLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: block;

  &:hover {
    color: white;
    transform: translateX(5px);
  }
`;

const HoursItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;

  .day {
    font-weight: 500;
  }

  .time {
    color: white;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  margin: 0;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const LegalLink = styled(Link)`
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &:hover {
    color: white;
  }
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const Footer = () => {
  return (
    <FooterSection>
      <FooterContent>
        <FooterGrid
          as={motion.div}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <FooterColumn variants={item}>
            <Logo>CLT Lifting Club</Logo>
            <Description>
            </Description>
            <SocialLinks>
              <SocialLink href="https://www.instagram.com/cltliftingclub/" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </SocialLink>
            </SocialLinks>
          </FooterColumn>

          <FooterColumn variants={item}>
            <ColumnTitle>Contact Info</ColumnTitle>
            <ContactItem>
              <MapPin size={18} />
              <div>
                3100 South Boulevard<br />
                Charlotte, NC 28203
              </div>
            </ContactItem>
            <ContactItem>
              <Phone size={18} />
              <div>(704) 785-5797</div>
            </ContactItem>
            <ContactItem>
              <Mail size={18} />
              <div>contact@cltliftingclub.com</div>
            </ContactItem>
          </FooterColumn>

          <FooterColumn variants={item}>
            <ColumnTitle>Quick Links</ColumnTitle>
            <FooterLink to="/membership">Memberships</FooterLink>
            <FooterLink to="/#free-pass">Free Pass</FooterLink>
            <FooterLink to="/#faq">FAQ</FooterLink>
            <ExternalLink href="https://www.google.com/maps/dir//3100+South+Boulevard+Charlotte+NC+28203" target="_blank" rel="noopener noreferrer">
              Directions
            </ExternalLink>
          </FooterColumn>

          <FooterColumn variants={item}>
            <ColumnTitle>
              <Clock size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Hours
            </ColumnTitle>
            <HoursItem>
              <span className="day">Monday - Thursday</span>
              <span className="time">5AM - 9PM</span>
            </HoursItem>
            <HoursItem>
              <span className="day">Friday</span>
              <span className="time">5AM - 8PM</span>
            </HoursItem>
            <HoursItem>
              <span className="day">Saturday</span>
              <span className="time">7AM - 5PM</span>
            </HoursItem>
            <HoursItem>
              <span className="day">Sunday</span>
              <span className="time">7AM - 5PM</span>
            </HoursItem>
          </FooterColumn>
        </FooterGrid>

        <FooterBottom>
          <Copyright>
            © 2025 CLT Lifting Club. All rights reserved.
          </Copyright>
          <LegalLinks>
            <LegalLink to="/terms-and-conditions">Terms & Conditions</LegalLink>
            <LegalLink to="/privacy-policy">Privacy Policy</LegalLink>
          </LegalLinks>
        </FooterBottom>
      </FooterContent>
    </FooterSection>
  );
};