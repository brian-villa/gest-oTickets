import React, { useState, useEffect } from 'react';
import { Container, TextField, Typography, Box, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HistoryIcon from '@mui/icons-material/History';
import axios from 'axios';
import TicketModal from './TicketModal';  
import HistoryModal from './HistoryModal'; 

const Ticket = ({ ticket, userRole, userId, setTickets }) => {
  const { _id, title, status, priority, description, department, hashtags, agentID, updates } = ticket;  
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [historyModalOpen, setHistoryModalOpen] = useState(false); 
  const [agentName, setAgentName] = useState(''); 


  const fetchAgentName = async () => {
    if (agentID) { 
      try {
        const response = await axios.get('http://localhost:8080/api/users'); 
        const users = response.data;

        
        const agent = users.find(user => user._id.toString() === agentID.toString());

        if (agent) {
          setAgentName(agent.name); 
        } else {
          setAgentName('No agent found'); 
        }
      } catch (error) {
        console.error('Erro ao buscar nome do agente:', error);
        setAgentName('Error fetching agent name'); 
      }
    } else {
      setAgentName('No agent assigned');  
    }
  };

  useEffect(() => {
    fetchAgentName(); 
  }, [agentID]); 

  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return { borderColor: 'green', textColor: 'green' };
      case 'medium':
        return { borderColor: '#ffc300', textColor: '#ffc300' };
      case 'high':
        return { borderColor: 'red', textColor: 'red' }; 
      default:
        return { borderColor: 'gray', textColor: 'gray' }; 
    }
  };

  const { borderColor } = getPriorityColor(priority);
  const titleStyle = status === 'closed' ? { textDecoration: 'line-through', color: 'gray' } : {};

  const deleteTicket = async () => {
    const confirmation = window.confirm("Are you sure you want to delete this ticket?");
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:8080/api/tickets/${_id}`);
        alert('Ticket deleted successfully');
        window.location.reload();
      } catch (error) {
        console.error('Error deleting ticket:', error);
      }
    }
  };

  const closeTicket = async () => {
    const updatedTicket = {
      status: 'closed',
    };

    try {
      await axios.put(`http://localhost:8080/api/tickets/${_id}`, updatedTicket);
      alert('Ticket closed successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error closing ticket:', error);
    }
  };

  const takeTicket = async () => {
    const updatedTicket = {
      status: 'in-progress',
      agentID: userId,
    };

    try {
      const response = await axios.put(`http://localhost:8080/api/tickets/${_id}`, updatedTicket);
      console.log('Ticket atualizado:', response.data);
      alert('Ticket marked as in-progress and assigned to you');
      window.location.reload();
    } catch (error) {
      console.error('Error updating ticket status and agentId:', error);
    }
  };

  return (
    <Container
      sx={{
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        padding: '5px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: 3,
        border: `3px solid ${status === 'closed' ? 'gray' : borderColor}`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          mt: 1,
          mb: 2,
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={titleStyle}>{title}</Typography>
        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', width: '30%' }}>
          {(userRole === 'admin' || (userRole === 'agent' && status === 'closed')) && (
            <IconButton onClick={deleteTicket} sx={{ padding: 0 }}>
              <DeleteIcon sx={{ color: 'red' }} />
            </IconButton>
          )}

          {userRole !== 'client' && status !== 'closed' && (
            <IconButton onClick={() => setIsModalOpen(true)} sx={{ padding: 0 }}>
              <EditIcon />
            </IconButton>
          )}

          {userRole !== 'client' && status !== 'closed' && (
            <IconButton onClick={closeTicket} sx={{ padding: 0 }}>
              <CheckCircleIcon sx={{ color: 'green' }} />
            </IconButton>
          )}
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <IconButton sx={{ padding: 0 }} onClick={() => setHistoryModalOpen(true)}>
              <HistoryIcon sx={{ color: 'gray' }} />
            </IconButton>
            {userRole !== 'client' && status === 'open' && (
              <Button onClick={takeTicket} variant="outlined" sx={{ padding: '5px 10px', fontSize: '12px' }}>
                Take
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField label="Status" value={status} sx={{ width: '49%' }} readOnly />
        <TextField label="Priority" value={priority} sx={{ width: '49%' }} readOnly />
      </Box>
      <TextField label="Description" value={description} fullWidth readOnly multiline rows={4} sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField label="Department" value={department} readOnly sx={{ width: '49%' }} />
        <TextField label="Agent" value={agentName || 'No agent assigned'} readOnly sx={{ width: '49%' }} />
      </Box>
      <TextField label="Hashtags" value={hashtags.join(', ')} fullWidth readOnly sx={{ mb: 2 }} />

      <TicketModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} ticket={ticket} />
      <HistoryModal open={historyModalOpen} handleClose={() => setHistoryModalOpen(false)} updates={updates} />
    </Container>
  );
};

export default Ticket;
