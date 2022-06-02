import React from 'react';
import { Container, Box } from '@mui/material';
import { getToken } from 'src/utils/getUserData';
import { NavBar } from './NavBar';

interface BodyProps {
  children: React.ReactNode;
}

export const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <Container>
      <Box
        sx={{ bgcolor: '#cfe8fc', height: '100%', minHeight: '100vh', pb: 8 }}
      >
        {children}
      </Box>

      <NavBar />
    </Container>
  );
};
