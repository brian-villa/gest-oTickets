import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Header from '../partials/Header';
import axios from 'axios';

const Department = () => {
  const [departments, setDepartments] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false); 
  const [newDepartmentName, setNewDepartmentName] = useState(''); 
  const [user, setUser] = useState(null); 

 
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/departments');
        setDepartments(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error loading departments');
        setLoading(false);
      }
    };

   
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchDepartments();
  }, []);


  const handleCreateDepartment = async () => {
    if (!newDepartmentName) return; 

    try {
      const response = await axios.post('http://localhost:8080/api/departments', { name: newDepartmentName });
      setDepartments((prevDepartments) => [...prevDepartments, response.data]); 
      setNewDepartmentName(''); 
      setOpenModal(false); 
    } catch (error) {
      setError('Error creating department');
    }
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <>
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
          minHeight: '89vh',
          backgroundColor: '#e0e1dd',
        }}
      >
      
        <Button
          sx={{
            mt: 3,
            mb: 3,
            width: '25%',
            height: '10vh',
            backgroundColor: '#252525',
            color: 'white',
            display: 'flex',
            padding: '50px',
            '&:hover': {
              backgroundColor: '#333',
            }
          }}
          onClick={() => setOpenModal(true)} 
        >
          Create new department
          <AddCircleIcon sx={{ fontSize: 30, ml: 2 }} />
        </Button>
        <Box sx={{width:'100%', bgcolor:'black', height:'2px'}} />
        <Typography variant="h4" sx={{ mb: 2, mt: 2 }}>
          Departments
        </Typography>

        <Grid container spacing={4} sx={{ width: '100%', justifyContent: 'flex-start' }}>
          {departments.map((department) => (
            <Grid item xs={12} sm={6} md={4} key={department._id}>
              <Card sx={{ padding: 1 }}>
                <CardContent>
 
                  <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 1 }}>
                    {department.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', marginBottom: 2 }}>
                    Agents:
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {Array.isArray(department.agents) && department.agents.length > 0 ? (
                      department.agents.map((agentName, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                          <Avatar sx={{ width: 30, height: 30, marginRight: 1 }} />
                          <Typography variant="body2" color="text.primary">{agentName}</Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">No agents assigned</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Create New Department</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Department Name"
            variant="outlined"
            value={newDepartmentName}
            onChange={(e) => setNewDepartmentName(e.target.value)}
            sx={{ mb: 2, mt:2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">Cancel</Button>
          <Button onClick={handleCreateDepartment} color="primary">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Department;
