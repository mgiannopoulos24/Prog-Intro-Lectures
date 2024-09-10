import React from 'react';
import Button from '@mui/material/Button';
import './RoundIconButton.css';
import { Link } from 'react-router-dom';

const RoundIconButton = ({icon, to, position}) => {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
    <Button
      variant="contained"
      color="primary"
      sx={{
        borderRadius: '50%',
        width: 56,
        height: 56,
        minWidth: 0,
        p: 0,
        backgroundColor: 'lightblue',
        bottom: 20 + 80*position,
      }}
      className="RoundIconButton"
    >
      {icon}
    </Button>
    </Link>
  );
};

export default RoundIconButton;