import React, { useEffect, useState } from 'react';
import { Box, TextField, MenuItem, Checkbox, FormControlLabel, Button, Typography } from '@mui/material';
import axios from 'axios';

const TicketFilter = ({ filterInputs, setFilterInputs, setFilters }) => {
  const [departments, setDepartments] = useState([]);
  const [isClearing, setIsClearing] = useState(false);  
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user ? user.role : null;  

 
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/departments');
      setDepartments(response.data);
    } catch (err) {
      console.error('Failed to fetch departments:', err);
    }
  };


  const clearFilters = () => {
    setIsClearing(true);  
    setFilterInputs({
      title: '',
      priority: '',
      department: '',
      myTickets: false,
      showMyTicketsAsAgent: false,
      showUnassignedTickets: false,
      showClosedTickets: false,  
    });
    setFilters({
      title: '',
      priority: '',
      department: '',
      myTickets: false,
      showMyTicketsAsAgent: false,
      showUnassignedTickets: false,
      showClosedTickets: false,  
    });
  };

  
  const applyFilters = () => {
    setFilters(filterInputs);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  
  useEffect(() => {
    if (isClearing) {
      setIsClearing(false);  
    }
  }, [isClearing]);

  return (
    <Box sx={{ width: '20%', height: '80%', backgroundColor: '#fff', padding: '16px', borderRadius: '8px', boxShadow: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Filters</Typography>

      
      <TextField
        label="Title"
        name="title"
        value={filterInputs.title}
        onChange={(e) => !isClearing && setFilterInputs({ ...filterInputs, title: e.target.value })}  
        fullWidth
        sx={{ mb: 2 }}
      />

     
      <TextField
        select
        label="Priority"
        name="priority"
        value={filterInputs.priority}
        onChange={(e) => !isClearing && setFilterInputs({ ...filterInputs, priority: e.target.value })}  
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="high">High</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="low">Low</MenuItem>
      </TextField>

      
      <TextField
        select
        label="Department"
        name="department"
        value={filterInputs.department}
        onChange={(e) => !isClearing && setFilterInputs({ ...filterInputs, department: e.target.value })}  
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All</MenuItem>
        {departments.map((dept) => (
          <MenuItem key={dept._id} value={dept.name}>{dept.name}</MenuItem>
        ))}
      </TextField>

      
      <FormControlLabel
        control={
          <Checkbox
            checked={filterInputs.myTickets}
            onChange={(e) => !isClearing && setFilterInputs({ ...filterInputs, myTickets: e.target.checked })} 
          />
        }
        label="Show My Tickets"
      />

     
      {userRole !== 'client' && (
        <FormControlLabel
          control={
            <Checkbox
              checked={filterInputs.showMyTicketsAsAgent}
              onChange={(e) => !isClearing && setFilterInputs({ ...filterInputs, showMyTicketsAsAgent: e.target.checked })}  
            />
          }
          label="Show My Tickets as Agent"
        />
      )}

      
      {userRole !== 'client' && (
        <FormControlLabel
          control={
            <Checkbox
              checked={filterInputs.showUnassignedTickets}
              onChange={(e) => !isClearing && setFilterInputs({ ...filterInputs, showUnassignedTickets: e.target.checked })}  
            />
          }
          label="Show Unassigned Tickets"
        />
      )}

      <FormControlLabel
        control={
          <Checkbox
            checked={filterInputs.showClosedTickets}
            onChange={(e) => !isClearing && setFilterInputs({ ...filterInputs, showClosedTickets: e.target.checked })}  
          />
        }
        label="Show Closed Tickets"
      />

    
      <Box sx={{ display: 'flex', gap: '10px', mt: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#252525',
            color: '#fff',
            flex: 1,
            '&:hover': {
              backgroundColor: '#3c3c3c',
            },
          }}
          onClick={applyFilters}  
        >
          Apply Filters
        </Button>

        <Button
          variant="outlined"
          sx={{
            color: '#252525',
            borderColor: '#252525',
            flex: 1,
            '&:hover': {
              backgroundColor: '#f4f4f4',
              borderColor: '#252525',
            },
          }}
          onClick={clearFilters}  
        >
          Clear Filters
        </Button>
      </Box>
    </Box>
  );
};

export default TicketFilter;
