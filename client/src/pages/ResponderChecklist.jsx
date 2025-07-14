// client/src/components/ResponderChecklist.jsx
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Progress, RadioGroup, Stack, Radio, Textarea, FormControl, FormLabel, Flex, useToast, Card } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaSave, FaCheckCircle } from 'react-icons/fa'; // Iconos

const ResponderChecklist = () => {
  const { checklistId } = useParams(); 
  const [preguntas, setPreguntas] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const toast = useToast();

  useEffect(() => {
    const fetchedPreguntas = [
      { id: 1, texto: '¿Se han identificado las partes interesadas relevantes para el SGC?', obligatorio: true },
      { id: 2, texto: '¿Se ha definido el alcance del Sistema de Gestión de Calidad (SGC)?', obligatorio: true },
      { id: 3, texto: '¿Se ha establecido una política de calidad documentada?', obligatorio: false },
      { id: 4, texto: '¿Los objetivos de calidad son coherentes con la política de calidad?', obligatorio: true },
      { id: 5, texto: '¿Se realizan revisiones por la dirección a intervalos planificados?', obligatorio: true },
    ];
    setPreguntas(fetchedPreguntas);

    const savedResponses = {
      1: { opcion: 'Cumple', observaciones: 'Documento de partes interesadas actualizado.' },
      2: { opcion: 'Cumple', observaciones: '' },
    };
    setRespuestas(savedResponses);
  }, [checklistId]);

  const currentQuestion = preguntas[currentQuestionIndex];

  const handleOptionChange = (value) => {
    setRespuestas({
      ...respuestas,
      [currentQuestion.id]: {
        ...respuestas[currentQuestion.id],
        opcion: value,
      },
    });
  };

  const handleObservationsChange = (e) => {
    setRespuestas({
      ...respuestas,
      [currentQuestion.id]: {
        ...respuestas[currentQuestion.id],
        observaciones: e.target.value,
      },
    });
  };

  const handleNext = () => {
    if (currentQuestion.obligatorio && !respuestas[currentQuestion.id]?.opcion) {
      toast({
        title: "Error de Validación",
        description: "Por favor, seleccione una opción para esta pregunta obligatoria.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    toast({
      title: "Respuesta guardada",
      description: "Su respuesta ha sido guardada temporalmente.",
      status: "success",
      duration: 1500,
      isClosable: true,
    });

    if (currentQuestionIndex < preguntas.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      toast({
        title: "Fin del Checklist",
        description: "Has llegado al final del checklist. Haz clic en 'Finalizar Autoevaluación'.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSaveAndExit = () => {
    toast({
      title: "Progreso guardado",
      description: "Su progreso ha sido guardado y está saliendo del checklist.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
    setTimeout(() => { window.location.href = '/listado-checklists'; }, 1000); // Volver al listado
  };

  const handleFinishAutoevaluacion = () => {
    const allObligatoryAnswered = preguntas.every(q => 
      !q.obligatorio || (q.obligatorio && respuestas[q.id]?.opcion)
    );

    if (!allObligatoryAnswered) {
      toast({
        title: "Error de Finalización",
        description: "Por favor, responda todas las preguntas obligatorias antes de finalizar.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    toast({
      title: "Autoevaluación Completada",
      description: "Autoevaluación completada exitosamente. Actualizando Dashboard...",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setTimeout(() => { window.location.href = '/dashboard'; }, 1000); // Volver al dashboard
  };

  if (preguntas.length === 0 || !currentQuestion) {
    return (
      <Box p={5} textAlign="center">
        <Heading as="h1" size="xl" color="purple.800">Cargando Checklist...</Heading>
        <Text color="gray.600">Por favor, espere.</Text>
      </Box>
    );
  }

  const progresoActual = Math.round(((currentQuestionIndex + (respuestas[currentQuestion.id]?.opcion ? 1 : 0)) / preguntas.length) * 100);

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={6} color="purple.800">Autoevaluación: Checklist de Calidad</Heading>
      <Card shadow="md" rounded="lg" p={5}>
        <Progress value={progresoActual} size="lg" colorScheme="purple" mb={4} hasStripe isAnimated />
        <Text textAlign="center" color="gray.600" mb={6}>Pregunta {currentQuestionIndex + 1} de {preguntas.length}</Text>

        <Box mb={6} textAlign="start">
          <Heading as="h4" size="lg" color="purple.800">
            {currentQuestion.texto}
            {currentQuestion.obligatorio && <Text as="span" color="red.500" ml={2}>*</Text>}
          </Heading>
        </Box>

        <FormControl mb={6}>
          <RadioGroup onChange={handleOptionChange} value={respuestas[currentQuestion.id]?.opcion || ''}>
            <Stack direction="column">
              <Radio value="Cumple" colorScheme="purple">Cumple</Radio>
              <Radio value="No Cumple" colorScheme="purple">No Cumple</Radio>
              <Radio value="No Aplica" colorScheme="purple">No Aplica</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl mb={6}>
          <FormLabel color="purple.700">Observaciones (Opcional)</FormLabel>
          <Textarea 
            value={respuestas[currentQuestion.id]?.observaciones || ''} 
            onChange={handleObservationsChange}
            placeholder="Añade aquí tus comentarios o evidencias..."
          />
        </FormControl>

        <Flex justify="space-between" mt={4}>
          <Button 
            variant="outline" 
            colorScheme="purple" 
            leftIcon={<FaArrowLeft />} 
            onClick={handlePrevious} 
            isDisabled={currentQuestionIndex === 0}
          >
            Anterior
          </Button>
          {currentQuestionIndex < preguntas.length - 1 ? (
            <Button colorScheme="purple" rightIcon={<FaArrowRight />} onClick={handleNext}>
              Siguiente Pregunta
            </Button>
          ) : (
            <Button colorScheme="purple" rightIcon={<FaCheckCircle />} onClick={handleFinishAutoevaluacion}>
              Finalizar Autoevaluación
            </Button>
          )}
        </Flex>
        <Button variant="ghost" colorScheme="purple" mt={4} onClick={handleSaveAndExit}>
            <FaSave style={{ marginRight: '0.5rem' }} /> Guardar y Salir
        </Button>
      </Card>
    </Box>
  );
};

export default ResponderChecklist;