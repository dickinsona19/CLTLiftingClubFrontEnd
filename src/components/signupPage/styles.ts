import styled from 'styled-components';
import { motion } from 'framer-motion';

export const BannerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PriceCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(18, 18, 18, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3B82F6, #60A5FA);
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

export const FounderTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #3B82F6;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
`;

export const PriceHeading = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const PriceAmount = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  
  .currency {
    color: white;
    font-size: 2rem;
    font-weight: 600;
    margin-top: 0.5rem;
  }
  
  .amount {
    color: white;
    font-size: 4.5rem;
    font-weight: 700;
    line-height: 1;
  }
  
  .period {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.25rem;
    align-self: flex-end;
    margin-bottom: 0.75rem;
    margin-left: 0.25rem;
  }
  
  @media (max-width: 768px) {
    .currency {
      font-size: 1.75rem;
    }
    
    .amount {
      font-size: 3.5rem;
    }
    
    .period {
      font-size: 1.125rem;
    }
  }
`;

export const PriceDetail = styled.div`
  display: flex;
  flex-direction: column; /* Stack child divs vertically */
  gap: 1rem; /* Space between divs */
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;

  /* Style each child div to align label and value horizontally */
  > div {
    display: flex;
    justify-content: space-between; /* Horizontal alignment of label and value */
    align-items: center; /* Vertically center text within each div */
  }

  .label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
  }

  .value {
    color: white;
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

export const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  
  svg {
    color: #3B82F6;
    flex-shrink: 0;
  }
`;