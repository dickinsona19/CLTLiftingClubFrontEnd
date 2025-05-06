import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Space, Tabs, Select } from 'antd';
import { PlusCircle, Trash2, Edit, ShoppingBag } from 'lucide-react';
import styled from 'styled-components';
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

  }

  .ant-input, 
  .ant-input-number,
  .ant-select-selector {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
  

    &:hover, 
    &:focus {
      border-color: rgba(255, 255, 255, 0.3) !important;
      background: rgba(255, 255, 255, 0.05) !important;
    }
  }

  .ant-input-number-input {
    background: transparent !important;

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

  }

  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {

    }
  }

  .ant-tabs-ink-bar {

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
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPurchaseModalVisible, setIsPurchaseModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES.DRINKS);
  const { selectedUser } = useAdminStore();

  const API_URL = 'https://boss-lifting-club-api.onrender.com/products';

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleAddEdit = async (values) => {
    try {
      if (editingProduct) {
        // PUT to update
        const res = await fetch(`${API_URL}/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (!res.ok) throw new Error('Failed to update product');
        const updated = await res.json();
        setProducts(products.map(p => (p.id === editingProduct.id ? updated : p)));
        message.success('Product updated successfully');
      } else {
        // POST to add
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...values, category: values.category || activeCategory }),
        });

        if (!res.ok) throw new Error('Failed to add product');
        const newProduct = await res.json();
        setProducts([...products, newProduct]);
        message.success('Product added successfully');
      }

      form.resetFields();
      setIsModalVisible(false);
    } catch (err) {
      console.error(err);
      message.error('Error saving product');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setProducts(products.filter(p => p.id !== id));
      message.success('Product deleted successfully');
    } catch (err) {
      console.error(err);
      message.error('Failed to delete product');
    }
  };

  const columns = [
    {
      title: 'Image',
      key: 'image',
      render: (text, record) => (
        <img src={record.imageUrl} alt={record.name} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }} />
      ),
    },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price', render: price => `$${price?.toFixed(2)}` },
    { title: 'Description', dataIndex: 'definition', key: 'definition', ellipsis: true },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<Edit size={16} />}
            onClick={() => {
              setEditingProduct(record);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<Trash2 size={16} />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredProducts = products.filter(p => p.category === activeCategory);

  const items = Object.values(CATEGORIES).map(category => ({
    key: category,
    label: category,
    children: (
      <>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <Button
              icon={<PlusCircle size={16} />}
              onClick={() => {
                setEditingProduct(null);
                form.resetFields();
                setIsModalVisible(true);
              }}
            >
              Add Product
            </Button>
            {selectedUser && (
              <Button icon={<ShoppingBag size={16} />} onClick={() => setIsPurchaseModalVisible(true)}>
                Purchase Products
              </Button>
            )}
          </Space>
        </div>
        <Table columns={columns} dataSource={filteredProducts} rowKey="id" loading={loading} />
      </>
    ),
  }));

  return (
    <Container>
      <StyledTabs items={items} onChange={setActiveCategory} defaultActiveKey={CATEGORIES.DRINKS} />

      <StyledModal
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        open={isModalVisible}
        onOk={form.submit}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleAddEdit} initialValues={{ category: activeCategory }}>
          <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select>
              {Object.values(CATEGORIES).map(category => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" prefix="$" />
          </Form.Item>
          <Form.Item name="definition" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="imageUrl" label="Image URL" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </StyledModal>

      <PurchaseModal isVisible={isPurchaseModalVisible} onClose={() => setIsPurchaseModalVisible(false)} userId={selectedUser?.stripeCustomerId} />
    </Container>
  );
};

export default ProductsManager;