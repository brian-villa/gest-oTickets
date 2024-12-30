import React from 'react';
import { TextField, Box, Container, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

// Definindo o esquema de validação com Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

// Estilos reutilizáveis
const fieldStyles = {
  mb: 4,
  position: 'relative',
  '& .MuiFormHelperText-root': {
    position: 'absolute', // Posiciona o erro abaixo do campo
    bottom: '-20px', // Ajuste a distância entre o campo e o erro
    left: 0, // Alinha o erro à esquerda
  },
};

const Signin = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup'); // Redireciona para a página de cadastro
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
        initialValues={{ email: '', password: '' }} // Valores iniciais do formulário
        validationSchema={validationSchema} // Esquema de validação
        onSubmit={(values) => {
          // Função chamada quando o formulário é enviado com sucesso
          console.log(values);
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <Box
              component="form"
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
                  width:'60%',
                }}
              >
                <Typography variant="h4" sx={{ mb: 2 }}>
                  SIGN IN
                </Typography>

                {/* Campo de email */}
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
                  sx={fieldStyles} // Aplica os estilos reutilizáveis
                  error={touched.email && Boolean(errors.email)} // Aplica borda vermelha se houver erro
                  helperText={touched.email && errors.email} // Exibe o texto de erro abaixo do campo
                />

                {/* Campo de senha */}
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
                  sx={fieldStyles} // Aplica os estilos reutilizáveis
                  error={touched.password && Boolean(errors.password)} // Aplica borda vermelha se houver erro
                  helperText={touched.password && errors.password} // Exibe o texto de erro abaixo do campo
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
                  } // Desabilita o botão se o formulário não for válido
                >
                  Login
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
                  width:'40%'
                }}
              >
                <Typography variant="h4" sx={{ color: '#e0e1dd', mb: 2 }}>
                  Welcome Back!
                </Typography>
                <Typography variant="body1" sx={{ color: '#e0e1dd', mb: 4 }}>
                  Don't have an account? Sign up now!
                </Typography>
                <Button
                  onClick={handleSignUpClick}
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
