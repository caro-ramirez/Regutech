// client/src/components/ListadoChecklists.jsx
import React from 'react';
import { Box, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, Button, Progress, Badge, Flex, useColorModeValue, Card } from '@chakra-ui/react';
import { FaListCheck, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa'; // Iconos

const ListadoChecklists = () => {
  const checklists = [
    { id: 1, nombre: 'Checklist Sección 4: Contexto de la Organización', estado: 'En Progreso', progreso: 60 },
    { id: 2, nombre: 'Checklist Sección 5: Liderazgo', estado: 'Pendiente', progreso: 0 },
    { id: 3, nombre: 'Checklist Sección 6: Planificación', estado: 'Completado', progreso: 100 },
    { id: 4, nombre: 'Checklist Sección 7: Recursos', estado: 'Pendiente', progreso: 0 },
  ];

  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('purple.800', 'purple.100');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
  const headerBg = useColorModeValue('purple.50', 'gray.800');

  const handleResponderClick = (id) => {
    console.log(`Redirigiendo para responder Checklist ${id}`);
    window.location.href = `/responder-checklist/${id}`; 
  };

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={6} color={textColor}>Listado de Checklists de Autoevaluación ISO 9001</Heading>
      
      {checklists.length === 0 ? (
        <Flex justify="center" align="center" minH="200px" bg={cardBg} borderRadius="lg" shadow="md" p={5}>
          <Text fontSize="lg" color={mutedTextColor}>
            No hay checklists de autoevaluación ISO 9001 disponibles en este momento.
          </Text>
        </Flex>
      ) : (
        <Card bg={cardBg} shadow="md" rounded="lg" p={5}>
          <Table variant="simple" size="md">
            <Thead>
              <Tr bg={headerBg}>
                <Th color={textColor}>Nombre del Checklist</Th>
                <Th color={textColor}>Estado de Completitud</Th>
                <Th color={textColor}>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {checklists.map(checklist => (
                <Tr key={checklist.id}>
                  <Td color={mutedTextColor}>{checklist.nombre}</Td>
                  <Td>
                    {checklist.estado === 'Completado' ? (
                      <Badge colorScheme="green" variant="solid" px={3} py={1} borderRadius="full">
                        <Flex align="center">
                          <FaCheckCircle style={{ marginRight: '0.5rem' }} /> {checklist.estado}
                        </Flex>
                      </Badge>
                    ) : (
                      <Box>
                        <Progress value={checklist.progreso} size="sm" colorScheme="purple" mb={1} />
                        <Text fontSize="sm" color={mutedTextColor}>{checklist.estado} ({checklist.progreso}%)</Text>
                      </Box>
                    )}
                  </Td>
                  <Td>
                    <Button 
                      colorScheme="purple" 
                      size="sm" 
                      onClick={() => handleResponderClick(checklist.id)}
                      isDisabled={checklist.estado === 'Completado'}
                    >
                      {checklist.estado === 'Completado' ? 'Ver Respuestas' : 'Responder'}
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

export default ListadoChecklists;