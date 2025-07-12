// FormularioBorradorPlanAccion.jsx
import React, { useState, useEffect } from 'react';

const FormularioBorradorPlanAccion = ({ areaPrioritaria, accionPropuesta }) => {
  const [responsableAsignado, setResponsableAsignado] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [descripcionDetallada, setDescripcionDetallada] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Datos simulados de colaboradores
  const colaboradores = [
    { id: 'col1', nombre: 'Juan Pérez' },
    { id: 'col2', nombre: 'María Gómez' },
    { id: 'col3', nombre: 'Laura Díaz' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!responsableAsignado || !fechaLimite || !descripcionDetallada) {
      setErrorMessage('Por favor, complete todos los campos obligatorios del plan de acción.');
      return;
    }

    // Simular guardado del plan de acción
    alert(`Plan de Acción Finalizado para ${areaPrioritaria}: ${accionPropuesta}`);
    setSuccessMessage('Plan de Acción guardado exitosamente.');
    setTimeout(() => {
      // Redirigir al dashboard o sección de reportes tras el éxito
      window.location.href = '/dashboard'; 
    }, 1500);
  };

  // Estos valores vendrían del CU-002 principal que "genera" el borrador
  const defaultArea = areaPrioritaria || 'Área no especificada';
  const defaultAccion = accionPropuesta || 'Acción sugerida no definida';

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-dark-blue">Borrador de Plan de Acción de Mejora para: {defaultArea}</h1>
      <div className="card shadow-sm p-4">
        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMessage}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {errorMessage}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label text-hero-muted">Área Afectada (Pre-llenado)</label>
            <input type="text" className="form-control" value={defaultArea} readOnly />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label text-hero-muted">Acción Propuesta (Pre-llenado)</label>
            <input type="text" className="form-control" value={defaultAccion} readOnly />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="responsableAsignado" className="form-label text-hero-muted">Responsable Asignado</label>
            <select 
              className="form-select" 
              id="responsableAsignado" 
              value={responsableAsignado} 
              onChange={(e) => setResponsableAsignado(e.target.value)} 
              required
            >
              <option value="">Seleccione un Colaborador...</option>
              {colaboradores.map(col => (
                <option key={col.id} value={col.nombre}>{col.nombre}</option>
              ))}
            </select>
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="fechaLimite" className="form-label text-hero-muted">Fecha Límite</label>
            <input 
              type="date" 
              className="form-control" 
              id="fechaLimite" 
              value={fechaLimite} 
              onChange={(e) => setFechaLimite(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="descripcionDetallada" className="form-label text-hero-muted">Descripción Detallada del Plan</label>
            <textarea
              className="form-control"
              id="descripcionDetallada"
              rows="5"
              value={descripcionDetallada}
              onChange={(e) => setDescripcionDetallada(e.target.value)}
              placeholder="Describa los pasos específicos para ejecutar esta acción de mejora..."
              required
            ></textarea>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn btn-outline-custom" onClick={() => window.history.back()}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary-custom">
              Guardar Plan Final
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioBorradorPlanAccion;