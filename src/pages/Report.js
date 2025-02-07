import React from 'react';
import { pageStyles } from '../styles';

const Report = () => {
  return (
    <div style={pageStyles.container}>
      <div style={pageStyles.overlay}></div>
      <div style={pageStyles.card}>
        <h2 style={pageStyles.title}>Report</h2>
        <p>This is where your reports will be displayed.</p>
      </div>
    </div>
  );
};

export default Report;