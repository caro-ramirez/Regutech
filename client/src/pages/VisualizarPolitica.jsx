// client/src/components/VisualizarPolitica.jsx
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Flex, FormControl, FormLabel, Checkbox, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom'; // Si usas react-router
import { FaBookOpen, FaCheckCircle, FaArrowLeft } from 'react-icons/fa'; // Iconos

const VisualizarPolitica = () => {
  const { politicaId } = useParams(); 
  const [politica, setPolitica] = useState(null);
  const [confirmado, setConfirmado] = useState(false);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Simular carga de política
    const fetchedPolitica = {
      id: politicaId, // Usamos el ID de la URL
      nombre: 'Política de Prevención de Lavado de Activos (PLA/FT)', 
      contenido: `
        <h3>Introducción a la Política de PLA/FT</h3>
        <p>Esta política establece las directrices y procedimientos para prevenir, detectar y reportar actividades relacionadas con el Lavado de Activos (LA) y el Financiamiento del Terrorismo (FT) dentro de [Nombre de la PYME Financiera]. Es de cumplimiento obligatorio para todos los empleados, directores y socios.</p>
        
        <h4>Principios Generales</h4>
        <ul>
          <li><strong>Conocimiento del Cliente (KYC):</strong> Debemos aplicar medidas de debida diligencia sobre nuestros clientes, verificando su identidad y comprendiendo la naturaleza de sus actividades.</li>
          <li><strong>Monitoreo de Transacciones:</strong> Se implementarán sistemas de monitoreo para identificar transacciones inusuales o sospechosas.</li>
          <li><strong>Reporte de Operaciones Sospechosas (ROS):</strong> Cualquier operación sospechosa debe ser reportada a la Unidad de Información Financiera (UIF) de acuerdo con la normativa vigente.</li>
          <li><strong>Capacitación Continua:</strong> Todos los empleados recibirán capacitación periódica sobre PLA/FT.</li>
        </ul>
        
        <h4>Responsabilidades</h4>
        <p>Cada empleado es responsable de comprender y aplicar esta política. El Oficial de Cumplimiento es la figura designada para la supervisión de esta política.</p>
        
        <h4>Actualizaciones</h4>
        <p>Esta política será revisada anualmente o ante cualquier cambio regulatorio significativo.</p>
        <p style="margin-top: 50px;">Fecha de Última Actualización: 2025-01-15</p>
        <p>Versión: 1.1</p>
        <p><em>(Este es el final del documento. Por favor, desplácese para abajo para poder confirmar la lectura.)</em></p>
      `,
      estadoLectura: 'Pendiente' // Simula el estado actual del usuario
    };
    setPolitica(fetchedPolitica);
    setConfirmado(fetchedPolitica.estadoLectura === 'Leída');
  }, [politicaId]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // Comprobar si el usuario ha llegado al final del scroll (con un pequeño margen)
    if (scrollHeight - scrollTop <= clientHeight + 5) { // +5px de margen
      setHasScrolledToEnd(true);
    } else {
      setHasScrolledToEnd(false);
    }
  };

  const handleConfirmarLectura = () => {
    if (!politica) return;

    if (!hasScrolledToEnd && !confirmado) {
      toast({
        title: "Lectura Incompleta",
        description: "Por favor, desplácese hasta el final para poder confirmar la lectura completa.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    // Simular la confirmación de lectura
    setConfirmado(true);
    toast({
      title: "Lectura Confirmada",
      description: "¡Su lectura de la política ha sido registrada exitosamente!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    // En una app real, aquí harías una llamada a tu API para registrar la confirmación
    setTimeout(() => { window.location.href = '/listado-politicas'; }, 1500); // Volver al listado
  };

  if (!politica) {
    return (
      <Box p={5} textAlign="center">
        <Heading as="h1" size="xl" color="purple.800">Cargando Política...</Heading>
        <Text color="gray.600">Por favor, espere.</Text>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={6} color="purple.800">
        <FaBookOpen style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} /> Política: {politica.nombre}
      </Heading>
      <Card shadow="md" rounded="lg" p={5}>
        {confirmado && (
          <Flex p={3} bg="green.100" borderColor="green.300" borderWidth="1px" borderRadius="lg" mb={4} align="center" justify="center" textAlign="center">
            <FaCheckCircle color="green.600" style={{ marginRight: '0.5rem' }} />
            <Text fontWeight="bold" color="green.800">¡Ya has confirmado la lectura de esta política!</Text>
          </Flex>
        )}

        <Box 
          className="policy-content" // Puedes añadir estilos específicos para policy-content en style.css si lo deseas
          p={4} 
          borderWidth="1px" 
          borderColor="gray.200" 
          borderRadius="md" 
          mb={6} 
          maxH="450px" 
          overflowY="auto" 
          dangerouslySetInnerHTML={{ __html: politica.contenido }} // Renderiza HTML desde el contenido
          onScroll={handleScroll}
          sx={{
            '::-webkit-scrollbar': { width: '8px', borderRadius: '10px' },
            '::-webkit-scrollbar-thumb': { bg: 'purple.200', borderRadius: '10px' },
            '::-webkit-scrollbar-track': { bg: 'gray.100', borderRadius: '10px' },
            'h3': { fontSize: '1.5em', marginBottom: '0.5em', color: 'purple.700' },
            'h4': { fontSize: '1.2em', marginBottom: '0.4em', color: 'purple.600' },
            'p': { marginBottom: '1em', color: 'gray.700' },
            'ul': { marginLeft: '1.5em', marginBottom: '1em' },
            'li': { marginBottom: '0.5em', color: 'gray.700' },
            'strong': { color: 'purple.800' }
          }}
        >
        </Box>
        
        <Flex justify="space-between" mt={4}>
          <Button variant="outline" colorScheme="purple" leftIcon={<FaArrowLeft />} onClick={() => window.history.back()}>
            Volver al Listado
          </Button>
          <Button 
            colorScheme="purple" 
            rightIcon={<FaCheckCircle />} 
            onClick={handleConfirmarLectura} 
            isDisabled={confirmado || !hasScrolledToEnd} // Deshabilitado si ya confirmó o no hizo scroll
          >
            Confirmar Lectura
          </Button>
        </Flex>
      </Card>
    </Box>
  );
};

export default VisualizarPolitica;