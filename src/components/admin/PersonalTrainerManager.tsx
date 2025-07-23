import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Space, InputNumber } from 'antd';
import { PlusCircle, Trash2, Edit, User, Plus, Minus } from 'lucide-react';
import styled from 'styled-components';

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

  .ant-table-tbody > tr:hover > td {
    background: rgba(255, 255, 255, 0.1) !important;
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
  display: flex;
  align-items: center;
  gap: 1rem;
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

  .ant-input {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    color: white !important;

    &:hover, 
    &:focus {
      border-color: rgba(255, 255, 255, 0.3) !important;
      background: rgba(255, 255, 255, 0.05) !important;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.5) !important;
    }
  }
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CounterButton = styled(Button)`
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    border-color: rgba(255, 255, 255, 0.3) !important;
    color: white !important;
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(255, 255, 255, 0.1) !important;
    color: rgba(255, 255, 255, 0.3) !important;
  }
`;

const CounterDisplay = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  min-width: 40px;
  text-align: center;
`;

interface PersonalTrainer {
  id: string;
  firstName: string;
  lastName: string;
  sessionCounter: number;
}

const PersonalTrainerManager = () => {
  const [trainers, setTrainers] = useState<PersonalTrainer[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingTrainer, setEditingTrainer] = useState<PersonalTrainer | null>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = 'https://boss-lifting-club-api.onrender.com/api/trainers';

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch trainers');
      const data = await response.json();
      setTrainers(data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
      message.error('Failed to load personal trainers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEdit = async (values: { firstName: string; lastName: string }) => {
    try {
      if (editingTrainer) {
        // Update existing trainer
        const response = await fetch(`${API_URL}/${editingTrainer.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (!response.ok) throw new Error('Failed to update trainer');
        const updated = await response.json();
        setTrainers(trainers.map(t => (t.id === editingTrainer.id ? updated : t)));
        message.success('Personal trainer updated successfully');
      } else {
        // Add new trainer
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...values, sessionCounter: 0 }),
        });

        if (!response.ok) throw new Error('Failed to add trainer');
        const newTrainer = await response.json();
        setTrainers([...trainers, newTrainer]);
        message.success('Personal trainer added successfully');
      }

      form.resetFields();
      setIsModalVisible(false);
      setEditingTrainer(null);
    } catch (error) {
      console.error('Error saving trainer:', error);
      message.error('Failed to save personal trainer');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete trainer');
      setTrainers(trainers.filter(t => t.id !== id));
      message.success('Personal trainer deleted successfully');
    } catch (error) {
      console.error('Error deleting trainer:', error);
      message.error('Failed to delete personal trainer');
    }
  };

  const updateSessionCount = async (trainerId: string, increment: boolean) => {
    try {
      const trainer = trainers.find(t => t.id === trainerId);
      if (!trainer) return;

      const newCount = increment ? trainer.sessionCounter + 1 : Math.max(0, trainer.sessionCounter - 1);
      
      const response = await fetch(`${API_URL}/${trainer.id}/session-counter?sessionCounter=${newCount}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to update session count');
      const updated = await response.json();
      setTrainers(trainers.map(t => (t.id === trainerId ? updated : t)));
      message.success(`Session count ${increment ? 'increased' : 'decreased'}`);
    } catch (error) {
      console.error('Error updating session count:', error);
      message.error('Failed to update session count');
    }
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Training Sessions',
      key: 'sessionCount',
      render: (_: any, record: PersonalTrainer) => (
        
        <CounterContainer>
          <CounterButton
            onClick={() => {
              console.log(record);
              updateSessionCount(record.id, false);
            }}
            disabled={record.sessionCounter === 0}
            icon={<Minus size={16} />}
          />
          <CounterDisplay>{record.sessionCounter}</CounterDisplay>
          
          <CounterButton
            onClick={() => updateSessionCount(record.id, true)}
            icon={<Plus size={16} />}
          />
        </CounterContainer>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: PersonalTrainer) => (
        <Space>
         
          <Popconfirm
            title="Are you sure you want to delete this trainer?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <ActionButton 
              icon={<Trash2 size={16} />} 
              size="small"
            >
              Delete
            </ActionButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Container>
      <Header>
        <Title>
          <User size={24} />
          Personal Trainers
        </Title>
        <ActionButton
          icon={<PlusCircle size={16} />}
          onClick={() => {
            setEditingTrainer(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Add Trainer
        </ActionButton>
      </Header>

      <Table
        columns={columns}
        dataSource={trainers}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <StyledModal
        title={editingTrainer ? 'Edit Personal Trainer' : 'Add Personal Trainer'}
        open={isModalVisible}
        onOk={form.submit}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingTrainer(null);
        }}
        okText={editingTrainer ? 'Update' : 'Add'}
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddEdit}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter first name' }]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter last name' }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>
        </Form>
      </StyledModal>
    </Container>
  );
};

export default PersonalTrainerManager;