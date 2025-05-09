import { useEffect, useState } from 'react';
import { Modal, Select, InputNumber, Form, message, Spin } from 'antd';
import styled from 'styled-components';
import { useAdminStore } from '../../contexts/AdminContext';
const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: #2a2a2a;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .ant-modal-header {
    background: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .ant-modal-title {
    color: white;
  }

  .ant-modal-close-x {
    color: white;
  }

  .ant-form-item-label > label {
    color: white;
  }
  `
;

const ProductSelect = styled(Select)
`
  .ant-select-selector {
    background: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    color: white !important;
  }

  .ant-select-selection-item {
    color: white !important;
  }

  .ant-select-arrow {
    color: rgba(255, 255, 255, 0.5);
  }
  `
;

const ProductOption = styled.div
`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  `
;

const ProductImage = styled.img
`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  `
;

const ProductInfo = styled.div`
  flex: 1;
  `
;

const ProductName = styled.div
`
  font-weight: 500;
  `
;

const ProductPrice = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  `
;

const StyledInputNumber = styled(InputNumber)`
  width: 100%;
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;

  .ant-input-number-input {
    color: white !important;
  }

  .ant-input-number-handler {
    border-color: rgba(255, 255, 255, 0.1) !important;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1) !important;
    }
  }

  .ant-input-number-handler-up-inner,
  .ant-input-number-handler-down-inner {
    color: rgba(255, 255, 255, 0.5) !important;
  }
  `
;

const TotalAmount = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  span:first-child {
    color: rgba(255, 255, 255, 0.7);
  }
  
  span:last-child {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
  }
  `
;

interface PurchaseModalProps {
  isVisible: boolean;
  onClose: () => void;
  userId: string;
}

const PurchaseModal = ({ isVisible, onClose, userId }: PurchaseModalProps) => {
  const { selectedUser, setSelectedUser } = useAdminStore();
  const [form] = Form.useForm();
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const API_URL = 'https://boss-lifting-club-api.onrender.com/products'; // Replace with your actual URL

  useEffect(() => {
    if (isVisible) fetchProducts();
  }, [isVisible]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      message.error('Could not load products');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (value: string) => {
    const product = products.find(p => p.id === value);
    setSelectedProduct(product);
    setQuantity(1);
  };
  const handlePurchase = async () => {
    try {
      setIsPurchasing(true); // start loading
      const values = await form.validateFields();
      const total = selectedProduct.price * quantity;
  
      const res = await fetch(`${API_URL}/purchaseProduct?productId=${values.productId}&stripeCustomerId=${selectedUser.userStripeMemberId}&quantity=${values.quantity}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: values.productId,
          stripeCustomerId: selectedUser.userStripeMemberId,
          quantity: values.quantity,
        }),
      });
  
      message.success(`Purchase successful! Total: $${total.toFixed(2)}`);
      form.resetFields();
      setSelectedProduct(null);
      setQuantity(1);
      onClose();
    } catch (error) {
      message.error('Failed to process purchase');
    } finally {
      setIsPurchasing(false); // stop loading
    }
  };

  return (
    <StyledModal
      title="Purchase Product"
      open={isVisible}
      onOk={handlePurchase}
      onCancel={onClose}
      okText="Complete Purchase"
      cancelText="Cancel"
      confirmLoading={isPurchasing}
    >
      {loading ? (
        <Spin tip="Loading products..." />
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item
            name="productId"
            label="Select Product"
            rules={[{ required: true, message: 'Please select a product' }]}
          >
            <ProductSelect
              placeholder="Choose a product"
              onChange={handleProductSelect}
              optionLabelProp="label"
              getPopupContainer={trigger => trigger.parentElement} // fixes scroll
              showSearch
              filterOption={(input, option) =>
                (option?.label as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              {products.map(product => (
                <Select.Option
                  key={product.id}
                  value={product.id}
                  label={product.name}
                >
                  <ProductOption>
                    <ProductImage src={product.imageUrl} alt={product.name} />
                    <ProductInfo>
                      <ProductName>{product.name}</ProductName>
                      <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                    </ProductInfo>
                  </ProductOption>
                </Select.Option>
              ))}
            </ProductSelect>
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: 'Please enter quantity' }]}
          >
            <StyledInputNumber
              min={1}
              max={10}
              value={quantity}
              onChange={value => setQuantity(value)}
            />
          </Form.Item>

          {selectedProduct && (
            <TotalAmount>
              <span>Total Amount:</span>
              <span>${(selectedProduct.price * quantity).toFixed(2)}</span>
            </TotalAmount>
          )}
        </Form>
      )}
    </StyledModal>
  );
};

export default PurchaseModal;
