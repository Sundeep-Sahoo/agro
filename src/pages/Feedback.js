import React, { useState } from 'react';
import { pageStyles } from '../styles';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your feedback: ${feedback}`);
  };

  return (
    <div style={pageStyles.container}>
      <div style={pageStyles.overlay}></div>
      <div style={pageStyles.card}>
        <h2 style={pageStyles.title}>Feedback Form</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            style={pageStyles.textarea}
            placeholder="Enter your feedback here..."
          />
          <button
            type="submit"
            style={pageStyles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#218838')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#28a745')}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;