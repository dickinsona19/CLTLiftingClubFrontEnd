import styled from 'styled-components';
import { CommunityHero } from '../community/CommunityHero';
import { CommunityStats } from '../community/CommunityStats';
import { CommunityGallery } from '../community/CommunityGallery';
import { CommunityLocation } from '../community/CommunityLocation';
import { CommunityInstagram } from '../community/CommunityInstagram';
import { Footer } from '../Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: white;
  overflow-x: hidden;
`;

const CommunityPage = () => {
  return (
    <PageContainer>
      <CommunityInstagram />
      <CommunityGallery />
      {/* <CommunityLocation /> */}

      <Footer />
    </PageContainer>
  );
};

export default CommunityPage;