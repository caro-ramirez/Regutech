// client/src/components/layout/Footer.jsx
import React from 'react';
import { Box, Flex, Button, Text, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <Box bg="gray.800" color="white" py={6} px={8} mt="auto">
      <Flex
        align="center"
        justify={{ base: 'center', md: 'space-between' }}
        direction={{ base: 'column', md: 'row' }}
        wrap="wrap"
        maxW="container.xl"
        mx="auto"
      >
        <Text mb={{ base: 4, md: 0 }}>
          © {new Date().getFullYear()} ReguTech. Todos los derechos reservados.
        </Text>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
          <Button colorScheme="green" onClick={() => alert('Funcionalidad de "Comprar" en desarrollo')}>
            Comprar
          </Button>
          <Button colorScheme="blue" onClick={() => navigate('/login')}>
            Login
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Footer;