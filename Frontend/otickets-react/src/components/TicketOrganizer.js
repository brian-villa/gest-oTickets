import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import Ticket from './Ticket';
import TicketFilter from './TicketFilter';

const TicketOrganizer = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    title: '',
    priority: '',
    department: '',
    myTickets: false,
  });

  const [filterInputs, setFilterInputs] = useState(filters);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user._id : null;  // Garante que userId não seja undefined

  // Função para buscar os tickets da API
  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tickets');
      setTickets(response.data);
      setFilteredTickets(response.data);
    } catch (err) {
      setError('Failed to fetch tickets.');
    } finally {
      setLoading(false);
    }
  };

  // Função para aplicar filtros aos tickets
  // Função para aplicar filtros aos tickets
// Função para aplicar filtros aos tickets
// Função para aplicar filtros aos tickets
const applyFilters = () => {
  let filtered = tickets;

  if (filters.title) {
    filtered = filtered.filter(ticket =>
      ticket.title.toLowerCase().includes(filters.title.toLowerCase())
    );
  }

  if (filters.priority) {
    filtered = filtered.filter(ticket => ticket.priority === filters.priority);
  }

  if (filters.department) {
    filtered = filtered.filter(ticket => ticket.department === filters.department);
  }

  // Filtro "Show My Tickets" (baseado no clientId)
  if (filters.myTickets) {
    filtered = filtered.filter(ticket => ticket.clientId === userId);
  }

  // Filtro "Show My Tickets as Agent" (baseado no agentId)
  if (filters.showMyTicketsAsAgent) {
    filtered = filtered.filter(ticket => ticket.agentID === userId);  // Filtro pelo agentId
  }

  // Filtro "Show Unassigned Tickets" (baseado no agentId vazio)
  if (filters.showUnassignedTickets) {
    filtered = filtered.filter(ticket => !ticket.agentID);  // Filtra tickets sem agentId
  }

  // Filtro "Show Closed Tickets" (baseado no status "closed")
  if (filters.showClosedTickets) {
    filtered = filtered.filter(ticket => ticket.status === 'closed');  // Filtra tickets com status "closed"
  }

  setFilteredTickets(filtered);
};




  // UseEffect para buscar tickets inicialmente
  useEffect(() => {
    fetchTickets();
  }, []);

  // UseEffect para aplicar os filtros sempre que houver uma mudança nos filtros
  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f4f4f4', borderTop: '1px solid black', width:'100%' }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Tickets</Typography>

      <Box sx={{ display: 'flex', gap: '20px' }}>
        <TicketFilter filterInputs={filterInputs} setFilterInputs={setFilterInputs} setFilters={setFilters} />

        <Box sx={{ flex: 1 }}>
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <Box key={ticket._id} sx={{ marginBottom: '20px' }}>
                {/* Passando setTickets para atualizar a lista de tickets ao modificar algum */}
                <Ticket
                  key={ticket._id}
                  ticket={ticket}
                  userRole={JSON.parse(localStorage.getItem('user'))?.role}
                  userId={userId}
                  setTickets={setTickets}  // Passando a função setTickets para o Ticket
                />
              </Box>
            ))
          ) : (
            <Typography>No tickets found.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TicketOrganizer;
