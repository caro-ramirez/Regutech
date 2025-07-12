// client/src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, Link, VStack, useToast, Divider } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc'; // Icono de Google (necesitarás instalar react-icons)

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: 'Inicio de sesión exitoso',
        description: '¡Bienvenido de nuevo!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.message || 'Credenciales inválidas. Inténtalo de nuevo.';
      toast({
        title: 'Error de inicio de sesión',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleGoogleLogin = () => {
    // Redirige al endpoint de Google OAuth en tu back-end
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  return (
    <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" margin="auto" mt={10}>
      <Heading mb={4} textAlign="center">Iniciar Sesión en ReguTech</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="email">
            <FormLabel>Correo Electrónico</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            Ingresar
          </Button>
        </VStack>
      </form>

      <Divider my={6} /> {/* Separador */}

      <Button
        leftIcon={<FcGoogle />}
        width="full"
        colorScheme="red" // Usar color de Google o similar
        variant="outline"
        onClick={handleGoogleLogin}
      >
        Iniciar Sesión con Google
      </Button>

      <Text mt={4} textAlign="center">
        ¿No tienes una cuenta? <Link color="blue.500" onClick={() => navigate('/register')}>Regístrate</Link>
      </Text>
    </Box>
  );
}

export default Login;