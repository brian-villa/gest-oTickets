import React, { useState, useEffect } from 'react';
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
  const [departments, setDepartments] = useState([]); 
  const [selectedDepartmentName, setSelectedDepartmentName] = useState(''); 

  const { onResetButtonState } = useOutletContext();
  const navigate = useNavigate(); 

  
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/departments');
        setDepartments(response.data); 
      } catch (error) {
        console.error('Erro ao buscar departamentos:', error);
        alert('Falha ao carregar departamentos!');
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'department') {
      const selectedDepartment = departments.find(dept => dept._id === value);
      setSelectedDepartmentName(selectedDepartment ? selectedDepartment.name : '');
    }

    setTicketData({ ...ticketData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!ticketData.title) newErrors.title = 'Title is required';
    if (!ticketData.description) newErrors.description = 'Description is required';
    if (!ticketData.department) newErrors.department = 'Department is required';
    
 
    if (!ticketData.hashtags) {
      newErrors.hashtags = 'Hashtags are required';
    } else {
      const hashtagsArray = ticketData.hashtags.split(',').map((tag) => tag.trim());
      const invalidHashtags = hashtagsArray.filter((tag) => !/^#[\w-]+$/.test(tag));
      
      if (invalidHashtags.length > 0) {
        newErrors.hashtags = 'Each hashtag must start with "#" and contain only letters, numbers, or hyphens';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
  
    try {
      
      const user = JSON.parse(localStorage.getItem('user'));
      
      
      const clientId = user?._id;
      if (!clientId) {
        alert('User ID not found. Please log in again.');
        return;
      }
  
      const response = await axios.post('http://localhost:8080/api/tickets', {
        ...ticketData,
        clientId,  
        department: selectedDepartmentName,  
        hashtags: ticketData.hashtags.split(',').map((tag) => tag.trim()),  
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
      setSelectedDepartmentName('');  
  
      
      navigate('/main');
      onResetButtonState();
    } catch (error) {
      console.error('Error creating ticket:', error.response?.data || error.message);
      alert('Failed to create ticket.');
    }
  };

  const handleClose = () => {
    
    navigate('/main'); 
    onResetButtonState(); 
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
        select
        label="Department"
        name="department"
        value={ticketData.department}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        error={!!errors.department}
        helperText={errors.department}
      >
        {departments.map((dept) => (
          <MenuItem key={dept._id} value={dept._id}>
            {dept.name} 
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Hashtags (comma-separated)"
        name="hashtags"
        value={ticketData.hashtags}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        error={!!errors.hashtags}
        helperText={errors.hashtags}
      />
      <Box sx={{ width: '100%', textAlign: 'right' }}>

   
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2, mr: 1 }}
        >
          Save
        </Button>


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
