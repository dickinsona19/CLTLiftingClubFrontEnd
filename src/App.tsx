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
    url: "https://images.unsplash.com/photo-1574680376345-b2995af0324f?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Premium gym equipment",
    title: "ELITE EQUIPMENT",
    description: "Train with competition-grade equipment designed for champions"
  },
  {
    url: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    alt: "Elite weightlifting platform",
    title: "POWERLIFTING ZONE",
    description: "Dedicated platforms and premium equipment for serious lifters"
  },
  {
    url: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    alt: "Professional power rack area",
    title: "STRENGTH SANCTUARY",
    description: "Where legends are forged and limits are shattered"
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
      <Features onSaunaClick={scrollToRecovery} onColdPlungeClick={scrollToMembership} />
      <ImageCarousel images={gymImages} />
      <div ref={recoveryRef}>
        <Recovery />
      </div>
   
      <div ref={membershipRef}>
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

function SignUpPage() {
  return (
    <SignUpForm />
  );
}

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </Router>
  );
}

export default App;