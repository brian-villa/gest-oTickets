import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Modal, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const TicketModal = ({ open, handleClose, ticket }) => {
  const { _id, title, status, priority, description, department, hashtags } = ticket;

  const [newTitle, setNewTitle] = useState(title);
  const [newStatus, setNewStatus] = useState(status);
  const [newPriority, setNewPriority] = useState(priority);
  const [newDescription, setNewDescription] = useState(description);
  const [newDepartment, setNewDepartment] = useState(department);
  const [newHashtags, setNewHashtags] = useState(hashtags.join(', '));

  const [departments, setDepartments] = useState([]);
  const [userId, setUserId] = useState(null); // Estado para armazenar o ID do usuário

  useEffect(() => {
    // Carregar o usuário do localStorage quando o modal for aberto
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user && user._id) {
          setUserId(user._id); // Define o ID do usuário corretamente
        } else {
          console.error("User object is not correctly structured:", user);
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    } else {
      console.error("No user found in localStorage");
    }
  }, [open]);

  // Sincroniza os estados quando o modal é aberto
  useEffect(() => {
    if (open) {
      setNewTitle(title);
      setNewStatus(status);
      setNewPriority(priority);
      setNewDescription(description);
      setNewDepartment(department);
      setNewHashtags(hashtags.join(', '));
    }
  }, [open, title, status, priority, description, department, hashtags]);

  // Buscar os departamentos da base de dados
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    fetchDepartments();
  }, []);

  const updateTicket = async () => {
    if (!userId) {
      alert('User is not logged in!');
      return;
    }

    const updatedTicket = {
      title: newTitle,
      status: newStatus,
      priority: newPriority,
      description: newDescription,
      department: newDepartment,
      hashtags: newHashtags.split(',').map(tag => tag.trim()),
    };

    const updates = [];

    if (newTitle !== title) {
      updates.push("Updated title");
    }
    if (newStatus !== status) {
      updates.push("Updated status");
    }
    if (newPriority !== priority) {
      updates.push("Updated priority");
    }
    if (newDescription !== description) {
      updates.push("Updated description");
    }
    if (newDepartment !== department) {
      updates.push("Updated department");
    }
    if (newHashtags !== hashtags.join(', ')) {
      updates.push("Updated hashtags");
    }

    const ticketUpdates = updates.map((action) => ({
      timestamp: new Date(),
      authorId: userId, 
      action,
    }));

    const ticketData = { ...updatedTicket, updates: ticketUpdates };

    console.log('Ticket being sent to backend:', ticketData); // Verifique o que está sendo enviado para o backend

    try {
      const response = await axios.put(`http://localhost:8080/api/tickets/${_id}`, ticketData);
      console.log('Ticket updated:', response.data);
      alert('Ticket updated successfully');
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        sx={{
          width: 500,
          backgroundColor: 'white',
          padding: 4,
          borderRadius: '8px',
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6">Edit Ticket</Typography>

        {/* Title field */}
        <TextField
          label="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        {/* Priority field */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Priority</InputLabel>
          <Select value={newPriority} onChange={(e) => setNewPriority(e.target.value)} label="Priority">
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>

        {/* Description field */}
        <TextField
          label="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />

        {/* Department field */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Department</InputLabel>
          <Select value={newDepartment} onChange={(e) => setNewDepartment(e.target.value)} label="Department">
            {departments.map((department) => (
              <MenuItem key={department._id} value={department.name}>
                {department.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Hashtags field */}
        <TextField
          label="Hashtags"
          value={newHashtags}
          onChange={(e) => setNewHashtags(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        {/* Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={updateTicket}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TicketModal;
