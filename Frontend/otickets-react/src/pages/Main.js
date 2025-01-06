import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Header from "../partials/Header";
import { Container, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TicketOrganizer from '../components/TicketOrganizer';

const Main = () => {
  const [user, setUser] = useState(null); // Armazenar os dados completos do usuário
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Estado para desabilitar o botão
  const [showTickets, setShowTickets] = useState(true); // Estado para controlar a visibilidade dos tickets
  const navigate = useNavigate(); // Hook para navegação programática

  useEffect(() => {
    // Verificar se os dados do usuário estão no localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Armazena o usuário como objeto
    }
  }, [navigate]);

  const handleNavigateToComposer = () => {
    setIsButtonDisabled(true); // Desabilita o botão ao navegar para a composição do ticket
    setShowTickets(false); // Esconde os tickets
    navigate('ticket-composer'); // Navega para a sub-rota
  };

  const handleResetButtonState = () => {
    setIsButtonDisabled(false); // Reabilita o botão
    setShowTickets(true); // Mostra os tickets novamente
  };

  return (
    <>
      {/* Passa o userName e a role para o Header */}
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
          onClick={handleNavigateToComposer} // Navegação ao clicar
          disabled={isButtonDisabled} // Desabilita o botão enquanto o formulário estiver sendo preenchido
          sx={{
            mt: 3,
            mb: 3,
            width: '25%',
            height: '10vh',
            backgroundColor: isButtonDisabled ? '#b0b0b0' : '#252525', // Cor cinza quando desabilitado, preto quando habilitado
            color: 'white',
            display: 'flex',
            padding: '50px',
            '&:hover': {
              backgroundColor: isButtonDisabled ? '#b0b0b0' : '#333', // Altera a cor de hover dependendo do estado do botão
            }
          }}
        >
          Compose new ticket 
          <AddCircleIcon sx={{ fontSize: 30, ml: 2 }} />
        </Button>

        {/* Exibe os tickets somente se showTickets for verdadeiro */}
        {showTickets && <TicketOrganizer userId={user ? user._id : null} />}

        {/* Renderiza o subcomponente definido na sub-rota */}
        <Outlet context={{ onResetButtonState: handleResetButtonState }} />
      </Container>
    </>
  );
};

export default Main;
