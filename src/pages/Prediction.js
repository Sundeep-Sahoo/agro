import React, { useState } from 'react';

const Prediction = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePredict = () => {
    // Mock prediction logic
    setResult(`Predicted Yield: ${Math.floor(Math.random() * 100)} tons`);
  };

  return (
    <div style={styles.container}>
      <h2>Prediction</h2>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter data..." style={styles.input} />
      <button onClick={handlePredict} style={styles.button}>Predict</button>
      <p>{result}</p>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '600px', margin: '0 auto' },
  input: { padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' },
  button: { padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }
};

export default Prediction;