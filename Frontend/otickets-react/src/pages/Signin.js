import React from 'react';
import { TextField, Box, Container, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Definindo o esquema de validação com Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

// Estilo para os campos de texto com helperText posicionado de forma absoluta
const fieldStyles = {
  mb: 3,
  position: 'relative',
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    bottom: '-20px', // Posiciona o texto de ajuda abaixo do campo
    left: 0,
  },
};

const Signin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', values);
      const { token, user } = response.data;

      // Armazena o token e os dados do usuário no localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('Login bem-sucedido! Redirecionando para a página Main.');
      navigate('/main');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '65vh',
                borderRadius: '5px',
                overflow: 'hidden',
                boxShadow: 2,
              }}
            >
              {/* Caixa de Login */}
              <Box
                sx={{
                  bgcolor: '#e0e1dd',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 4,
                  width: '60%',
                }}
              >
                <Typography variant="h4" sx={{ mb: 2 }}>
                  SIGN IN
                </Typography>

                <Field
                  as={TextField}
                  required
                  id="email"
                  label="Email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  sx={fieldStyles}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />

                <Field
                  as={TextField}
                  required
                  id="password"
                  label="Password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  sx={fieldStyles}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    width: '100%',
                    height: '15%',
                    backgroundColor: '#252525',
                  }}
                  disabled={
                    !values.email ||
                    !values.password ||
                    Boolean(errors.email) ||
                    Boolean(errors.password)
                  }
                >
                  LOGIN
                </Button>
              </Box>

              {/* Caixa de Mensagem de Boas-Vindas */}
              <Box
                sx={{
                  bgcolor: '#023047',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 4,
                  width: '40%',
                }}
              >
                <Typography variant="h4" sx={{ color: '#e0e1dd', mb: 2 }}>
                  Welcome Back!
                </Typography>
                <Typography variant="body1" sx={{ color: '#e0e1dd', mb: 4 }}>
                  Don't have an account? Sign up now!
                </Typography>
                <Button
                  onClick={() => navigate('/signup')}
                  variant="contained"
                  sx={{
                    width: '60%',
                    height: '15%',
                    backgroundColor: '#e0e1dd',
                    color: '#252525',
                  }}
                >
                  SIGN UP
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Signin;
