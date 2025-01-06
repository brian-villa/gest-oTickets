import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Header from "../partials/Header";
import { Container, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TicketOrganizer from '../components/TicketOrganizer';

const Main = () => {
  const [user, setUser] = useState(null); 
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); 
  const [showTickets, setShowTickets] = useState(true); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, [navigate]);

  const handleNavigateToComposer = () => {
    setIsButtonDisabled(true); 
    setShowTickets(false); 
    navigate('ticket-composer'); 
  };

  const handleResetButtonState = () => {
    setIsButtonDisabled(false); 
    setShowTickets(true); 
  };

  return (
    <>
      <Header
        userName={user ? user.name : ''}
        role={user ? user.role : 'user'}
      />
      <Container
        maxWidth="100"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '87vh',
          backgroundColor: '#e0e1dd',
        }}
      >
        <Button
          onClick={handleNavigateToComposer} 
          disabled={isButtonDisabled}
          sx={{
            mt: 3,
            mb: 3,
            width: '25%',
            height: '10vh',
            backgroundColor: isButtonDisabled ? '#b0b0b0' : '#252525', 
            color: 'white',
            display: 'flex',
            padding: '50px',
            '&:hover': {
              backgroundColor: isButtonDisabled ? '#b0b0b0' : '#333', 
            }
          }}
        >
          Compose new ticket 
          <AddCircleIcon sx={{ fontSize: 30, ml: 2 }} />
        </Button>

        {showTickets && <TicketOrganizer userId={user ? user._id : null} />}

        <Outlet context={{ onResetButtonState: handleResetButtonState }} />
      </Container>
    </>
  );
};

export default Main;
