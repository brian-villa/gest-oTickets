import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent, Avatar, Select, MenuItem, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Header from '../partials/Header';
import axios from 'axios';

const UserDashboard = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]); 
  const [open, setOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data); 
        setLoading(false); 
      } catch (error) {
        setError('Error loading users');
        setLoading(false);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/departments');
        setDepartments(response.data); 
      } catch (error) {
        setError('Error loading departments');
      }
    };

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }

    fetchUsers(); 
    fetchDepartments(); 
  }, []);

  const handleUpgradeRole = async (user) => {
    if (user.role === 'client') {
      setSelectedUser(user); 
      setOpen(true);
    } else {
      await upgradeUserRole(user); 
    }
  };

  const upgradeUserRole = async (user) => {
    const nextRole = user.role === 'client' ? 'agent' : user.role === 'agent' ? 'admin' : user.role;
    try {
      await axios.put(`http://localhost:8080/api/users/${user._id}`, { role: nextRole });
      setUsers(prevUsers => prevUsers.map(u => (u._id === user._id ? { ...u, role: nextRole } : u)));
    } catch (error) {
      setError('Error upgrading user role');
    }
  };

  const handleSaveDepartment = async () => {
    if (!selectedDepartment || !selectedUser) return;

    try {
      const response = await axios.put(`http://localhost:8080/api/departments/${selectedDepartment}`, {
        agentIds: selectedUser._id,  
        agents: selectedUser.name     
      });


      const updatedDepartment = response.data;  

    
      setDepartments(prevDepartments => 
        prevDepartments.map(department =>
          department._id === updatedDepartment._id ? updatedDepartment : department
        )
      );

      await upgradeUserRole(selectedUser);
      setOpen(false); 
    } catch (error) {
      console.error(error);  
      setError('Error assigning user to department');
    }
  };

  const handleClose = () => {
    setOpen(false); 
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
        <Typography variant="h4" sx={{ mb: 2, mt: 2 }}>
          Users
        </Typography>

        <Grid container spacing={4} sx={{ width: '100%', justifyContent: 'flex-start' }}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <Card sx={{ padding: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar alt={user.name} sx={{ width: 56, height: 56, marginBottom: 2 }} />
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography variant="body1" color="text.secondary">{user.email}</Typography>
                    <Typography variant="body2" color="text.secondary">Role: {user.role}</Typography>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      width: '100%',
                      padding: '10px 20px',
                      fontSize: '1rem',
                      borderRadius: '5px',
                      textTransform: 'none',
                      marginTop: '16px',
                    }}
                    onClick={() => handleUpgradeRole(user)}
                    disabled={user.role === 'admin'} 
                  >
                    Upgrade Role
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Choose a Department</DialogTitle>
        <DialogContent>
          <FormControl fullWidth  sx={{ marginTop: 2 }}>
            <InputLabel id="department-select-label">Department</InputLabel>
            <Select
              labelId="department-select-label"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map((department) => (
                <MenuItem key={department._id} value={department._id}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSaveDepartment} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserDashboard;
