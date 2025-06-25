import styled from 'styled-components';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Nav = styled(motion.nav)<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
  background: ${props => props.scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent'};
  border-bottom: ${props => props.scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'};
  transition: all 0.3s ease;
`;

const Logo = styled(Link)`
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  letter-spacing: 2px;
  cursor: pointer;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  @media (min-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled(motion.div)<{ isOpen: boolean; scrolled: boolean }>`
  position: fixed;
  top: 5rem;
  left: 0;
  right: 0;
  background: rgba(10, 10, 10, 0.98);
  padding: 2rem;
  border-radius: 0 0 1rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (min-width: 768px) {
    position: static;
    background: none;
    padding: 0;
    border: none;
    display: flex;
    gap: 3rem;
  }
`;

const NavLink = styled(Link)`
  display: block;
  width: 100%;
  padding: 1rem;
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: none;
  border: none;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0.75rem;
    left: 1rem;
    right: 1rem;
    height: 1px;
    background: white;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: rgba(255, 255, 255, 0.8);
    &:after {
      transform: scaleX(1);
    }
  }
  
  @media (min-width: 768px) {
    width: auto;
    padding: 0.5rem 0;
  }
`;



export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <Nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      scrolled={scrolled}
    >
      <Logo to="/">CLT LIFTING CLUB</Logo>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </MenuButton>
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <NavLinks
            isOpen={isOpen}
            scrolled={scrolled}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* <NavLink to="/signup?contract=Founding" > */}
            <NavLink to="Memberships" >
              Memberships
            </NavLink>
            {/* <NavLink to="/free-pass" >
              Free Pass
            </NavLink> */}
          </NavLinks>
        )}
      </AnimatePresence>
    </Nav>
  );
};