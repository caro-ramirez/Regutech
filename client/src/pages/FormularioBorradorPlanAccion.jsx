// client/src/components/FormularioBorradorPlanAccion.jsx
import React, { useState } from 'react';
import { Box, Heading, Text, Button, FormControl, FormLabel, Input, Textarea, Select, Flex, useToast, Card } from '@chakra-ui/react';
import { FaSave, FaBan } from 'react-icons/fa'; // Iconos

const FormularioBorradorPlanAccion = ({ areaPrioritaria = 'Área Crítica (Ejemplo)', accionPropuesta = 'Acción sugerida (Ejemplo)' }) => {
  const [responsableAsignado, setResponsableAsignado] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [descripcionDetallada, setDescripcionDetallada] = useState('');
  const toast = useToast();

  const colaboradores = [
    { id: 'col1', nombre: 'Juan Pérez' },
    { id: 'col2', nombre: 'María Gómez' },
    { id: 'col3', nombre: 'Laura Díaz' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!responsableAsignado || !fechaLimite || !descripcionDetallada) {
      toast({
        title: "Error de Validación",
        description: "Por favor, complete todos los campos obligatorios del plan de acción.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Plan de Acción Guardado",
      description: "El borrador de Plan de Acción ha sido guardado exitosamente.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setTimeout(() => {
      window.location.href = '/dashboard'; 
    }, 1500);
  };

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={6} color="purple.800">Borrador de Plan de Acción de Mejora</Heading>
      <Card shadow="md" rounded="lg" p={5}>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel color="purple.700">Área Afectada (Pre-llenado)</FormLabel>
            <Input value={areaPrioritaria} isReadOnly />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel color="purple.700">Acción Propuesta (Pre-llenado)</FormLabel>
            <Input value={accionPropuesta} isReadOnly />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel color="purple.700">Responsable Asignado</FormLabel>
            <Select placeholder="Seleccione un Colaborador..." value={responsableAsignado} onChange={(e) => setResponsableAsignado(e.target.value)}>
              {colaboradores.map(col => (
                <option key={col.id} value={col.nombre}>{col.nombre}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel color="purple.700">Fecha Límite</FormLabel>
            <Input type="date" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} />
          </FormControl>

          <FormControl mb={6} isRequired>
            <FormLabel color="purple.700">Descripción Detallada del Plan</FormLabel>
            <Textarea
              value={descripcionDetallada}
              onChange={(e) => setDescripcionDetallada(e.target.value)}
              placeholder="Describa los pasos específicos para ejecutar esta acción de mejora..."
              rows={5}
            />
          </FormControl>

          <Flex justify="space-between" mt={4}>
            <Button variant="outline" colorScheme="purple" leftIcon={<FaBan />} onClick={() => window.history.back()}>
              Cancelar
            </Button>
            <Button colorScheme="purple" rightIcon={<FaSave />} type="submit">
              Guardar Plan Final
            </Button>
          </Flex>
        </form>
      </Card>
    </Box>
  );
};

export default FormularioBorradorPlanAccion;