// client/src/components/FormularioAltaAuditoria.jsx
import React, { useState } from 'react';
import { Box, Heading, Text, Button, FormControl, FormLabel, Input, Flex, useToast, Card } from '@chakra-ui/react';
import { FaSave, FaBan } from 'react-icons/fa'; // Iconos

const FormularioAltaAuditoria = () => {
  const [fecha, setFecha] = useState('');
  const [area, setArea] = useState('');
  const [responsable, setResponsable] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!fecha || !area || !responsable) {
      toast({
        title: "Error de Validación",
        description: "Por favor, complete todos los campos obligatorios.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const today = new Date();
    const selectedDate = new Date(fecha);
    if (selectedDate <= today) {
      toast({
        title: "Fecha Inválida",
        description: "La fecha de la auditoría debe ser futura.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Plan Registrado",
      description: "Plan de auditoría registrado exitosamente.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setTimeout(() => {
      window.location.href = '/listado-auditorias'; 
    }, 1500);
  };

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={6} color="purple.800">Registrar Nuevo Plan de Auditoría Interna</Heading>
      <Card shadow="md" rounded="lg" p={5}>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel color="purple.700">Fecha</FormLabel>
            <Input 
              type="date" 
              value={fecha} 
              onChange={(e) => setFecha(e.target.value)} 
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel color="purple.700">Área a Auditar</FormLabel>
            <Input 
              type="text" 
              value={area} 
              onChange={(e) => setArea(e.target.value)} 
              placeholder="Ej: Procesos de PLD"
            />
          </FormControl>

          <FormControl mb={6} isRequired>
            <FormLabel color="purple.700">Responsable</FormLabel>
            <Input 
              type="text" 
              value={responsable} 
              onChange={(e) => setResponsable(e.target.value)} 
              placeholder="Ej: Laura Pérez - Auditor Interno"
            />
          </FormControl>

          <Flex justify="space-between" mt={4}>
            <Button variant="outline" colorScheme="purple" leftIcon={<FaBan />} onClick={() => window.history.back()}>
              Cancelar
            </Button>
            <Button colorScheme="purple" rightIcon={<FaSave />} type="submit">
              Guardar
            </Button>
          </Flex>
        </form>
      </Card>
    </Box>
  );
};

export default FormularioAltaAuditoria;