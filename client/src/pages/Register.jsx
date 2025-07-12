// C:\Users\caror\Regutech\client\src\pages\Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Importa el hook useAuth
import { useNavigate } from 'react-router-dom';
// Importa componentes de Chakra UI si los tienes instalados, ej:
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, Link, VStack, useToast } from '@chakra-ui/react';


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth(); // Obtén la función register del contexto
  const navigate = useNavigate();
  const toast = useToast(); // Hook para mostrar notificaciones

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Error de registro',
        description: 'Las contraseñas no coinciden.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await register({ nombreCompleto: name, email, password });
      toast({
        title: 'Registro exitoso',
        description: '¡Tu cuenta ha sido creada!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/dashboard'); // Redirige al dashboard
    } catch (error) {
      const errorMessage = error.message || 'Error al registrar el usuario. Inténtalo de nuevo.';
      toast({
        title: 'Error de registro',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" margin="auto" mt={10}>
      <Heading mb={4} textAlign="center">Registrarse en ReguTech</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="name">
            <FormLabel>Nombre Completo</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormControl>
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
          <FormControl id="confirm-password">
            <FormLabel>Confirmar Contraseña</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            Crear Cuenta
          </Button>
        </VStack>
      </form>
      <Text mt={4} textAlign="center">
        ¿Ya tienes una cuenta? <Link color="blue.500" onClick={() => navigate('/login')}>Inicia Sesión</Link>
      </Text>
    </Box>
  );
}

export default Register;