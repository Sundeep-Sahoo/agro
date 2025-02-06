import React, { useState } from 'react';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your feedback: ${feedback}`);
  };

  return (
    <div style={styles.container}>
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} style={styles.textarea} placeholder="Enter your feedback here..." />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '600px', margin: '0 auto' },
  form: { display: 'flex', flexDirection: 'column' },
  textarea: { padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' },
  button: { padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }
};

export default Feedback;