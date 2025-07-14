// client/src/components/FormularioRegistroHallazgos.jsx
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, FormControl, FormLabel, Textarea, Flex, useToast, Card } from '@chakra-ui/react';
import { useParams } from 'react-router-dom'; // Para obtener el ID del plan de auditoría
import { FaSave, FaBan } from 'react-icons/fa'; // Iconos

const FormularioRegistroHallazgos = () => {
  const { planId } = useParams(); // ID del plan de auditoría al que se asocia el hallazgo
  const [descripcionHallazgo, setDescripcionHallazgo] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [planAuditoriaInfo, setPlanAuditoriaInfo] = useState(null); // Info del plan asociado
  const toast = useToast();

  useEffect(() => {
    // Simular carga de información del plan de auditoría (para mostrar en el título)
    const fetchedPlanInfo = {
      id: planId,
      fecha: '2025-08-10',
      area: 'Procesos de Captación de Clientes'
    };
    setPlanAuditoriaInfo(fetchedPlanInfo);
  }, [planId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!descripcionHallazgo) {
      toast({
        title: "Error de Validación",
        description: "La descripción del hallazgo es obligatoria.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Hallazgo Registrado",
      description: "Hallazgo registrado exitosamente.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setTimeout(() => {
      window.location.href = '/listado-auditorias'; 
    }, 1500);
  };

  if (!planAuditoriaInfo) {
    return (
      <Box p={5} textAlign="center">
        <Heading as="h1" size="xl" color="purple.800">Cargando información del Plan...</Heading>
        <Text color="gray.600">Por favor, espere.</Text>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={6} color="purple.800">
        Registrar Hallazgos para Auditoría: {planAuditoriaInfo.fecha} - {planAuditoriaInfo.area}
      </Heading>
      <Card shadow="md" rounded="lg" p={5}>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel color="purple.700">Descripción del Hallazgo</FormLabel>
            <Textarea
              value={descripcionHallazgo}
              onChange={(e) => setDescripcionHallazgo(e.target.value)}
              placeholder="Ej: No se cumple con el procedimiento de verificación de identidad de clientes..."
              rows={4}
            />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel color="purple.700">Observaciones (Opcional)</FormLabel>
            <Textarea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Ej: Se detectó falta de capacitación en el equipo de ventas."
              rows={3}
            />
          </FormControl>

          <Flex justify="space-between" mt={4}>
            <Button variant="outline" colorScheme="purple" leftIcon={<FaBan />} onClick={() => window.history.back()}>
              Cancelar
            </Button>
            <Button colorScheme="purple" rightIcon={<FaSave />} type="submit">
              Guardar Hallazgo
            </Button>
          </Flex>
        </form>
      </Card>
    </Box>
  );
};

export default FormularioRegistroHallazgos;