import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Header = () => {
  const styles = {
    header: { 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '10px 20px', 
      backgroundColor: '#28a745' 
    },
    logoContainer: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      overflow: 'hidden',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)', // 3D shadow effect
      transition: 'transform 0.3s ease-in-out', // Zoom effect
    },
    logo: {
      width: '100%',
      height: 'auto',
      transform: 'scale(1.1)', // Slight zoom effect
    },
    nav: {
      display: 'flex',
      gap: '20px',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: '1rem',
      transition: 'transform 0.3s ease-in-out', // Hover effect
    },
    linkHover: {
      transform: 'scale(1.1)', // Slight zoom on hover
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>
      <nav style={styles.nav}>
        <Link 
          to="/" 
          style={styles.link} 
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Home
        </Link>
        <Link 
          to="/feedback" 
          style={styles.link} 
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Feedback
        </Link>
        <Link 
          to="/prediction" 
          style={styles.link} 
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Prediction
        </Link>
        <Link 
          to="/report" 
          style={styles.link} 
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Report
        </Link>
      </nav>
    </header>
  );
};

export default Header;