import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      © 2025 Agro App. All rights reserved.
    </footer>
  );
};

const styles = {
  footer: { textAlign: 'center', padding: '10px', backgroundColor: '#28a745', color: '#fff', marginTop: '20px' }
};

export default Footer;