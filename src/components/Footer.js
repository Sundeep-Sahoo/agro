import React from 'react';

const Footer = () => {
  const styles = {
    footer: { 
      textAlign: 'center', 
      padding: '10px', 
      backgroundColor: '#28a745', 
      color: '#fff', 
      marginTop: '20px' 
    }
  };

  return (
    <footer style={styles.footer}>
      © 2025 Agro App. All rights reserved.
    </footer>
  );
};

export default Footer;