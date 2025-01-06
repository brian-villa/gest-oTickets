import React, { useEffect, useState } from 'react';
import Header from '../partials/Header';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios'; // Certifique-se de importar o axios

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '', role: '' });
  const [isEditing, setIsEditing] = useState(false); // Controla se estamos no modo de edição
  const [userId, setUserId] = useState(''); // Para armazenar o ID do usuário
  const [showPassword, setShowPassword] = useState(false); // Controle para mostrar/ocultar a senha

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("User loaded from localStorage:", parsedUser); // Verifique os dados carregados do localStorage
      setUser(parsedUser); // Preenche o estado com o objeto de usuário
      setUserId(parsedUser._id); // Assume-se que o ID do usuário está armazenado em parsedUser._id
    }
  }, []);

  const handleSave = async () => {
    try {
      const updatedUser = { 
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
      };

      console.log('Enviando dados para atualização para o ID:', userId);  // Verifique se o ID está correto
      const response = await axios.put(`http://localhost:8080/api/users/${userId}`, updatedUser);
      console.log('User updated:', response.data);

      // Atualiza o localStorage com os dados atualizados
      localStorage.setItem('user', JSON.stringify(response.data)); 
      alert('Profile saved successfully!');
      setIsEditing(false); // Volta para o estado de visualização
    } catch (error) {
      console.error('Erro ao salvar as mudanças:', error);
      alert('Erro ao salvar as mudanças!');
    }
  };

  const handleEdit = () => {
    setIsEditing(true); // Ativa o modo de edição
  };

  const handlePasswordFocus = () => {
    // Limpa o campo de senha quando ele é focado
    if (user.password !== '') {
      setUser({ ...user, password: '' });
    }
    setShowPassword(true); // Exibe a senha ao focar no campo
  };

  const handlePasswordBlur = () => {
    setShowPassword(false); // Quando o campo perde o foco, volta para o tipo "password"
  };

  return (
    <>
      <Header userName={user.name} />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '90vh',
          minWidth: '100vw',
          backgroundColor: '#f4f7fb',
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
          }}
        >
          <Typography variant="h4" sx={{ mb: 1 }}>
            My profile
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Here you can view and edit your personal data!
          </Typography>

          {/* Text Field para Nome */}
          <TextField
            label="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
            disabled={!isEditing} // Desabilita o campo até que esteja em modo de edição
          />

          {/* Text Field para Email */}
          <TextField
            label="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
            fullWidth
            sx={{ mb: 2 }}
            disabled={!isEditing} // Desabilita o campo até que esteja em modo de edição
          />

          {/* Text Field para Senha */}
          <TextField
            label="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            onFocus={handlePasswordFocus} // Limpa o campo e permite visibilidade ao focar
            onBlur={handlePasswordBlur}  // Reverte para "password" ao sair do campo
            type={showPassword ? 'text' : 'password'} // Se estiver focado, mostra a senha em texto
            fullWidth
            sx={{ mb: 2 }}
            disabled={!isEditing} // Desabilita o campo até que esteja em modo de edição
            placeholder={isEditing ? 'Enter new password' : ''} // Exibe um texto sugestivo
          />

          {/* Text Field para Função */}
          <TextField
            label="Role"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            fullWidth
            sx={{ mb: 3 }}
            disabled // Sempre desabilitado
          />

          {/* Botão para Editar ou Salvar */}
          <Button
            variant="contained"
            color="primary"
            onClick={isEditing ? handleSave : handleEdit} // Dependendo do estado, executa Edit ou Save
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
