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
  const userId = user ? user._id : null;  

 
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

 
  if (filters.myTickets) {
    filtered = filtered.filter(ticket => ticket.clientId === userId);
  }


  if (filters.showMyTicketsAsAgent) {
    filtered = filtered.filter(ticket => ticket.agentID === userId);  
  }

  
  if (filters.showUnassignedTickets) {
    filtered = filtered.filter(ticket => !ticket.agentID);  
  }

  
  if (filters.showClosedTickets) {
    filtered = filtered.filter(ticket => ticket.status === 'closed');  
  }

  setFilteredTickets(filtered);
};




  
  useEffect(() => {
    fetchTickets();
  }, []);

  
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
               
                <Ticket
                  key={ticket._id}
                  ticket={ticket}
                  userRole={JSON.parse(localStorage.getItem('user'))?.role}
                  userId={userId}
                  setTickets={setTickets}  
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
