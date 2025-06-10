import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, Input, Spin } from 'antd';
import { Phone, Send, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 0;
  }

  .ant-modal-header {
    background: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 24px;
    border-radius: 20px 20px 0 0;

    .ant-modal-title {
      color: white;
      font-size: 1.75rem;
      font-weight: 700;
      text-align: center;
    }
  }

  .ant-modal-body {
    padding: 24px;
  }

  .ant-modal-close {
    color: rgba(255, 255, 255, 0.6);

    &:hover {
      color: white;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const InputContainer = styled.div`
  width: 100%;
`;

const Label = styled.p`
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
`;

const StyledInput = styled(Input)`
  height: 50px;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  color: white !important;
  font-size: 1rem;
  padding-left: 3rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
`;

const InputWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.6);
    z-index: 1;
  }
`;

const ActionButton = styled(motion.button)`
  width: 100%;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

interface PhonenumberModalProps {
  isVisible: boolean;
  phoneNumber: string;
  otpValue: string;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOk: () => void;
  onCancel: () => void;
  verifyResponse: () => void;
  setOtpValue: (value: string) => void;
  setPhoneNumber: (value: string) => void;
}

const PhonenumberModal: React.FC<PhonenumberModalProps> = ({
  isVisible,
  phoneNumber,
  otpValue,
  onOk,
  onCancel,
  verifyResponse,
  setOtpValue,
  setPhoneNumber
}) => {
  const [inputPhoneNumber, setInputPhoneNumber] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleVerifyResponse = async () => {
    setLoading(true);
    await verifyResponse();
    setLoading(false);
  };

  return (
    <StyledModal
      title="Phone Verification"
      open={isVisible}
      footer={null}
      onCancel={onCancel}
      centered
    >
      <Container>
        {inputPhoneNumber ? (
          <>
<InputContainer>
  <Label>Enter your phone number</Label>
  <InputWrapper>
    <Phone size={18} />
    <StyledInput
      placeholder="(555) 555-5555"
      value={phoneNumber}
      onChange={(e) => {
        const input = e.target.value;
        const filteredInput = input.replace(/[^0-9]/g, '');
        setPhoneNumber(filteredInput);
      }}
    />
  </InputWrapper>
</InputContainer>
            <ActionButton
              onClick={() => { 
                setInputPhoneNumber(false);
                onOk();
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={20} />
              Send Verification Code
            </ActionButton>
          </>
        ) : (
          <>
            <InputContainer>
              <Label>Enter verification code</Label>
              <InputWrapper>
                <KeyRound size={18} />
                <StyledInput
                  placeholder="Enter 6-digit code"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                />
              </InputWrapper>
            </InputContainer>

              <ActionButton
                onClick={handleVerifyResponse}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? <Spin size="small" /> : 'Verify Code'}
              </ActionButton>
          </>
        )}
      </Container>
    </StyledModal>
  );
};

export default PhonenumberModal;