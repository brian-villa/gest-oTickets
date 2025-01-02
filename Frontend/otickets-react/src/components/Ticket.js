import React from 'react';
import { Container, TextField, Typography, Box } from '@mui/material';

const Ticket = ({ title, status, priority, description, department, hashtags }) => {
  // Função para determinar a cor da borda com base no priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return { borderColor: 'green', textColor: 'green' }; // Verde
      case 'medium':
        return { borderColor: '#ffc300', textColor: '#ffc300' }; // Amarelo
      case 'high':
        return { borderColor: 'red', textColor: 'red' }; // Vermelho
      default:
        return { borderColor: 'gray', textColor: 'gray' }; // Cor padrão
    }
  };

  // Obtém as cores baseadas no priority
  const { borderColor, textColor } = getPriorityColor(priority);

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
        border: `3px solid ${borderColor}`, // Aplica a borda colorida ao Container
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 1, mb: 2, alignItems: 'center' }}>
        <Typography variant="h4">{title}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '30%' }}>
          <TextField label="Status" value={status} sx={{ width: '49%' }} slotProps={{ input: { readOnly: true } }} />
          <TextField
            label="Priority"
            value={priority}
            sx={{
              width: '49%',
              '& .MuiInputBase-input': {
                color: textColor, // Cor do texto
              },
            }}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
        </Box>
      </Box>

      <TextField
        label="Description"
        value={description}
        fullWidth
        multiline
        rows={4}
        sx={{ mb: 2 }}
        slotProps={{ input: { readOnly: true } }}
      />
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Department"
          value={department}
          sx={{ width: '100%' }}
          slotProps={{ input: { readOnly: true } }}
        />
      </Box>
      <TextField label="Hashtags" value={hashtags} fullWidth sx={{ mb: 2 }} slotProps={{ input: { readOnly: true } }} />
    </Container>
  );
};

export default Ticket;
