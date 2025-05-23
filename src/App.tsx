import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ImageCarousel } from './components/ImageCarousel';
import { Recovery } from './components/Recovery';
import { Membership } from './components/Membership';
import { FreePass } from './components/FreePass';
import { FAQ } from './components/FAQ';
import { SignUpForm } from './components/signupPage/SignUpForm';
import SuccessPage from './components/signupPage/SuccessPage';
import TermsAndConditions from './components/signupPage/TermsAndConditions';
import { LocationMap } from './components/LocationMap';
import SignWaiver from './components/SignWaiver';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ResetPassword from './components/ResetPassword';
import { AdminProvider } from './contexts/AdminContext';
import JustDoIt from './assets/JustDoIt.jpg'
import CloseWeightRack from './assets/CloseWeightRack.jpg'
import CloseUpDumbell from './assets/CloseUpDumbell.jpg'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    background: #0a0a0a;
    color: #ffffff;
  }

  ::selection {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
`;

const gymImages = [
  {
    url: JustDoIt,
    alt: "Premium gym equipment",
    title: "ELITE EQUIPMENT",
    description: "Access high-quality equipment for a professional workout experience"
  },
  {
    url: CloseWeightRack,
    alt: "Elite weightlifting platform",
    title: "POWERLIFTING ZONE",
    description: "Dedicated platforms and premium equipment for serious lifters"
  },
  {
    url: CloseUpDumbell,
    alt: "Professional power rack area",
    title: "STRENGTH SANCTUARY",
    description: "A space for pushing boundaries"
  }
];

function HomePage() {
  const membershipRef = useRef<HTMLDivElement>(null);
  const freePassRef = useRef<HTMLDivElement>(null);
  const recoveryRef = useRef<HTMLDivElement>(null);

  const scrollToMembership = () => {
    membershipRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFreePass = () => {
    freePassRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRecovery = () => {
    recoveryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero onJoinClick={scrollToMembership} onFreePassClick={scrollToFreePass} />
      <div ref={membershipRef}>
        <Membership/>
      </div>
      <Features onSaunaClick={scrollToRecovery} onColdPlungeClick={scrollToMembership} />
      <ImageCarousel images={gymImages} />
      <div ref={recoveryRef}>
        <Recovery />
      </div>
      <div >
        <Membership/>
      </div>
      <LocationMap/>
      <div ref={freePassRef}>
        <FreePass />
      </div>
      <FAQ />
    </>
  );
}

function App() {
  return (
    <Router>
      <AdminProvider>
        <GlobalStyle />
        {location.pathname !== '/signWaiver' && 
         !location.pathname.includes('/admin') && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/signWaiver" element={<SignWaiver/>} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </AdminProvider>
    </Router>
  );
}

export default App;