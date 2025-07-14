// client/src/components/ListadoPoliticas.jsx
import React from 'react';
import { Box, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, Button, Badge, Flex, useColorModeValue, Card } from '@chakra-ui/react';
import { FaScroll, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa'; // Iconos

const ListadoPoliticas = () => {
  const politicas = [
    { id: 1, nombre: 'Política de Conducta y Ética', estadoLectura: 'Leída' },
    { id: 2, nombre: 'Política de Prevención de Lavado de Activos (PLA/FT)', estadoLectura: 'Pendiente' },
    { id: 3, nombre: 'Política de Protección de Datos Personales', estadoLectura: 'Pendiente' },
    { id: 4, nombre: 'Política de Ciberseguridad Financiera', estadoLectura: 'Leída' },
  ];

  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('purple.800', 'purple.100');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
  const headerBg = useColorModeValue('purple.50', 'gray.800');

  const handleVerPoliticaClick = (id) => {
    console.log(`Redirigiendo para ver Política ${id}`);
    window.location.href = `/ver-politica/${id}`;
  };

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={6} color={textColor}>Listado de Políticas de Compliance</Heading>
      
      {politicas.length === 0 ? (
        <Flex justify="center" align="center" minH="200px" bg={cardBg} borderRadius="lg" shadow="md" p={5}>
          <Text fontSize="lg" color={mutedTextColor}>
            No hay políticas de compliance disponibles en este momento.
          </Text>
        </Flex>
      ) : (
        <Card bg={cardBg} shadow="md" rounded="lg" p={5}>
          <Table variant="simple" size="md">
            <Thead>
              <Tr bg={headerBg}>
                <Th color={textColor}>Nombre de la Política</Th>
                <Th color={textColor}>Estado de Lectura</Th>
                <Th color={textColor}>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {politicas.map(politica => (
                <Tr key={politica.id}>
                  <Td color={mutedTextColor}>{politica.nombre}</Td>
                  <Td>
                    {politica.estadoLectura === 'Leída' ? (
                      <Badge colorScheme="green" variant="solid" px={3} py={1} borderRadius="full">
                        <Flex align="center">
                          <FaCheckCircle style={{ marginRight: '0.5rem' }} /> Leída
                        </Flex>
                      </Badge>
                    ) : (
                      <Badge colorScheme="orange" variant="solid" px={3} py={1} borderRadius="full">
                        <Flex align="center">
                          <FaHourglassHalf style={{ marginRight: '0.5rem' }} /> Pendiente
                        </Flex>
                      </Badge>
                    )}
                  </Td>
                  <Td>
                    <Button 
                      colorScheme="purple" 
                      size="sm" 
                      onClick={() => handleVerPoliticaClick(politica.id)}
                    >
                      Ver Política
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Card>
      )}
      <Flex justify="center" mt={6}>
        <Button variant="outline" colorScheme="purple" onClick={() => window.history.back()}>
          Volver al Dashboard
        </Button>
      </Flex>
    </Box>
  );
};

export default ListadoPoliticas;