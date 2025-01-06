import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Tooltip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'; // Importa o hook useNavigate e useLocation para navegação

const Header = ({ userName, role = "client" }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate(); // Hook para navegação programática
  const location = useLocation(); // Hook para obter a localização da página atual

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Função para redirecionar para a página de perfil
  const handleNavigateToProfile = () => {
    navigate('/profile'); // Navega para a sub-rota de perfil
    handleCloseUserMenu(); // Fecha o menu após a navegação
  };

  // Função para realizar o logout e redirecionar para a página de login
  const handleLogout = () => {
    navigate('/'); // Navega para a página de login
    handleCloseUserMenu(); // Fecha o menu após o logout
  };

  // Função para redirecionar para a página principal
  const handleNavigateToMain = () => {
    navigate('/main'); // Navega para a página principal
  };

  // Verifica se a localização atual é a página "main"
  const isOnMainPage = location.pathname === '/main';

  // Lógica para exibir a role apenas se for diferente de "user"
  const shouldShowRole = role !== "client";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h5"
              sx={{
                cursor: 'pointer',
                fontWeight: 'bold',
                bgcolor: 'white',
                color: 'black',
                padding: '8px',
                borderRadius: '8px',
              }}
              onClick={handleNavigateToMain}
            >
              oTicket
            </Typography>

            {/* Exibe a role apenas se for diferente de "user" */}
            {shouldShowRole && (
              <Typography
                variant="h6"
                ml={1}
                sx={{ fontStyle: 'italic' }}
              >
                {role}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isOnMainPage && userName && (
              <Typography variant="h6" sx={{ marginRight: 2, fontSize: 15 }}>
                Bem-vindo, {userName}
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
                <MenuItem onClick={handleNavigateToProfile}>
                  <Typography sx={{ textAlign: 'center' }}>Account</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
