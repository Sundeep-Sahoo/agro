import React from 'react';
import { pageStyles } from '../styles';

const Home = () => {
  return (
    <div style={pageStyles.container}>
      <div style={pageStyles.overlay}></div>
      <div style={pageStyles.card}>
        <h1 style={pageStyles.title}>Welcome to Agro App</h1>
        <p>Empowering Agriculture with AI</p>
      </div>
    </div>
  );
};

export default Home;