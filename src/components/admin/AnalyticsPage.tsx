import { useEffect, useState } from 'react';
import { Card, Select, Statistic, Row, Col, Spin, Table, Checkbox } from 'antd';
import styled from 'styled-components';
import { TrendingUp, DollarSign, Users, BarChart3, RotateCcw } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import moment from 'moment';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  padding: 0;
  overflow-y: auto;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title2 = styled.h2`
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.75rem;
  font-weight: 700;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledSelect = styled(Select)`
  min-width: 150px;

  .ant-select-selector {
    background: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    color: white !important;
    height: 40px;
  }

  .ant-select-selection-item {
    color: white !important;
    line-height: 38px;
  }

  .ant-select-arrow {
    color: rgba(255, 255, 255, 0.5);
  }

  &:hover .ant-select-selector {
    border-color: rgba(255, 255, 255, 0.3) !important;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  color: rgba(255, 255, 255, 0.8);

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #3B82F6;
    border-color: #3B82F6;
  }
`;

const StyledCard = styled(Card)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-bottom: 1.5rem;

  .ant-card-head {
    background: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    .ant-card-head-title {
      color: white;
      font-weight: 600;
    }
  }

  .ant-card-body {
    padding: 1.5rem;
  }

  .ant-statistic-title {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .ant-statistic-content {
    color: white;
    font-size: 2rem;
    font-weight: 700;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ChartTitle = styled.h3`
  color: white;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const FilterLabel = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
`;

const StyledTable = styled(Table)`
  .ant-table {
    background: transparent;
    color: white;
  }
  .ant-table-thead > tr > th {
    background: rgba(255, 255, 255, 0.05);
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
  }
  .ant-table-tbody > tr:hover > td {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const { Option } = Select;

interface AnalyticsData {
  totalRevenue: number;
  userCount: number;
  projectedRevenue: number;
  monthlyComparison: {
    thisMonth: number;
    lastMonth: number;
    percentageChange: number;
    total: number;
  };
  chartData: {
    labels: string[];
    thisMonthActual: number[];
    thisMonthProjected: number[];
  };
  userTypeBreakdown: {
    [key: string]: {
      count: number;
      revenue: number;
      ltv: number;
    };
  };
  churnCount: number;
  churnRate: number;
  newSubscriptions: number;
  mrr: number;
  totalLifetimeRevenue: number;
  averageLTV: number;
}

const AnalyticsPage = () => {
  const [selectedUserType, setSelectedUserType] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>(moment().format('YYYY-MM'));
  const [includeMaintenance, setIncludeMaintenance] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalRevenue: 0,
    userCount: 0,
    projectedRevenue: 0,
    monthlyComparison: {
      thisMonth: 0,
      lastMonth: 0,
      percentageChange: 0,
      total: 0,
    },
    chartData: {
      labels: [],
      thisMonthActual: [],
      thisMonthProjected: [],
    },
    userTypeBreakdown: {},
    churnCount: 0,
    churnRate: 0,
    newSubscriptions: 0,
    mrr: 0,
    totalLifetimeRevenue: 0,
    averageLTV: 0,
  });

  const userTypes = [
    { value: 'all', label: 'All Users' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'annual', label: 'Annual' },
    { value: 'founder', label: 'Founder' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'misc', label: 'Misc' },
  ];

  // Generate last 24 months for selection
  const monthOptions = [];
  for (let i = 0; i < 24; i++) {
    const monthDate = moment().subtract(i, 'months');
    monthOptions.push({
      value: monthDate.format('YYYY-MM'),
      label: monthDate.format('MMMM YYYY'),
    });
  }

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://boss-lifting-club-api.onrender.com/api/analytics?userType=${selectedUserType}&month=${selectedMonth}&includeMaintenance=${includeMaintenance}`, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          const formattedData = {
            ...data,
            chartData: {
              labels: data.chartData.labels,
              thisMonthActual: data.chartData.thisMonthActual.map((value) => Number(value)),
              thisMonthProjected: data.chartData.thisMonthProjected.map((value) => Number(value)),
            },
          };
          setAnalyticsData(formattedData);
        } else {
          console.error('Failed to fetch analytics data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyticsData();
  }, [selectedUserType, selectedMonth, includeMaintenance]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white',
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        stacked: true,
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
  };

  const revenueChartData = {
    labels: analyticsData.chartData.labels,
    datasets: [
      {
        label: 'Actual Revenue',
        data: analyticsData.chartData.thisMonthActual,
        backgroundColor: '#3B82F6',
        stack: 'revenue',
      },
      {
        label: 'Projected Revenue',
        data: analyticsData.chartData.thisMonthProjected,
        backgroundColor: '#10B981',
        stack: 'revenue',
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(analyticsData.userTypeBreakdown),
    datasets: [
      {
        label: 'Lifetime Revenue ($)',
        data: Object.values(analyticsData.userTypeBreakdown).map(item => item.revenue),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#EC4899',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        beginAtZero: true,
      },
    },
  };

  const tableColumns = [
    {
      title: 'User Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Active Subscriptions',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Lifetime Revenue ($)',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value: number) => `$${Number(value).toLocaleString()}`,
    },
    {
      title: 'LTV ($)',
      dataIndex: 'ltv',
      key: 'ltv',
      render: (value: number) => `$${Number(value).toLocaleString()}`,
    },
  ];

  const tableData = Object.entries(analyticsData.userTypeBreakdown).map(([type, data]) => ({
    key: type,
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count: data.count,
    revenue: data.revenue,
    ltv: data.ltv,
  }));

  return (
    <Container>
      <Header>
        <Title2>
          <BarChart3 size={28} />
          Analytics Dashboard
        </Title2>
        <FilterSection>
          <FilterLabel>User Type:</FilterLabel>
          <StyledSelect
            value={selectedUserType}
            onChange={setSelectedUserType}
            placeholder="Select user type"
          >
            {userTypes.map(type => (
              <Option key={type.value} value={type.value}>
                {type.label}
              </Option>
            ))}
          </StyledSelect>
          <FilterLabel>Month:</FilterLabel>
          <StyledSelect
            value={selectedMonth}
            onChange={setSelectedMonth}
            placeholder="Select month"
            dropdownStyle={{ maxHeight: '300px', overflowY: 'auto' }}
          >
            {monthOptions.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </StyledSelect>
          <StyledCheckbox checked={includeMaintenance} onChange={e => setIncludeMaintenance(e.target.checked)}>
            Include Maintenance Fee
          </StyledCheckbox>
        </FilterSection>
      </Header>

      {loading ? (
        <LoadingContainer>
          <Spin size="large" />
        </LoadingContainer>
      ) : (
        <>
          <MetricsGrid>
            <StyledCard>
              <Statistic
                title="Actual Revenue (Selected Month)"
                value={analyticsData.totalRevenue}
                precision={2}
                prefix={<DollarSign size={20} />}
                formatter={(value) => `$${Number(value).toLocaleString()}`}
              />
            </StyledCard>

            <StyledCard>
              <Statistic
                title="Active Subscriptions (End of Month)"
                value={analyticsData.userCount}
                prefix={<Users size={20} />}
              />
            </StyledCard>

            <StyledCard>
              <Statistic
                title="Projected Revenue (Rest of Month)"
                value={analyticsData.projectedRevenue}
                precision={2}
                prefix={<DollarSign size={20} />}
                formatter={(value) => `$${Number(value).toLocaleString()}`}
              />
            </StyledCard>

            <StyledCard>
              <Statistic
                title="Month-over-Month Growth"
                value={analyticsData.monthlyComparison.percentageChange}
                precision={1}
                suffix="%"
                prefix={<TrendingUp size={20} />}
                valueStyle={{ 
                  color: analyticsData.monthlyComparison.percentageChange >= 0 ? '#10B981' : '#EF4444' 
                }}
              />
            </StyledCard>

            <StyledCard>
              <Statistic
                title="Churn Rate"
                value={analyticsData.churnRate}
                precision={1}
                suffix="%"
                valueStyle={{ color: analyticsData.churnRate > 0 ? '#EF4444' : '#10B981' }}
              />
            </StyledCard>

            <StyledCard>
              <Statistic
                title="Churn Count"
                value={analyticsData.churnCount}
                prefix={<RotateCcw size={20} />}
              />
            </StyledCard>

            <StyledCard>
              <Statistic
                title="New Subscriptions"
                value={analyticsData.newSubscriptions}
                prefix={<Users size={20} />}
              />
            </StyledCard>

            <StyledCard>
              <Statistic
                title="MRR (End of Month)"
                value={analyticsData.mrr}
                precision={2}
                prefix={<DollarSign size={20} />}
                formatter={(value) => `$${Number(value).toLocaleString()}`}
              />
            </StyledCard>

            <StyledCard>
              <Statistic
                title="Total Lifetime Revenue"
                value={analyticsData.totalLifetimeRevenue}
                precision={2}
                prefix={<DollarSign size={20} />}
                formatter={(value) => `$${Number(value).toLocaleString()}`}
              />
            </StyledCard>

            <StyledCard>
              <Statistic
                title="Average LTV"
                value={analyticsData.averageLTV}
                precision={2}
                prefix={<DollarSign size={20} />}
                formatter={(value) => `$${Number(value).toLocaleString()}`}
              />
            </StyledCard>
          </MetricsGrid>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <ChartContainer>
                <ChartTitle>
                  <TrendingUp size={20} />
                  Revenue Over Time (Last 6 Months)
                </ChartTitle>
                <Bar data={revenueChartData} options={chartOptions} />
              </ChartContainer>
            </Col>

            <Col xs={24} lg={12}>
              <ChartContainer>
                <ChartTitle>
                  <BarChart3 size={20} />
                  Lifetime Revenue by User Type
                </ChartTitle>
                <Bar data={barChartData} options={barChartOptions} />
              </ChartContainer>
            </Col>
          </Row>

          <StyledCard title="User Type Breakdown">
            <StyledTable
              columns={tableColumns}
              dataSource={tableData}
              pagination={false}
            />
          </StyledCard>

          <StyledCard title="Monthly Comparison Details">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={6}>
                <Statistic
                  title="Selected Month (Actual)"
                  value={analyticsData.monthlyComparison.thisMonth}
                  prefix={<DollarSign size={16} />}
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
              </Col>
              <Col xs={24} sm={6}>
                <Statistic
                  title="Selected Month (Projected)"
                  value={analyticsData.projectedRevenue}
                  prefix={<DollarSign size={16} />}
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
              </Col>
              <Col xs={24} sm={6}>
                <Statistic
                  title="Selected Month (Total)"
                  value={analyticsData.monthlyComparison.total}
                  prefix={<DollarSign size={16} />}
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
              </Col>
              <Col xs={24} sm={6}>
                <Statistic
                  title="Previous Month"
                  value={analyticsData.monthlyComparison.lastMonth}
                  prefix={<DollarSign size={16} />}
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
              </Col>
            </Row>
          </StyledCard>
        </>
      )}
    </Container>
  );
};

export default AnalyticsPage;