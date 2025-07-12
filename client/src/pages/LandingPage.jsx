// client/src/pages/LandingPage.jsx
import React from 'react';
import { Box, Heading, Text, VStack, Container } from '@chakra-ui/react';

function LandingPage() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Container maxW="container.md">
        <VStack spacing={4}>
          <Heading as="h1" size="xl" mb={4}>
            Bienvenido a ReguTech: Tu Socio en Cumplimiento Normativo
          </Heading>
          <Text fontSize="lg">
            ReguTech es la plataforma líder diseñada para simplificar la gestión de calidad ISO 9001
            y el cumplimiento de normativas financieras específicas para PYMEs no bancarizadas.
          </Text>
          <Text fontSize="md">
            Automatiza tus checklists, gestiona riesgos, audita internamente y accede a reportes clave
            para asegurar la adhesión a la normativa y proteger tu negocio.
          </Text>
          <Text fontSize="md">
            Con ReguTech, las multas y sanciones son cosa del pasado. Enfócate en crecer,
            nosotros nos encargamos del cumplimiento.
          </Text>
          {/* Puedes añadir más secciones aquí: características, testimonios, etc. */}
        </VStack>
      </Container>
    </Box>
  );
}

export default LandingPage;