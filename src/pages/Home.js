import React from 'react';
import background from '../assets/background.jpg';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Agro App</h1>
      <p style={styles.subtitle}>Empowering Agriculture with AI</p>
    </div>
  );
};

const styles = {
  container: { backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff', textAlign: 'center' },
  title: { fontSize: '3rem', fontWeight: 'bold' },
  subtitle: { fontSize: '1.5rem' }
};

export default Home;