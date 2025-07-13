import React, { useState } from 'react';
import { Box, Heading, Text, Flex, SimpleGrid, Card, CardHeader, CardBody, Button, Link, Progress, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Textarea, Select } from '@chakra-ui/react';
import { FaExclamationTriangle, FaListCheck, FaScroll, FaChartLine, FaChartPie, FaBullseye, FaLightbulb, FaArrowAltCircleDown } from 'react-icons/fa'; // Iconos de FontAwesome para React

const dashboard = () => {
  // --- Datos de Ejemplo para CU-001 (Optimizar Cumplimiento Regulatorio) ---
  const porcentajeCumplimiento = 85;
  const areasRiesgoPotencial = [
    { nombre: 'Recursos Humanos', tendencia: 'Cumplimiento decreciente' },
    { nombre: 'Operaciones', tendencia: 'Brechas en procesos clave' },
  ];
  const alertaInactividad = {
    activa: true,
    nombreAutoevaluacion: 'Autoevaluación ISO 9001: Sección 7',
    mensaje: 'Ha estado en progreso por más de 45 días sin actividad.',
  };
  const sugerenciaTareaCritica = {
    activa: true,
    nombreTarea: 'Autoevaluación ISO 9001: Sección 7',
    mensaje: 'Tienes una autoevaluación crítica pendiente: ',
  };
  const datosInsuficientesTendencias = false; 

  // --- Datos de Ejemplo para CU-002 (Gestionar Riesgos y Mejoras Continuas) ---
  const mapaCalorRiesgos = {
    'Baja-Bajo': { count: 2, color: '#D4EDDA' }, // Green
    'Baja-Medio': { count: 1, color: '#D1E7DD' },
    'Baja-Alto': { count: 0, color: '#FFE6CC' }, // Light Orange
    'Media-Bajo': { count: 3, color: '#D1E7DD' },
    'Media-Medio': { count: 2, color: '#FFF3CD' }, // Yellow
    'Media-Alto': { count: 1, color: '#FFD799' }, // Medium Orange
    'Alta-Bajo': { count: 0, color: '#FFE6CC' },
    'Alta-Medio': { count: 1, color: '#FFD799' },
    'Alta-Alto': { count: 1, color: '#F8D7DA' } // Red
  };
  const riesgosCriticos = [
    { id: 1, nombre: 'Riesgo de Fraude Interno', accionSugerida: 'Revisar políticas de control interno de transacciones.' },
    { id: 2, nombre: 'Incumplimiento Normativa BCRA', accionSugerida: 'Consultar asesoría legal y actualizar procedimientos.' },
  ];
  const resumenHallazgos = [
    { area: 'Operaciones de Clientes', cantidad: 5, umbralExcedido: true },
    { area: 'Prevención de Lavado de Activos', cantidad: 3, umbralExcedido: false },
    { area: 'Tecnología de la Información', cantidad: 1, umbralExcedido: false },
  ];
  const sugerenciaAccionMejoraPrioritaria = {
    activa: true,
    area: resumenHallazgos[0]?.area || 'Área Crítica',
    accion: 'Diseñar Plan de Acción Correctiva Detallado para ' + (resumenHallazgos[0]?.area || 'Área Crítica'),
  };

  const { isOpen, onOpen, onClose } = useDisclosure(); // Para el modal del borrador

  // Estados para el formulario del borrador del plan de acción
  const [responsableAsignado, setResponsableAsignado] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [descripcionDetallada, setDescripcionDetallada] = useState('');

  // Datos simulados de colaboradores para el select
  const colaboradores = [
    { id: 'col1', nombre: 'Juan Pérez' },
    { id: 'col2', nombre: 'María Gómez' },
    { id: 'col3', nombre: 'Laura Díaz' },
  ];

  const handleGuardarPlanFinal = () => {
    // Validaciones básicas para el formulario del modal
    if (!responsableAsignado || !fechaLimite || !descripcionDetallada) {
      alert('Por favor, complete todos los campos obligatorios del plan de acción.');
      return;
    }
    alert(`Plan de Acción Finalizado para ${sugerenciaAccionMejoraPrioritaria.area} y asignado a ${responsableAsignado}! (Simulado)`);
    onClose(); // Cierra el modal
    // Aquí iría la lógica para enviar los datos a tu backend
  };


  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={6} color="purple.800">Dashboard Principal</Heading>

      {/* Sección Alerta Visual por Inactividad (Parte de CU-001) */}
      {alertaInactividad.activa && (
        <Flex p={4} bg="orange.100" borderColor="orange.300" borderWidth="1px" borderRadius="lg" mb={6} align="center" justify="space-between">
          <Flex align="center">
            <FaExclamationTriangle size="24px" color="orange.600" style={{ marginRight: '1rem' }} />
            <Box>
              <Text fontWeight="bold" color="orange.800">¡Atención: Autoevaluación Pendiente!</Text>
              <Text fontSize="sm" color="orange.700">
                {sugerenciaTareaCritica.mensaje} <Text as="b">{sugerenciaTareaCritica.nombreTarea}</Text>. {alertaInactividad.mensaje}
              </Text>
            </Box>
          </Flex>
          <Button colorScheme="purple" onClick={() => window.location.href='/responder-checklist/seccion7'}>
            Continuar Autoevaluación
          </Button>
        </Flex>
      )}

      {/* Sección de Tareas de Compliance Pendientes (Parte de CU-001) */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
        <Card shadow="md" rounded="lg" p={5}>
          <CardHeader p={0} mb={3}>
            <Flex align="center">
              <FaListCheck size="30px" color="purple.500" style={{ marginRight: '1rem' }} />
              <Heading as="h3" size="md" color="purple.800">Autoevaluación ISO 9001</Heading>
            </Flex>
          </CardHeader>
          <CardBody p={0}>
            <Text mb={4} color="gray.600">Inicia o continúa tus autoevaluaciones para medir el cumplimiento de tu PYME.</Text>
            <Button colorScheme="purple" onClick={() => window.location.href='/listado-checklists'}>
              Ir a Autoevaluaciones
            </Button>
          </CardBody>
        </Card>
        <Card shadow="md" rounded="lg" p={5}>
          <CardHeader p={0} mb={3}>
            <Flex align="center">
              <FaScroll size="30px" color="purple.500" style={{ marginRight: '1rem' }} />
              <Heading as="h3" size="md" color="purple.800">Políticas de Compliance</Heading>
            </Flex>
          </CardHeader>
          <CardBody p={0}>
            <Text mb={4} color="gray.600">Visualiza y confirma la lectura de las políticas internas de tu empresa.</Text>
            <Button colorScheme="purple" onClick={() => window.location.href='/listado-politicas'}>
              Ir a Políticas
            </Button>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Sección Proyección de Cumplimiento ISO (Parte de CU-001) */}
      <Card shadow="md" rounded="lg" p={5} mb={8}>
        <Heading as="h3" size="md" textAlign="center" mb={4} color="purple.800">
          <FaChartLine style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} /> Proyección de Cumplimiento ISO 9001
        </Heading>
        {datosInsuficientesTendencias ? (
            <Text textAlign="center" color="gray.600">
                No hay datos suficientes para proyectar tendencias. Complete más checklists para activar este análisis.
                <Button variant="outline" colorScheme="purple" size="sm" ml={3} onClick={() => window.location.href='/listado-checklists'}>
                    Ir a Autoevaluaciones
                </Button>
            </Text>
        ) : (
            <Flex direction={{ base: 'column', md: 'row' }} align="center" mt={4}>
                <Box flex="1" textAlign="center" mb={{ base: 4, md: 0 }}>
                    <Heading as="h4" size="2xl" color="purple.600">{porcentajeCumplimiento}%</Heading>
                    <Text color="gray.600">Cumplimiento General Actual</Text>
                </Box>
                <Box flex="2" textAlign="start">
                    <Text fontWeight="bold" color="purple.800" mb={2}>Áreas con Tendencia de Riesgo Potencial:</Text>
                    {areasRiesgoPotencial.length > 0 ? (
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {areasRiesgoPotencial.map((area, index) => (
                                <li key={index} style={{ marginBottom: '0.5rem', color: 'gray.600' }}>
                                    <FaArrowAltCircleDown color="red.500" style={{ marginRight: '0.5rem' }} />
                                    <Text as="span" fontWeight="bold">{area.nombre}:</Text> {area.tendencia}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Text color="gray.600">No se identificaron tendencias de riesgo en el cumplimiento actual.</Text>
                    )}
                </Box>
            </Flex>
        )}
      </Card>

      {/* Sección de Acciones de Gestión de Riesgos y Auditorías (Parte de CU-002) */}
      <Heading as="h2" size="xl" textAlign="center" mb={6} mt={10} color="purple.800">Gestión Estratégica</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
        <Card shadow="md" rounded="lg" p={5}>
          <CardHeader p={0} mb={3}>
            <Flex align="center">
              <FaExclamationTriangle size="30px" color="purple.500" style={{ marginRight: '1rem' }} />
              <Heading as="h3" size="md" color="purple.800">Gestión de Riesgos y Oportunidades</Heading>
            </Flex>
          </CardHeader>
          <CardBody p={0}>
            <Text mb={4} color="gray.600">Registra y actualiza los riesgos y oportunidades que impactan a tu PYME financiera. Alimenta el análisis proactivo del sistema.</Text>
            <Button colorScheme="purple" onClick={() => window.location.href='/formulario-gestion-riesgos'}>
              Nuevo Riesgo/Oportunidad
            </Button>
            <Button variant="outline" colorScheme="purple" ml={2} onClick={() => window.location.href='/listado-riesgos'}>
              Ver todos los riesgos
            </Button>
          </CardBody>
        </Card>
        <Card shadow="md" rounded="lg" p={5}>
          <CardHeader p={0} mb={3}>
            <Flex align="center">
              <FaClipboardList size="30px" color="purple.500" style={{ marginRight: '1rem' }} />
              <Heading as="h3" size="md" color="purple.800">Gestión de Auditorías Internas</Heading>
            </Flex>
          </CardHeader>
          <CardBody p={0}>
            <Text mb={4} color="gray.600">Planifica auditorías y registra hallazgos. Datos esenciales para la priorización automatizada de mejoras.</Text>
            <Button colorScheme="purple" onClick={() => window.location.href='/formulario-alta-auditoria'}>
              Nuevo Plan de Auditoría
            </Button>
            <Button variant="outline" colorScheme="purple" ml={2} onClick={() => window.location.href='/listado-auditorias'}>
              Ver todos los planes
            </Button>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Sección para Análisis y Priorización de Riesgos (Parte de CU-002) */}
      <Card shadow="md" rounded="lg" p={5} mb={8}>
        <Heading as="h3" size="md" textAlign="center" mb={4} color="purple.800">
          <FaChartPie style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} /> Análisis y Priorización de Riesgos
        </Heading>
        <Flex direction={{ base: 'column', lg: 'row' }} mt={4} gap={6}>
          <Box flex="1" textAlign="center">
            <Text fontWeight="bold" color="purple.800" mb={3}>Mapa de Calor de Riesgos</Text>
            <Box overflowX="auto" pb={2}>
              <table style={{ width: '100%', maxWidth: '300px', margin: '0 auto', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f0f0f0', color: '#5e4d7d' }}>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Impacto \ Prob.</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Baja</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Media</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Alta</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#f0f0f0', color: '#5e4d7d' }}>Bajo</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: mapaCalorRiesgos['Baja-Bajo'].color }}>{mapaCalorRiesgos['Baja-Bajo'].count}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: mapaCalorRiesgos['Media-Bajo'].color }}>{mapaCalorRiesgos['Media-Bajo'].count}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: mapaCalorRiesgos['Alta-Bajo'].color }}>{mapaCalorRiesgos['Alta-Bajo'].count}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#f0f0f0', color: '#5e4d7d' }}>Medio</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: mapaCalorRiesgos['Baja-Medio'].color }}>{mapaCalorRiesgos['Baja-Medio'].count}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: mapaCalorRiesgos['Media-Medio'].color }}>{mapaCalorRiesgos['Media-Medio'].count}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: mapaCalorRiesgos['Alta-Medio'].color }}>{mapaCalorRiesgos['Alta-Medio'].count}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#f0f0f0', color: '#5e4d7d' }}>Alto</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: mapaCalorRiesgos['Baja-Alto'].color }}>{mapaCalorRiesgos['Baja-Alto'].count}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: mapaCalorRiesgos['Media-Alto'].color }}>{mapaCalorRiesgos['Media-Alto'].count}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: mapaCalorRiesgos['Alta-Alto'].color }}>{mapaCalorRiesgos['Alta-Alto'].count}</td>
                  </tr>
                </tbody>
              </table>
            </Box>
            <Text fontSize="sm" color="gray.600" mt={2}>Colores: Verde (Bajo), Amarillo (Medio), Rojo (Alto).</Text>
          </Box>
          <Box flex="1" textAlign="start">
            <Text fontWeight="bold" color="purple.800" mb={3}>Principales Riesgos a Priorizar:</Text>
            {riesgosCriticos.length > 0 ? (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {riesgosCriticos.map(riesgo => (
                  <li key={riesgo.id} style={{ marginBottom: '0.75rem' }}>
                    <Flex align="center">
                      <FaExclamationTriangle color="red.500" style={{ marginRight: '0.5rem' }} />
                      <Box>
                        <Text as="span" fontWeight="bold" color="purple.800">{riesgo.nombre}:</Text> <Text as="span" color="gray.700">{riesgo.accionSugerida}</Text>
                        <Link href={`/riesgos/${riesgo.id}`} fontSize="sm" color="purple.600" ml={2}>Ver detalles</Link>
                      </Box>
                    </Flex>
                  </li>
                ))}
              </ul>
            ) : (
              <Text color="gray.600">No se identificaron riesgos de alta criticidad que requieran atención inmediata. ¡Bien hecho!</Text>
            )}
          </Box>
        </Flex>
      </Card>

      {/* Sección para Priorización de Mejoras por Área Auditada (Parte de CU-002) */}
      <Card shadow="md" rounded="lg" p={5} mb={8}>
        <Heading as="h3" size="md" textAlign="center" mb={4} color="purple.800">
          <FaBullseye style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} /> Priorización de Mejoras por Área Auditada
        </Heading>
        
        {sugerenciaAccionMejoraPrioritaria.activa && (
            <Flex p={4} bg="purple.50" borderColor="purple.200" borderWidth="1px" borderRadius="lg" mb={4} align="center" justify="center" direction={{ base: 'column', md: 'row' }} textAlign="center">
                <FaLightbulb size="30px" color="purple.600" style={{ marginRight: '1rem', flexShrink: 0 }} />
                <Box>
                    <Text fontWeight="bold" color="purple.700" mb={1}>ACCIÓN PRIORITARIA RECOMENDADA:</Text>
                    <Text color="gray.700">
                        <Text as="b">{sugerenciaAccionMejoraPrioritaria.accion}</Text> (Basado en {resumenHallazgos[0]?.cantidad || 0} hallazgos de no conformidad en "{sugerenciaAccionMejoraPrioritaria.area}").
                    </Text>
                </Box>
            </Flex>
        )}

        {resumenHallazgos.length === 0 ? (
          <Text textAlign="center" color="gray.600">
            No hay hallazgos de auditoría registrados para priorizar mejoras en este momento.
          </Text>
        ) : (
          <Box overflowX="auto" pb={2}>
            <table className="table" style={{ width: '100%', minWidth: '400px' }}> {/* Basic table styling */}
              <thead>
                <tr>
                  <th style={{ color: '#5e4d7d' }}>Área Auditada</th>
                  <th style={{ color: '#5e4d7d' }}>Cantidad de Hallazgos</th>
                  <th style={{ color: '#5e4d7d' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {resumenHallazgos.sort((a, b) => b.cantidad - a.cantidad).map((hallazgo, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: 'start', color: 'gray.700' }}>
                        {hallazgo.area} 
                        {hallazgo.umbralExcedido && <i className="fas fa-exclamation-triangle text-danger ms-2" title="Esta área excede el umbral de alerta."></i>}
                    </td>
                    <td style={{ color: 'gray.700' }}>{hallazgo.cantidad}</td>
                    <td>
                      <Button variant="outline" colorScheme="purple" size="sm" onClick={() => window.location.href=`/hallazgos-detalle/${hallazgo.area.replace(/\s/g, '-')}`}>
                        Ver Detalles
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        )}
        
        {sugerenciaAccionMejoraPrioritaria.activa && (
            <Box textAlign="center" mt={4}>
                <Button 
                    colorScheme="purple" 
                    size="lg" 
                    onClick={onOpen} // Abre el modal del borrador
                >
                    Generar Borrador de Plan
                </Button>
            </Box>
        )}
      </Card>

      {/* Modal para el Borrador de Plan de Acción (Interfaz 6) */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="purple.800">Borrador de Plan de Acción de Mejora para: {sugerenciaAccionMejoraPrioritaria.area}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel color="purple.700">Área Afectada (Pre-llenado)</FormLabel>
              <Input value={sugerenciaAccionMejoraPrioritaria.area} isReadOnly />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel color="purple.700">Acción Propuesta (Pre-llenado)</FormLabel>
              <Input value={sugerenciaAccionMejoraPrioritaria.accion} isReadOnly />
            </FormControl>
            <FormControl mb={3} isRequired>
              <FormLabel color="purple.700">Responsable Asignado</FormLabel>
              <Select placeholder="Seleccione un Colaborador..." value={responsableAsignado} onChange={(e) => setResponsableAsignado(e.target.value)}>
                {colaboradores.map(col => (
                  <option key={col.id} value={col.nombre}>{col.nombre}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb={3} isRequired>
              <FormLabel color="purple.700">Fecha Límite</FormLabel>
              <Input type="date" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} />
            </FormControl>
            <FormControl mb={3} isRequired>
              <FormLabel color="purple.700">Descripción Detallada del Plan</FormLabel>
              <Textarea value={descripcionDetallada} onChange={(e) => setDescripcionDetallada(e.target.value)} placeholder="Describa los pasos específicos para ejecutar esta acción de mejora..." />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" colorScheme="purple" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="purple" onClick={handleGuardarPlanFinal}>
              Guardar Plan Final
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box>
  );
};

export default Dashboard;