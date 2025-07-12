// FormularioRegistroHallazgos.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el ID del plan de auditoría

const FormularioRegistroHallazgos = () => {
  const { planId } = useParams(); // ID del plan de auditoría al que se asocia el hallazgo
  const [descripcionHallazgo, setDescripcionHallazgo] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [planAuditoriaInfo, setPlanAuditoriaInfo] = useState(null); // Info del plan asociado

  useEffect(() => {
    // Simular carga de información del plan de auditoría (para mostrar en el título)
    // En una app real, harías una llamada a tu API con planId
    const fetchedPlanInfo = {
      id: planId,
      fecha: '2025-08-10',
      area: 'Procesos de Captación de Clientes'
    };
    setPlanAuditoriaInfo(fetchedPlanInfo);
  }, [planId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!descripcionHallazgo) {
      setErrorMessage('La descripción del hallazgo es obligatoria.');
      return;
    }

    // Simular guardado
    alert(`Registrando hallazgo para Plan ${planId}: ${descripcionHallazgo}`);
    setSuccessMessage('Hallazgo registrado exitosamente.');
    setTimeout(() => {
      // Redirigir al listado de auditorías o a una vista de detalle del plan
      window.location.href = '/listado-auditorias'; 
    }, 1500);
  };

  if (!planAuditoriaInfo) {
    return (
      <div className="container py-5 text-center">
        <h1 className="text-dark-blue">Cargando información del Plan...</h1>
        <p className="text-muted">Por favor, espere.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-dark-blue">
        Registrar Hallazgos para Auditoría: {planAuditoriaInfo.fecha} - {planAuditoriaInfo.area}
      </h1>
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
            <label htmlFor="descripcionHallazgo" className="form-label text-hero-muted">Descripción del Hallazgo</label>
            <textarea
              className="form-control"
              id="descripcionHallazgo"
              rows="4"
              value={descripcionHallazgo}
              onChange={(e) => setDescripcionHallazgo(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="observaciones" className="form-label text-hero-muted">Observaciones (Opcional)</label>
            <textarea
              className="form-control"
              id="observaciones"
              rows="3"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            ></textarea>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn btn-outline-custom" onClick={() => window.history.back()}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary-custom">
              Guardar Hallazgo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioRegistroHallazgos;