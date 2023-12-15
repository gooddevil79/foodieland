import { Paper } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <Paper
      sx={{
        position: 'fixed',
        width: '100vw',
        bottom: '0',
        left: '0',
        fontFamily: 'sans-serif',
        direction: 'ltr',
      }}
    >
      <p>by Gooddevil79 🙂</p>
    </Paper>
  );
};

export default Footer;
