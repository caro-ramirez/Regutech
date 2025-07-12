// FormularioGestionRiesgos.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Si usas react-router para edición

const FormularioGestionRiesgos = () => {
  const { riesgoId } = useParams(); // Para modo edición
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('Riesgo');
  const [probabilidad, setProbabilidad] = useState('');
  const [impacto, setImpacto] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (riesgoId) {
      // Simular carga de datos para edición
      // En una app real, harías una llamada a tu API
      const riesgoAEditar = {
        id: 1,
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
    setErrorMessage('');
    setSuccessMessage('');

    if (!descripcion || !probabilidad || !impacto) {
      setErrorMessage('Por favor, complete todos los campos obligatorios.');
      return;
    }

    // Simular guardado/actualización
    alert(`Gestionando riesgo: ${descripcion}, Tipo: ${tipo}, Probabilidad: ${probabilidad}, Impacto: ${impacto}`);
    setSuccessMessage(riesgoId ? 'Riesgo/Oportunidad actualizado exitosamente.' : 'Riesgo/Oportunidad registrado exitosamente.');
    setTimeout(() => {
      // Redirigir al dashboard o listado de riesgos tras el éxito
      window.location.href = '/dashboard'; 
    }, 1500);
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-dark-blue">{riesgoId ? 'Editar Riesgo / Oportunidad' : 'Registrar Nuevo Riesgo / Oportunidad'}</h1>
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
            <label htmlFor="descripcion" className="form-label text-hero-muted">Descripción</label>
            <textarea
              className="form-control"
              id="descripcion"
              rows="3"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-3 text-start">
            <label className="form-label text-hero-muted">Tipo</label>
            <div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="tipo" id="tipoRiesgo" value="Riesgo" checked={tipo === 'Riesgo'} onChange={(e) => setTipo(e.target.value)} disabled={!!riesgoId}/>
                <label className="form-check-label" htmlFor="tipoRiesgo">Riesgo</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="tipo" id="tipoOportunidad" value="Oportunidad" checked={tipo === 'Oportunidad'} onChange={(e) => setTipo(e.target.value)} disabled={!!riesgoId}/>
                <label className="form-check-label" htmlFor="tipoOportunidad">Oportunidad</label>
              </div>
            </div>
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="probabilidad" className="form-label text-hero-muted">Probabilidad</label>
            <select className="form-select" id="probabilidad" value={probabilidad} onChange={(e) => setProbabilidad(e.target.value)} required>
              <option value="">Seleccione...</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="impacto" className="form-label text-hero-muted">Impacto</label>
            <select className="form-select" id="impacto" value={impacto} onChange={(e) => setImpacto(e.target.value)} required>
              <option value="">Seleccione...</option>
              <option value="Bajo">Bajo</option>
              <option value="Medio">Medio</option>
              <option value="Alto">Alto</option>
            </select>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn btn-outline-custom" onClick={() => window.history.back()}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary-custom">
              {riesgoId ? 'Guardar Cambios' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioGestionRiesgos;