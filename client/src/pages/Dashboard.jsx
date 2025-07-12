// DashboardPrincipal.jsx
import React, { useState } from 'react';
// Asume que style.css está importado a nivel global en tu proyecto

const DashboardPrincipal = () => {
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
  const datosInsuficientesTendencias = false; // Simula si hay o no datos suficientes para proyectar

  // --- Datos de Ejemplo para CU-002 (Gestionar Riesgos y Mejoras Continuas) ---
  const mapaCalorRiesgos = { // Simulación de datos para el mapa de calor de riesgos
    'Baja-Bajo': 2, 'Baja-Medio': 1, 'Baja-Alto': 0,
    'Media-Bajo': 3, 'Media-Medio': 2, 'Media-Alto': 1,
    'Alta-Bajo': 0, 'Alta-Medio': 1, 'Alta-Alto': 1 // Un riesgo crítico
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
    area: resumenHallazgos[0]?.area || 'Área Crítica', // Selecciona la primera área con más hallazgos
    accion: 'Diseñar Plan de Acción Correctiva Detallado para ' + (resumenHallazgos[0]?.area || 'Área Crítica'),
  };
  const [showBorradorModal, setShowBorradorModal] = useState(false); // Estado para controlar el modal del borrador

  // Simulación de acción para el botón Generar Borrador de Plan
  const handleGenerarBorrador = () => {
    // Aquí puedes pasar los datos a un modal o a una nueva página para el borrador
    // Por simplicidad, simulamos con un alert y luego un modal local.
    alert(`Generando borrador de plan para ${sugerenciaAccionMejoraPrioritaria.area}...`);
    setShowBorradorModal(true); // Mostrar el modal
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-dark-blue">Dashboard Principal</h1>

      {/* --- Sección de Alerta Visual por Inactividad (Parte de CU-001) --- */}
      {alertaInactividad.activa && (
        <div className="alert alert-warning d-flex align-items-center justify-content-between p-3 mb-4 rounded shadow-sm" role="alert">
          <div className="d-flex align-items-center">
            <i className="fas fa-exclamation-triangle me-3 fs-4 text-warning"></i>
            <div>
              <h5 className="alert-heading mb-0 text-hero-muted">¡Atención: Autoevaluación Pendiente!</h5>
              <p className="mb-0 text-hero-muted">
                {sugerenciaTareaCritica.mensaje} <strong>{sugerenciaTareaCritica.nombreTarea}</strong>. {alertaInactividad.mensaje}
              </p>
            </div>
          </div>
          <button type="button" className="btn btn-primary-custom" onClick={() => window.location.href='/responder-checklist/seccion7'}>
            Continuar Autoevaluación
          </button>
        </div>
      )}

      {/* --- Sección de Tareas de Compliance Pendientes (Parte de CU-001) --- */}
      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm service-item">
            <div className="card-body text-start">
              <h3 className="card-title text-hero-muted"><i className="fas fa-list-check me-3"></i> Autoevaluación ISO 9001</h3>
              <p className="card-text text-muted">Inicia o continúa tus autoevaluaciones para medir el cumplimiento de tu PYME.</p>
              <button className="btn btn-primary-custom mt-3" onClick={() => window.location.href='/listado-checklists'}>
                Ir a Autoevaluaciones
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 shadow-sm service-item">
            <div className="card-body text-start">
              <h3 className="card-title text-hero-muted"><i className="fas fa-scroll me-3"></i> Políticas de Compliance</h3>
              <p className="card-text text-muted">Visualiza y confirma la lectura de las políticas internas de tu empresa.</p>
              <button className="btn btn-primary-custom mt-3" onClick={() => window.location.href='/listado-politicas'}>
                Ir a Políticas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Sección Proyección de Cumplimiento ISO (Parte de CU-001) --- */}
      <div className="card shadow-sm mb-5 p-4 service-item">
        <h3 className="card-title text-center text-hero-muted"><i className="fas fa-chart-line me-3"></i> Proyección de Cumplimiento ISO 9001</h3>
        {datosInsuficientesTendencias ? (
            <p className="text-center text-muted">
                No hay datos suficientes para proyectar tendencias. Complete más checklists para activar este análisis.
                <button className="btn btn-outline-custom btn-sm ms-3" onClick={() => window.location.href='/listado-checklists'}>
                    Ir a Autoevaluaciones
                </button>
            </p>
        ) : (
            <div className="row align-items-center mt-4">
                <div className="col-md-4 text-center">
                    <div className="display-4 fw-bold text-primary-custom">{porcentajeCumplimiento}%</div>
                    <p className="text-muted">Cumplimiento General Actual</p>
                </div>
                <div className="col-md-8 text-start">
                    <h4 className="h5 text-hero-muted fw-bold">Áreas con Tendencia de Riesgo Potencial:</h4>
                    {areasRiesgoPotencial.length > 0 ? (
                        <ul className="list-unstyled">
                            {areasRiesgoPotencial.map((area, index) => (
                                <li key={index} className="mb-2 text-muted">
                                    <i className="fas fa-arrow-alt-circle-down text-danger me-2"></i>
                                    <strong>{area.nombre}:</strong> {area.tendencia}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted">No se identificaron tendencias de riesgo en el cumplimiento actual.</p>
                    )}
                </div>
            </div>
        )}
      </div>

      {/* --- Sección de Acciones de Gestión de Riesgos y Auditorías (Parte de CU-002) --- */}
      <h2 className="text-center mt-5 mb-4">Gestión Estratégica</h2>
      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm service-item">
            <div className="card-body text-start">
              <h3 className="card-title text-hero-muted"><i className="fas fa-exclamation-triangle me-3"></i> Gestión de Riesgos y Oportunidades</h3>
              <p className="card-text text-muted">Registra y actualiza los riesgos y oportunidades que impactan a tu PYME financiera. Alimenta el análisis proactivo del sistema.</p>
              <button className="btn btn-primary-custom mt-3" onClick={() => window.location.href='/formulario-gestion-riesgos'}>
                Nuevo Riesgo/Oportunidad
              </button>
              <button className="btn btn-outline-custom mt-3 ms-2" onClick={() => window.location.href='/listado-riesgos'}>
                Ver todos los riesgos
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 shadow-sm service-item">
            <div className="card-body text-start">
              <h3 className="card-title text-hero-muted"><i className="fas fa-clipboard-list me-3"></i> Gestión de Auditorías Internas</h3>
              <p className="card-text text-muted">Planifica auditorías y registra hallazgos. Datos esenciales para la priorización automatizada de mejoras.</p>
              <button className="btn btn-primary-custom mt-3" onClick={() => window.location.href='/formulario-alta-auditoria'}>
                Nuevo Plan de Auditoría
              </button>
              <button className="btn btn-outline-custom mt-3 ms-2" onClick={() => window.location.href='/listado-auditorias'}>
                Ver todos los planes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Sección para Análisis y Priorización de Riesgos (Parte de CU-002) --- */}
      <div className="card shadow-sm mb-5 p-4 service-item">
        <h3 className="card-title text-center text-hero-muted"><i className="fas fa-chart-pie me-3"></i> Análisis y Priorización de Riesgos</h3>
        <div className="row mt-4">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h4 className="h5 text-hero-muted fw-bold text-center mb-3">Mapa de Calor de Riesgos</h4>
            {/* Tabla simulada de Mapa de Calor */}
            <div className="d-flex justify-content-center">
              <table className="table table-bordered text-center" style={{ maxWidth: '300px' }}>
                <thead>
                  <tr className="bg-light text-hero-muted">
                    <th>Impacto \ Prob.</th>
                    <th>Baja</th>
                    <th>Media</th>
                    <th>Alta</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="bg-light text-hero-muted">Bajo</td>
                    <td style={{ backgroundColor: '#D4EDDA' }}>{mapaCalorRiesgos['Baja-Bajo']}</td> {/* Green */}
                    <td style={{ backgroundColor: '#D1E7DD' }}>{mapaCalorRiesgos['Media-Bajo']}</td>
                    <td style={{ backgroundColor: '#FFE6CC' }}>{mapaCalorRiesgos['Alta-Bajo']}</td> {/* Light Orange */}
                  </tr>
                  <tr>
                    <td className="bg-light text-hero-muted">Medio</td>
                    <td style={{ backgroundColor: '#D1E7DD' }}>{mapaCalorRiesgos['Baja-Medio']}</td>
                    <td style={{ backgroundColor: '#FFF3CD' }}>{mapaCalorRiesgos['Media-Medio']}</td> {/* Yellow */}
                    <td style={{ backgroundColor: '#FFD799' }}>{mapaCalorRiesgos['Alta-Medio']}</td> {/* Medium Orange */}
                  </tr>
                  <tr>
                    <td className="bg-light text-hero-muted">Alto</td>
                    <td style={{ backgroundColor: '#FFE6CC' }}>{mapaCalorRiesgos['Baja-Alto']}</td>
                    <td style={{ backgroundColor: '#FFD799' }}>{mapaCalorRiesgos['Media-Alto']}</td>
                    <td style={{ backgroundColor: '#F8D7DA' }}>{mapaCalorRiesgos['Alta-Alto']}</td> {/* Red */}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted mt-2"><small>Colores: Verde (Bajo), Amarillo (Medio), Rojo (Alto).</small></p>
          </div>
          <div className="col-lg-6 text-start">
            <h4 className="h5 text-hero-muted fw-bold mb-3">Principales Riesgos a Priorizar:</h4>
            {riesgosCriticos.length > 0 ? (
              <ul className="list-unstyled">
                {riesgosCriticos.map(riesgo => (
                  <li key={riesgo.id} className="mb-3">
                    <i className="fas fa-exclamation-circle text-danger me-2"></i>
                    <strong className="text-hero-muted">{riesgo.nombre}:</strong> <span className="text-muted">{riesgo.accionSugerida}</span>
                    <a href={`/riesgos/${riesgo.id}`} className="btn btn-link btn-sm p-0 ms-2">Ver detalles</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No se identificaron riesgos de alta criticidad que requieran atención inmediata. ¡Bien hecho!</p>
            )}
          </div>
        </div>
      </div>

      {/* --- Sección para Priorización de Mejoras por Área Auditada (Parte de CU-002) --- */}
      <div className="card shadow-sm p-4 service-item">
        <h3 className="card-title text-center text-hero-muted mb-4"><i className="fas fa-bullseye me-3"></i> Priorización de Mejoras por Área Auditada</h3>
        
        {sugerenciaAccionMejoraPrioritaria.activa && (
            <div className="alert alert-info d-flex align-items-center justify-content-center p-3 mb-4 rounded shadow-sm text-center" role="alert" style={{backgroundColor: '#e0d8f0', borderColor: '#a78cd4'}}>
                <i className="fas fa-lightbulb me-3 fs-4 text-primary-custom"></i>
                <div>
                    <h5 className="alert-heading mb-1 text-primary-custom">ACCIÓN PRIORITARIA RECOMENDADA:</h5>
                    <p className="mb-0 text-hero-muted">
                        <strong>{sugerenciaAccionMejoraPrioritaria.accion}</strong> (Basado en {resumenHallazgos[0]?.cantidad || 0} hallazgos de no conformidad en "{sugerenciaAccionMejoraPrioritaria.area}").
                    </p>
                </div>
            </div>
        )}

        {resumenHallazgos.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            No hay hallazgos de auditoría registrados para priorizar mejoras en este momento.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col" className="text-hero-muted">Área Auditada</th>
                  <th scope="col" className="text-hero-muted">Cantidad de Hallazgos</th>
                  <th scope="col" className="text-hero-muted">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {resumenHallazgos.sort((a, b) => b.cantidad - a.cantidad).map((hallazgo, index) => (
                  <tr key={index}>
                    <td className="text-start">
                        {hallazgo.area} 
                        {hallazgo.umbralExcedido && <i className="fas fa-exclamation-triangle text-danger ms-2" title="Esta área excede el umbral de alerta."></i>}
                    </td>
                    <td>{hallazgo.cantidad}</td>
                    <td>
                      <button className="btn btn-outline-custom btn-sm" onClick={() => window.location.href=`/hallazgos-detalle/${hallazgo.area.replace(/\s/g, '-')}`}>
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {sugerenciaAccionMejoraPrioritaria.activa && (
            <div className="text-center mt-4">
                <button 
                    className="btn btn-primary-custom btn-lg" 
                    onClick={handleGenerarBorrador}
                >
                    Generar Borrador de Plan
                </button>
            </div>
        )}
      </div>

      {/* Modal para el Borrador de Plan de Acción (simulado, necesitaría lógica de Bootstrap Modal) */}
      {showBorradorModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Borrador de Plan de Acción de Mejora</h5>
                <button type="button" className="btn-close" onClick={() => setShowBorradorModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/* Contenido del FormularioBorradorPlanAccion */}
                <h4 className="mb-3 text-dark-blue">Para: {sugerenciaAccionMejoraPrioritaria.area}</h4>
                <p className="text-muted"><strong>Acción Propuesta:</strong> {sugerenciaAccionMejoraPrioritaria.accion}</p>
                
                <form>
                  <div className="mb-3">
                    <label htmlFor="responsableModal" className="form-label">Responsable Asignado</label>
                    <input type="text" className="form-control" id="responsableModal" placeholder="Ej: Juan Pérez" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fechaLimiteModal" className="form-label">Fecha Límite</label>
                    <input type="date" className="form-control" id="fechaLimiteModal" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="descripcionDetalladaModal" className="form-label">Descripción Detallada del Plan</label>
                    <textarea className="form-control" id="descripcionDetalladaModal" rows="3" placeholder="Detalle los pasos..."></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-custom" onClick={() => setShowBorradorModal(false)}>Cancelar</button>
                <button type="button" className="btn btn-primary-custom" onClick={() => { alert('Plan de acción guardado (simulado)!'); setShowBorradorModal(false); }}>Guardar Plan Final</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPrincipal;