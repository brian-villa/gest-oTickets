import React from 'react';
import { TextField, Container, Button, Typography, Box } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

// Definindo o esquema de validação com Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

// Definindo os estilos que serão reutilizados
const fieldStyles = {
  mb: 3,
  position: 'relative',
  '& .MuiFormHelperText-root': {
    position: 'absolute', // Isso posiciona o erro de forma absoluta
    bottom: '-20px', // Coloca o erro abaixo do campo
    left: 0, // Posiciona à esquerda
  },
};

function Signup() {
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
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }} // Valores iniciais
        validationSchema={validationSchema} // Esquema de validação
        onSubmit={(values) => {
          // Função chamada quando o formulário é enviado com sucesso
          console.log(values);
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '80vh',
                borderRadius: '5px',
                overflow: 'hidden',
                boxShadow: 3,
              }}
            >
              <Box
                sx={{
                  bgcolor: '#e0e1dd',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 4,
                }}
              >
                <Typography variant="h4" sx={{ mb: 2 }}>
                  SIGN UP
                </Typography>

                {/* Campos de texto com estilos reutilizados */}
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  type="text"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)} // Aplica borda vermelha
                  helperText={touched.name && errors.name} // Exibe a mensagem de erro abaixo
                  sx={fieldStyles}
                />

                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)} // Aplica borda vermelha
                  helperText={touched.email && errors.email} // Exibe a mensagem de erro abaixo
                  sx={fieldStyles}
                />

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)} // Aplica borda vermelha
                    helperText={touched.password && errors.password} // Exibe a mensagem de erro abaixo
                    sx={{ ...fieldStyles, width: '49%' }}
                  />

                  <Field
                    as={TextField}
                    name="confirmPassword"
                    label="Confirm your password"
                    type="password"
                    fullWidth
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)} // Aplica borda vermelha
                    helperText={touched.confirmPassword && errors.confirmPassword} // Exibe a mensagem de erro abaixo
                    sx={{ ...fieldStyles, width: '49%' }}
                  />
                </Box>

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
                    !values.name ||
                    !values.email ||
                    !values.password ||
                    !values.confirmPassword ||
                    Boolean(errors.name) ||
                    Boolean(errors.email) ||
                    Boolean(errors.password) ||
                    Boolean(errors.confirmPassword)
                  }
                >
                  READY TO GO
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Signup;
