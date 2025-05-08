import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import ShoePicture from '../assets/ShoePicture.jpg';
const Section = styled.section`
  padding: 8rem 1rem;
  background: url(${ShoePicture}) no-repeat center/cover; 
  position: relative;
  overflow: hidden;

  @media (min-width: 769px) {
    background-attachment: fixed; 
  }
@media (max-width: 768px) {
    padding: 4rem 1rem; 
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: 4rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
`;

const FAQItem = styled(motion.div)`
  margin-bottom: 1.5rem;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
  }
`;

const Question = styled.button`
  width: 100%;
  text-align: left;
  padding: 1.5rem;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: clamp(1rem, 3vw, 1.25rem);
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const Answer = styled(motion.div)`
  padding: 0 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  font-size: clamp(0.9rem, 2.5vw, 1.125rem);
  letter-spacing: 0.5px;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: white;
  opacity: 0.8;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);

  ${Question}:hover & {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
`;

const faqData = [
  {
    question: "What equipment do you have?",
    answer: "We offer high-quality equipment, including power racks, bars, plates, benches, and a selection of specialty accessories for strength training and powerlifting."
  },
  {
    question: "Do you offer personal training?",
    answer: "Yes, we have experienced trainers available for one-on-one sessions, with backgrounds in powerlifting, bodybuilding, and strength sports."
  },
  {
    question: "What are your hours?",
    answer: "M-T: 5 AM - 9PM, F: 5AM - 8PM, Saturday: 7AM - 5PM, Sunday: 10AM - 5PM"
  },
  {
    question: "Is there a contract?",
    answer: "We offer both month-to-month and annual membership options. No long-term contract is required for our standard membership."
  },
  {
    question: "What's included in membership?",
    answer: "Members get unlimited access to all equipment, recovery facilities including sauna and cold plunge, and exclusive member events."
  }
];

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <Section>
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </Title>
        {faqData.map((item, index) => (
          <FAQItem 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Question onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
              {item.question}
              <IconWrapper>
                {activeIndex === index ? <Minus size={24} /> : <Plus size={24} />}
              </IconWrapper>
            </Question>
            <Answer
              initial={false}
              animate={{ 
                height: activeIndex === index ? "auto" : 0, 
                opacity: activeIndex === index ? 1 : 0 
              }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <p style={{ padding: "0 0 1.5rem" }}>{item.answer}</p>
            </Answer>
          </FAQItem>
        ))}
      </Container>
    </Section>
  );
};