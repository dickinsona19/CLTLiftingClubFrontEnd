import styled from 'styled-components';
import { Membership } from '../Membership';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
`;

const MembershipPage = () => {
  return (
    <PageContainer>
      <Navbar />
      <Membership />
      <Footer />
    </PageContainer>
  );
};

export default MembershipPage;