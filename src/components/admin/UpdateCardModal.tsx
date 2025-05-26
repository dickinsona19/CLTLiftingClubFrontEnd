import { useState, useEffect } from 'react';
import { Modal, Form, Button, message } from 'antd';
import styled from 'styled-components';
import { CreditCard } from 'lucide-react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

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
  gap: 2rem;
`;

const FormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
  }
`;

const CardElementContainer = styled.div`
  height: 50px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 12px;
  color: white;
  font-size: 1rem;

  .StripeElement {
    color: white;
    width: 100%;
    height: 100%;
  }

  .StripeElement--focus {
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }

  .StripeElement--invalid {
    border-color: #fa755a;
  }

  .StripeElement--webkit-autofill {
    background: rgba(255, 255, 255, 0.05) !important;
  }
`;

const SubmitButton = styled(Button)`
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

  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    border-color: rgba(255, 255, 255, 0.3) !important;
    color: white !important;
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(255, 255, 255, 0.1) !important;
    color: rgba(255, 255, 255, 0.5) !important;
  }
`;

interface UpdateCardModalProps {
  isVisible: boolean;
  onClose: () => void;
  stripeCustomerId: string;
}

const BACKEND_URL = 'https://boss-lifting-club-api.onrender.com'; // Replace with your Spring backend URL

const UpdateCardModal = ({ isVisible, onClose, stripeCustomerId }: UpdateCardModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  // Fetch SetupIntent from backend when modal opens
  useEffect(() => {
    if (isVisible && stripe && stripeCustomerId) {
      axios
        .post(`${BACKEND_URL}/create-setup-intent`, { customerId: stripeCustomerId })
        .then((response) => {
          setClientSecret(response.data.clientSecret);
        })
        .catch((err) => {
          message.error('Failed to initialize payment setup');
          console.error(err);
        });
    }
  }, [isVisible, stripe, stripeCustomerId]);

  const handleSubmit = async () => {
    if (!stripe || !elements || !clientSecret) {
      message.error('Payment system not initialized');
      return;
    }

    try {
      setLoading(true);

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        message.error('Card input not found');
        return;
      }

      // Confirm the card setup
      const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        message.error(error.message || 'Failed to validate card');
        return;
      }

      // Send payment method ID to backend to attach and set as default
      const response = await axios.post(`${BACKEND_URL}/update-payment-method`, {
        customerId: stripeCustomerId,
        paymentMethodId: setupIntent.payment_method,
      });

      if (response.data.success) {
        message.success('Default payment card updated successfully');
        form.resetFields();
        cardElement.clear();
        onClose();
      } else {
        message.error(response.data.error || 'Failed to update default payment card');
      }
    } catch (error) {
      message.error('Failed to update card');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledModal
      title="Update Card Data"
      open={isVisible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Container>
        <Form form={form} layout="vertical">
          <FormItem label="Card Information">
            <CardElementContainer>
              <CardElement
                options={{
                  style: {
                    base: {
                      color: 'white',
                      fontSize: '16px',
                      '::placeholder': {
                        color: 'rgba(255, 255, 255, 0.5)',
                      },
                    },
                    invalid: {
                      color: '#fa755a',
                    },
                  },
                }}
              />
            </CardElementContainer>
          </FormItem>

          <FormItem>
            <SubmitButton
              onClick={handleSubmit}
              loading={loading}
              icon={<CreditCard size={20} />}
            >
              Update Card
            </SubmitButton>
          </FormItem>
        </Form>
      </Container>
    </StyledModal>
  );
};

export default UpdateCardModal;