import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Header = () => {
  return (
    <header style={styles.header}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <nav>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/feedback" style={styles.link}>Feedback</Link>
        <Link to="/prediction" style={styles.link}>Prediction</Link>
        <Link to="/report" style={styles.link}>Report</Link>
      </nav>
    </header>
  );
};

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#28a745' },
  logo: { height: '50px' },
  link: { margin: '0 10px', color: '#fff', textDecoration: 'none' }
};

export default Header;