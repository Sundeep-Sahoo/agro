import React, { useState } from 'react';
import { pageStyles } from '../styles';

const Prediction = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePredict = () => {
    // Mock prediction logic
    setResult(`Predicted Yield: ${Math.floor(Math.random() * 100)} tons`);
  };

  return (
    <div style={pageStyles.container}>
      <div style={pageStyles.overlay}></div>
      <div style={pageStyles.card}>
        <h2 style={pageStyles.title}>Prediction</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={pageStyles.input}
          placeholder="Enter data..."
        />
        <button
          onClick={handlePredict}
          style={pageStyles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#218838')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#28a745')}
        >
          Predict
        </button>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default Prediction;