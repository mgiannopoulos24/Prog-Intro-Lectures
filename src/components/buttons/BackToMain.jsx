import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'; // Import Bootstrap Button
import './BackToMain.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

const BackButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Link to="/" className="back-link">
      <Button
        
        className={`back-button ${isScrolled ? 'scrolled' : ''}`}
        style={{
          textTransform: 'none',
          color: 'black',
          borderRadius: '50px', 
          padding: isScrolled ? '6px 10px' : '6px 16px',
          display: 'flex',
          fontFamily: 'Google Sans, sans-serif',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.5s ease-in-out',
          border: 'none',
        }}
      >
        {isScrolled ? (
          <ArrowBackIosIcon sx={{ color: 'black', fontSize: 'medium', marginLeft:'5px'}} />
        ) : (
          <>
            <ArrowBackIosIcon sx={{ color: 'black', fontSize: 'medium' }} />
            Αρχική
          </>
        )}
      </Button>
    </Link>
  );
};

export default BackButton;
