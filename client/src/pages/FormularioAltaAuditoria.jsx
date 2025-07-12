// FormularioAltaAuditoria.jsx
import React, { useState } from 'react';

const FormularioAltaAuditoria = () => {
  const [fecha, setFecha] = useState('');
  const [area, setArea] = useState('');
  const [responsable, setResponsable] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!fecha || !area || !responsable) {
      setErrorMessage('Por favor, complete todos los campos obligatorios.');
      return;
    }

    // Validar que la fecha sea futura (ejemplo simple)
    const today = new Date();
    const selectedDate = new Date(fecha);
    if (selectedDate <= today) {
      setErrorMessage('La fecha de la auditoría debe ser futura.');
      return;
    }

    // Simular guardado
    alert(`Registrando Plan de Auditoría: ${fecha}, Área: ${area}, Responsable: ${responsable}`);
    setSuccessMessage('Plan de auditoría registrado exitosamente.');
    setTimeout(() => {
      // Redirigir al listado de auditorías tras el éxito
      window.location.href = '/listado-auditorias'; 
    }, 1500);
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-dark-blue">Registrar Nuevo Plan de Auditoría Interna</h1>
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
            <label htmlFor="fecha" className="form-label text-hero-muted">Fecha</label>
            <input 
              type="date" 
              className="form-control" 
              id="fecha" 
              value={fecha} 
              onChange={(e) => setFecha(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="area" className="form-label text-hero-muted">Área a Auditar</label>
            <input 
              type="text" 
              className="form-control" 
              id="area" 
              value={area} 
              onChange={(e) => setArea(e.target.value)} 
              placeholder="Ej: Procesos de PLD"
              required 
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="responsable" className="form-label text-hero-muted">Responsable</label>
            <input 
              type="text" 
              className="form-control" 
              id="responsable" 
              value={responsable} 
              onChange={(e) => setResponsable(e.target.value)} 
              placeholder="Ej: Laura Pérez - Auditor Interno"
              required 
            />
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn btn-outline-custom" onClick={() => window.history.back()}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary-custom">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioAltaAuditoria;