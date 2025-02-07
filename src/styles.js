export const pageStyles = {
    container: {
      backgroundImage: `url(${require('../src/assets/background.jpg')})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dimming effect
    },
    card: {
      position: 'relative',
      zIndex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
      maxWidth: '500px',
      width: '100%',
      textAlign: 'center',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333',
    },
    input: {
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: '100%',
    },
    textarea: {
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: '100%',
      resize: 'none',
      height: '100px',
    },
    button: {
      padding: '10px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#218838', // Darker green on hover
    },
  };