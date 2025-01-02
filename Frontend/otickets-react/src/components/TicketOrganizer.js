import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import Ticket from './Ticket';

const TicketOrganizer = () => {
  const [tickets, setTickets] = useState([]); // Estado para armazenar os tickets
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros

  // Função para buscar os tickets do backend
  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tickets');
      setTickets(response.data); // Define os tickets no estado
    } catch (err) {
      setError('Failed to fetch tickets.'); // Define o erro
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  useEffect(() => {
    fetchTickets(); // Busca os tickets ao carregar o componente
  }, []);

  if (loading) {
    return <Typography>Loading tickets...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f4f4f4', width:'100%', borderTop: '1px solid black' }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Tickets
      </Typography>
      {tickets.map((ticket) => (
        <Box
          key={ticket._id} // Garantir que cada ticket tenha uma key única
          sx={{ marginBottom: '20px' }}
        >
          <Ticket
            title={ticket.title}
            status={ticket.status}
            priority={ticket.priority}
            description={ticket.description}
            department={ticket.department}
            hashtags={ticket.hashtags.join(', ')} // Converte array para string separada por vírgulas
          />
        </Box>
      ))}
    </Box>
  );
};

export default TicketOrganizer;
