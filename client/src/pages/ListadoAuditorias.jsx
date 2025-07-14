// client/src/components/ListadoAuditorias.jsx
import React from 'react';
import { Box, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, Button, Flex, useColorModeValue, Card } from '@chakra-ui/react';
import { FaClipboardList, FaPlusCircle } from 'react-icons/fa'; // Iconos

const ListadoAuditorias = () => {
  const planesAuditoria = [
    { id: 1, fecha: '2025-08-10', area: 'Procesos de Captación de Clientes', responsable: 'Laura Pérez' },
    { id: 2, fecha: '2025-09-20', area: 'Monitoreo Transaccional PLD', responsable: 'Juan Gómez' },
    { id: 3, fecha: '2025-07-01', area: 'Políticas de Ciberseguridad', responsable: 'Sofía Díaz' },
  ];

  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('purple.800', 'purple.100');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
  const headerBg = useColorModeValue('purple.50', 'gray.800');

  const handleRegistrarHallazgos = (id) => {
    console.log(`Redirigiendo para registrar hallazgos para el Plan de Auditoría ${id}`);
    window.location.href = `/registrar-hallazgos/${id}`;
  };

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={6} color={textColor}>Gestión de Auditorías Internas</Heading>
      
      <Flex justify="flex-end" mb={4}>
        <Button colorScheme="purple" leftIcon={<FaPlusCircle />} onClick={() => window.location.href='/formulario-alta-auditoria'}>
          Nuevo Plan de Auditoría
        </Button>
      </Flex>

      {planesAuditoria.length === 0 ? (
        <Flex justify="center" align="center" minH="200px" bg={cardBg} borderRadius="lg" shadow="md" p={5}>
          <Text fontSize="lg" color={mutedTextColor}>
            No hay planes de auditoría interna registrados en este momento.
          </Text>
        </Flex>
      ) : (
        <Card bg={cardBg} shadow="md" rounded="lg" p={5}>
          <Table variant="simple" size="md">
            <Thead>
              <Tr bg={headerBg}>
                <Th color={textColor}>Fecha</Th>
                <Th color={textColor}>Área a Auditar</Th>
                <Th color={textColor}>Responsable</Th>
                <Th color={textColor}>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {planesAuditoria.map(plan => (
                <Tr key={plan.id}>
                  <Td color={mutedTextColor}>{plan.fecha}</Td>
                  <Td color={mutedTextColor}>{plan.area}</Td>
                  <Td color={mutedTextColor}>{plan.responsable}</Td>
                  <Td>
                    <Button 
                      colorScheme="purple" 
                      size="sm" 
                      onClick={() => handleRegistrarHallazgos(plan.id)}
                    >
                      Registrar Hallazgos
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

export default ListadoAuditorias;