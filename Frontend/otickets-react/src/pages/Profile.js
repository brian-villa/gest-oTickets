import React, { useEffect, useState } from 'react';
import Header from '../partials/Header';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios'; 

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '', role: '' });
  const [isEditing, setIsEditing] = useState(false); 
  const [userId, setUserId] = useState(''); 
  const [showPassword, setShowPassword] = useState(false); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("User loaded from localStorage:", parsedUser); 
      setUser(parsedUser); 
      setUserId(parsedUser._id); 
    }

    // Remove o scroll da página (para tanto vertical quanto horizontal)
    document.body.style.overflow = 'hidden';

    // Limpa o overflow ao desmontar o componente
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSave = async () => {
    try {
      const updatedUser = { 
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
      };
      const response = await axios.put(`http://localhost:8080/api/users/${userId}`, updatedUser);
      console.log('User updated:', response.data);

      
      localStorage.setItem('user', JSON.stringify(response.data)); 
      alert('Profile saved successfully!');
      setIsEditing(false); 
    } catch (error) {
      console.error('Erro ao salvar as mudanças:', error);
      alert('Erro ao salvar as mudanças!');
    }
  };

  const handleEdit = () => {
    setIsEditing(true); 
  };

  const handlePasswordFocus = () => {
    if (user.password !== '') {
      setUser({ ...user, password: '' });
    }
    setShowPassword(true); 
  };

  const handlePasswordBlur = () => {
    setShowPassword(false); 
  };

  return (
    <>
      <Header
        userName={user ? user.name : ''}
        role={user ? user.role : 'user'} 
      />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh', 
          minWidth: '100vw', 
          backgroundColor: '#f4f7fb',
          padding: 0, 
          overflow: 'hidden', 
        }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '40%',
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden', 
          }}
        >
          <Typography variant="h4" sx={{ mb: 1 }}>
            My profile
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Here you can view and edit your personal data!
          </Typography>

          <TextField
            label="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
            disabled={!isEditing} 
          />

          <TextField
            label="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
            fullWidth
            sx={{ mb: 2 }}
            disabled={!isEditing} 
          />

          <TextField
            label="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            onFocus={handlePasswordFocus} 
            onBlur={handlePasswordBlur}  
            type={showPassword ? 'text' : 'password'} 
            fullWidth
            sx={{ mb: 2 }}
            disabled={!isEditing} 
            placeholder={isEditing ? 'Enter new password' : ''} 
          />

          <TextField
            label="Role"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            fullWidth
            sx={{ mb: 3 }}
            disabled 
          />

          <Button
            variant="contained"
            color="primary"
            onClick={isEditing ? handleSave : handleEdit} 
            sx={{
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '5px',
              textTransform: 'none',
            }}
          >
            {isEditing ? 'Save Changes' : 'Edit'} 
          </Button>
        </Container>
      </Container>
    </>
  );
};

export default Profile;
