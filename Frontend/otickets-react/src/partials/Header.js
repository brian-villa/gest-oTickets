import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate para navegação

const Header = ({ userName }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate(); // Hook para navegação programática

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Função para redirecionar para a página de perfil
  const handleNavigateToProfile = () => {
    navigate('/profile'); // Navega para a página de perfil
    handleCloseUserMenu(); // Fecha o menu após a navegação
  };

  // Função para realizar o logout e redirecionar para a página de login
  const handleLogout = () => {
    localStorage.removeItem('userName'); // Remove o nome do usuário do armazenamento local
    navigate('/'); // Navega para a página de login
    handleCloseUserMenu(); // Fecha o menu após o logout
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            oTicket
          </Typography>

          {/* Exibindo o nome do usuário após login */}
          {userName ? (
            <Typography variant="h6" sx={{ marginRight: 2, fontSize: 15 }}>
              Bem-vindo, {userName}
            </Typography>
          ) : (
            <Typography variant="h6" sx={{ marginRight: 2, fontSize: 15 }}>
              Bem-vindo, usuário
            </Typography>
          )}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* Alterando os itens do menu para incluir as ações de navegação */}
              <MenuItem onClick={handleNavigateToProfile}>
                <Typography sx={{ textAlign: 'center' }}>Account</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
