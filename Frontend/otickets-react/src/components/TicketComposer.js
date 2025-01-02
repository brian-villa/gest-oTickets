import React, { useState } from 'react';
import { Container, TextField, Button, Box, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';

const TicketComposer = () => {
  const [ticketData, setTicketData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
    department: '',
    hashtags: '',
  });

  const [errors, setErrors] = useState({});
  const { onResetButtonState } = useOutletContext(); // Acesso à função para resetar o estado do botão
  const navigate = useNavigate(); // Hook para navegação

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData({ ...ticketData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!ticketData.title) newErrors.title = 'Title is required';
    if (!ticketData.description) newErrors.description = 'Description is required';
    if (!ticketData.department) newErrors.department = 'Department is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:8080/api/tickets', {
        ...ticketData,
        hashtags: ticketData.hashtags.split(',').map((tag) => tag.trim()), // Converte string de hashtags para array
      });
      console.log('Ticket created:', response.data);
      alert('Ticket created successfully!');
      setTicketData({
        title: '',
        description: '',
        status: 'open',
        priority: 'medium',
        department: '',
        hashtags: '',
      });

      // Redireciona para a página principal e reabilita o botão
      navigate('/main'); // Vai para localhost:3000/main
      onResetButtonState(); // Reseta o estado do botão na página principal
    } catch (error) {
      console.error('Error creating ticket:', error.response?.data || error.message);
      alert('Failed to create ticket.');
    }
  };

  const handleClose = () => {
    // Quando o botão "Fechar" for clicado, redireciona de volta à página principal sem salvar nada
    navigate('/main'); // Vai para a página principal
    onResetButtonState(); // Reseta o estado do botão na página principal
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: 3,
      }}
    >
      <TextField
        label="Title"
        name="title"
        value={ticketData.title}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        error={!!errors.title}
        helperText={errors.title}
      />
      <TextField
        label="Description"
        name="description"
        value={ticketData.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        sx={{ mb: 2 }}
        error={!!errors.description}
        helperText={errors.description}
      />
      <TextField
        select
        label="Status"
        name="status"
        value={ticketData.status}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="open">Open</MenuItem>
        <MenuItem value="in-progress">In Progress</MenuItem>
        <MenuItem value="closed">Closed</MenuItem>
      </TextField>
      <TextField
        select
        label="Priority"
        name="priority"
        value={ticketData.priority}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="high">High</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="low">Low</MenuItem>
      </TextField>
      <TextField
        label="Department"
        name="department"
        value={ticketData.department}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        error={!!errors.department}
        helperText={errors.department}
      />
      <TextField
        label="Hashtags (comma-separated)"
        name="hashtags"
        value={ticketData.hashtags}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Box sx={{ width: '100%', textAlign: 'right' }}>
        {/* Botão de Salvar */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2, mr: 1 }}
        >
          Save
        </Button>
        {/* Botão de Fechar */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClose}
          sx={{ mt: 2 }}
        >
          Close
        </Button>
      </Box>
    </Container>
  );
};

export default TicketComposer;
