import { useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Space, Tabs, Select } from 'antd';
import { PlusCircle, Trash2, Edit, ShoppingBag } from 'lucide-react';
import styled from 'styled-components';
import { mockProducts } from '../../mockData/products';
import { useAdminStore } from '../../contexts/AdminContext';
import PurchaseModal from './PurchaseModal';

const Container = styled.div`
  .ant-table {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }

  .ant-table-thead > tr > th {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: white;
  margin: 0;
`;

const ActionButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    border-color: rgba(255, 255, 255, 0.3) !important;
    color: white !important;
  }
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`;

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

  .ant-input, .ant-select-selector {
    background: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    color: white !important;

    &:hover, &:focus {
      border-color: rgba(255, 255, 255, 0.3) !important;
    }
  }

  .ant-select-arrow {
    color: rgba(255, 255, 255, 0.5);
  }

  .ant-select-selection-placeholder {
    color: rgba(255, 255, 255, 0.5) !important;
  }
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 2rem;
    
    &::before {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  .ant-tabs-tab {
    color: rgba(255, 255, 255, 0.7);
    
    &:hover {
      color: white;
    }
  }

  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: white !important;
    }
  }

  .ant-tabs-ink-bar {
    background: white;
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CATEGORIES = {
  DRINKS: 'Drinks',
  FOOD: 'Food',
  APPAREL: 'Apparel',
  MISC: 'Misc'
};

const ProductsManager = () => {
  const [products, setProducts] = useState(mockProducts);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPurchaseModalVisible, setIsPurchaseModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES.DRINKS);
  const { selectedUser } = useAdminStore();

  const handleAddEdit = async (values) => {
    try {
      if (editingProduct) {
        // Update existing product
        const updatedProducts = products.map(p => 
          p.id === editingProduct.id ? { ...values, id: p.id } : p
        );
        setProducts(updatedProducts);
        message.success('Product updated successfully');
      } else {
        // Add new product
        const newProduct = {
          ...values,
          id: (Math.max(...products.map(p => parseInt(p.id))) + 1).toString(),
          category: values.category || activeCategory
        };
        setProducts([...products, newProduct]);
        message.success('Product added successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error saving product:', error);
      message.error('Failed to save product');
    }
  };

  const handleDelete = async (id) => {
    try {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      message.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      message.error('Failed to delete product');
    }
  };

  const columns = [
    {
      title: 'Image',
      key: 'image',
      render: (text, record) => (
        <ProductImage src={record.imageUrl || 'https://via.placeholder.com/50'} alt={record.name} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price?.toFixed(2) || '0.00'}`,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <ActionButton
            icon={<Edit size={16} />}
            onClick={() => {
              setEditingProduct(record);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <ActionButton icon={<Trash2 size={16} />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredProducts = products.filter(product => product.category === activeCategory);

  const items = Object.values(CATEGORIES).map(category => ({
    key: category,
    label: category,
    children: (
      <>
        <ActionBar>
          <Space>
            <ActionButton
              icon={<PlusCircle size={16} />}
              onClick={() => {
                setEditingProduct(null);
                form.resetFields();
                setIsModalVisible(true);
              }}
            >
              Add Product
            </ActionButton>
            {selectedUser && (
              <ActionButton
                icon={<ShoppingBag size={16} />}
                onClick={() => setIsPurchaseModalVisible(true)}
              >
                Purchase Products
              </ActionButton>
            )}
          </Space>
        </ActionBar>
        <Table
          columns={columns}
          dataSource={filteredProducts}
          loading={loading}
          rowKey="id"
        />
      </>
    ),
  }));

  return (
    <Container>
      <StyledTabs 
        items={items} 
        onChange={(key) => setActiveCategory(key)}
        defaultActiveKey={CATEGORIES.DRINKS}
      />

      <StyledModal
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        open={isModalVisible}
        onOk={form.submit}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddEdit}
          initialValues={{ category: activeCategory }}
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select>
              {Object.values(CATEGORIES).map(category => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <Input type="number" prefix="$" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Image URL"
            rules={[{ required: true, message: 'Please enter image URL' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </StyledModal>

      <PurchaseModal
        isVisible={isPurchaseModalVisible}
        onClose={() => setIsPurchaseModalVisible(false)}
        userId={selectedUser?.id}
      />
    </Container>
  );
};

export default ProductsManager;