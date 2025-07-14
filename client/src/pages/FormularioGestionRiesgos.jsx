// client/src/components/FormularioGestionRiesgos.jsx
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, FormControl, FormLabel, Input, Textarea, Select, Flex, useToast, RadioGroup, Stack, Radio, Card } from '@chakra-ui/react';
import { useParams } from 'react-router-dom'; // Si usas react-router para edición
import { FaSave, FaBan } from 'react-icons/fa'; // Iconos

const FormularioGestionRiesgos = () => {
  const { riesgoId } = useParams(); // Para modo edición
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('Riesgo'); // Default a Riesgo
  const [probabilidad, setProbabilidad] = useState('');
  const [impacto, setImpacto] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (riesgoId) {
      // Simular carga de datos para edición
      const riesgoAEditar = {
        id: riesgoId,
        descripcion: 'Riesgo de ciberataque a base de datos de clientes',
        tipo: 'Riesgo',
        probabilidad: 'Media',
        impacto: 'Alto'
      };
      setDescripcion(riesgoAEditar.descripcion);
      setTipo(riesgoAEditar.tipo);
      setProbabilidad(riesgoAEditar.probabilidad);
      setImpacto(riesgoAEditar.impacto);
    }
  }, [riesgoId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!descripcion || !probabilidad || !impacto) {
      toast({
        title: "Error de Validación",
        description: "Por favor, complete todos los campos obligatorios.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Simular guardado/actualización
    toast({
      title: riesgoId ? "Riesgo Actualizado" : "Riesgo Registrado",
      description: riesgoId ? "Riesgo/Oportunidad actualizado exitosamente." : "Riesgo/Oportunidad registrado exitosamente.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setTimeout(() => {
      window.location.href = '/dashboard'; // Volver al dashboard o listado de riesgos
    }, 1500);
  };

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={6} color="purple.800">{riesgoId ? 'Editar Riesgo / Oportunidad' : 'Registrar Nuevo Riesgo / Oportunidad'}</Heading>
      <Card shadow="md" rounded="lg" p={5}>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel color="purple.700">Descripción</FormLabel>
            <Textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej: Riesgo de incumplimiento por nueva regulación de criptoactivos."
              rows={3}
            />
          </FormControl>

          <FormControl mb={4} isReadOnly={!!riesgoId}>
            <FormLabel color="purple.700">Tipo</FormLabel>
            <RadioGroup onChange={setTipo} value={tipo}>
              <Stack direction="row" spacing={5}>
                <Radio value="Riesgo" colorScheme="purple">Riesgo</Radio>
                <Radio value="Oportunidad" colorScheme="purple">Oportunidad</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel color="purple.700">Probabilidad</FormLabel>
            <Select placeholder="Seleccione..." value={probabilidad} onChange={(e) => setProbabilidad(e.target.value)}>
              <option value="">Seleccione...</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </Select>
          </FormControl>

          <FormControl mb={6} isRequired>
            <FormLabel color="purple.700">Impacto</FormLabel>
            <Select placeholder="Seleccione..." value={impacto} onChange={(e) => setImpacto(e.target.value)}>
              <option value="">Seleccione...</option>
              <option value="Bajo">Bajo</option>
              <option value="Medio">Medio</option>
              <option value="Alto">Alto</option>
            </Select>
          </FormControl>

          <Flex justify="space-between" mt={4}>
            <Button variant="outline" colorScheme="purple" leftIcon={<FaBan />} onClick={() => window.history.back()}>
              Cancelar
            </Button>
            <Button colorScheme="purple" rightIcon={<FaSave />} type="submit">
              {riesgoId ? 'Guardar Cambios' : 'Guardar'}
            </Button>
          </Flex>
        </form>
      </Card>
    </Box>
  );
};

export default FormularioGestionRiesgos;