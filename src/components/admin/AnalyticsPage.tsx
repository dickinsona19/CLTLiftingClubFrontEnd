import { useEffect, useState } from 'react';
import { Card, Select, Statistic, Row, Col, DatePicker, Spin } from 'antd';
import styled from 'styled-components';
import { TrendingUp, DollarSign, Users, Calendar, BarChart3 } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  padding: 0;
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

const { Option } = Select;

interface AnalyticsData {
  totalRevenue: number;
  userCount: number;
  averageRevenue: number;
  monthlyComparison: {
    thisMonth: number;
    lastMonth: number;
    percentageChange: number;
  };
  chartData: {
    labels: string[];
    thisMonth: number[];
    lastMonth: number[];
  };
  userTypeBreakdown: {
    [key: string]: {
      count: number;
      revenue: number;
    };
  };
}

const AnalyticsPage = () => {
  const [selectedUserType, setSelectedUserType] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalRevenue: 0,
    userCount: 0,
    averageRevenue: 0,
    monthlyComparison: {
      thisMonth: 0,
      lastMonth: 0,
      percentageChange: 0,
    },
    chartData: {
      labels: [],
      thisMonth: [],
      lastMonth: [],
    },
    userTypeBreakdown: {},
  });

  const userTypes = [
    { value: 'all', label: 'All Users' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'annual', label: 'Annual' },
    { value: 'founder', label: 'Founder' },
    { value: 'misc', label: 'Misc' },
  ];

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedUserType]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`https://boss-lifting-club-api.onrender.com/api/analytics?userType=${selectedUserType}`);
      
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      } else {
        // Mock data for development
        setAnalyticsData({
          totalRevenue: selectedUserType === 'all' ? 45750 : 
                       selectedUserType === 'monthly' ? 25000 :
                       selectedUserType === 'annual' ? 15000 :
                       selectedUserType === 'founder' ? 5000 : 750,
          userCount: selectedUserType === 'all' ? 458 :
                    selectedUserType === 'monthly' ? 250 :
                    selectedUserType === 'annual' ? 150 :
                    selectedUserType === 'founder' ? 50 : 8,
          averageRevenue: selectedUserType === 'all' ? 99.89 :
                         selectedUserType === 'monthly' ? 100 :
                         selectedUserType === 'annual' ? 100 :
                         selectedUserType === 'founder' ? 100 : 93.75,
          monthlyComparison: {
            thisMonth: selectedUserType === 'all' ? 45750 : 
                      selectedUserType === 'monthly' ? 25000 :
                      selectedUserType === 'annual' ? 15000 :
                      selectedUserType === 'founder' ? 5000 : 750,
            lastMonth: selectedUserType === 'all' ? 42300 :
                      selectedUserType === 'monthly' ? 23500 :
                      selectedUserType === 'annual' ? 14200 :
                      selectedUserType === 'founder' ? 4100 : 500,
            percentageChange: selectedUserType === 'all' ? 8.2 :
                             selectedUserType === 'monthly' ? 6.4 :
                             selectedUserType === 'annual' ? 5.6 :
                             selectedUserType === 'founder' ? 22.0 : 50.0,
          },
          chartData: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            thisMonth: selectedUserType === 'all' ? [10500, 11200, 12000, 12050] :
                      selectedUserType === 'monthly' ? [6000, 6200, 6400, 6400] :
                      selectedUserType === 'annual' ? [3500, 3800, 3900, 3800] :
                      selectedUserType === 'founder' ? [1000, 1200, 1400, 1400] : [150, 200, 200, 200],
            lastMonth: selectedUserType === 'all' ? [9800, 10500, 11000, 11000] :
                      selectedUserType === 'monthly' ? [5500, 5800, 6000, 6200] :
                      selectedUserType === 'annual' ? [3200, 3500, 3700, 3800] :
                      selectedUserType === 'founder' ? [900, 1000, 1100, 1100] : [100, 125, 150, 125],
          },
          userTypeBreakdown: {
            monthly: { count: 250, revenue: 25000 },
            annual: { count: 150, revenue: 15000 },
            founder: { count: 50, revenue: 5000 },
            misc: { count: 8, revenue: 750 },
          },
        });
      }
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

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
      },
    },
  };

  const lineChartData = {
    labels: analyticsData.chartData.labels,
    datasets: [
      {
        label: 'This Month',
        data: analyticsData.chartData.thisMonth,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Last Month',
        data: analyticsData.chartData.lastMonth,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(analyticsData.userTypeBreakdown),
    datasets: [
      {
        label: 'Revenue ($)',
        data: Object.values(analyticsData.userTypeBreakdown).map(item => item.revenue),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
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
                title="Total Revenue This Month"
                value={analyticsData.totalRevenue}
                precision={2}
                prefix={<DollarSign size={20} />}
                suffix=""
                formatter={(value) => `$${Number(value).toLocaleString()}`}
              />
            </StyledCard>

            <StyledCard>
              <Statistic
                title="Active Users"
                value={analyticsData.userCount}
                prefix={<Users size={20} />}
              />
            </StyledCard>

            <StyledCard>
              <Statistic
                title="Average Revenue per User"
                value={analyticsData.averageRevenue}
                precision={2}
                prefix={<DollarSign size={20} />}
                formatter={(value) => `$${Number(value).toFixed(2)}`}
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
          </MetricsGrid>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <ChartContainer>
                <ChartTitle>
                  <TrendingUp size={20} />
                  Revenue Comparison (This Month vs Last Month)
                </ChartTitle>
                <Line data={lineChartData} options={chartOptions} />
              </ChartContainer>
            </Col>

            <Col xs={24} lg={12}>
              <ChartContainer>
                <ChartTitle>
                  <BarChart3 size={20} />
                  Revenue by User Type
                </ChartTitle>
                <Bar data={barChartData} options={barChartOptions} />
              </ChartContainer>
            </Col>
          </Row>

          <StyledCard title="Monthly Comparison Details">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Statistic
                  title="This Month"
                  value={analyticsData.monthlyComparison.thisMonth}
                  prefix={<DollarSign size={16} />}
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Last Month"
                  value={analyticsData.monthlyComparison.lastMonth}
                  prefix={<DollarSign size={16} />}
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Difference"
                  value={analyticsData.monthlyComparison.thisMonth - analyticsData.monthlyComparison.lastMonth}
                  prefix={<DollarSign size={16} />}
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                  valueStyle={{ 
                    color: (analyticsData.monthlyComparison.thisMonth - analyticsData.monthlyComparison.lastMonth) >= 0 ? '#10B981' : '#EF4444' 
                  }}
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