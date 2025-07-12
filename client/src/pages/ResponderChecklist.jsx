// ResponderChecklist.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Si usas react-router para obtener el ID del checklist

const ResponderChecklist = () => {
  const { checklistId } = useParams(); // Obtener ID del checklist de la URL
  const [preguntas, setPreguntas] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [confirmMessage, setConfirmMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Simular carga de preguntas del checklist
    // En una app real, aquí harías una llamada a tu API
    const fetchedPreguntas = [
      { id: 1, texto: '¿Se han identificado las partes interesadas relevantes para el SGC?', obligatorio: true },
      { id: 2, texto: '¿Se ha definido el alcance del Sistema de Gestión de Calidad (SGC)?', obligatorio: true },
      { id: 3, texto: '¿Se ha establecido una política de calidad documentada?', obligatorio: false },
      { id: 4, texto: '¿Los objetivos de calidad son coherentes con la política de calidad?', obligatorio: true },
      { id: 5, texto: '¿Se realizan revisiones por la dirección a intervalos planificados?', obligatorio: true },
    ];
    setPreguntas(fetchedPreguntas);

    // Cargar respuestas guardadas previamente si existen (simulado)
    const savedResponses = {
      1: { opcion: 'Cumple', observaciones: 'Documento de partes interesadas actualizado.' },
      2: { opcion: 'Cumple', observaciones: '' },
    };
    setRespuestas(savedResponses);
  }, [checklistId]);

  const currentQuestion = preguntas[currentQuestionIndex];

  const handleOptionChange = (e) => {
    setRespuestas({
      ...respuestas,
      [currentQuestion.id]: {
        ...respuestas[currentQuestion.id],
        opcion: e.target.value,
      },
    });
    setErrorMessage('');
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
      setErrorMessage('Por favor, seleccione una opción para esta pregunta obligatoria.');
      return;
    }
    setErrorMessage('');
    // Simular guardar respuesta (en una app real, aquí harías una llamada a tu API)
    setConfirmMessage('Respuesta guardada temporalmente.');
    setTimeout(() => setConfirmMessage(''), 1500);

    if (currentQuestionIndex < preguntas.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Si es la última pregunta, preparar para finalizar
      alert('Has llegado al final del checklist. Haz clic en "Finalizar Autoevaluación".');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setErrorMessage('');
    }
  };

  const handleSaveAndExit = () => {
    // Lógica para guardar el progreso y salir
    alert('Progreso guardado y saliendo del checklist.');
    window.location.href = '/checklists'; // Volver al listado
  };

  const handleFinishAutoevaluacion = () => {
    // Validar todas las preguntas obligatorias antes de finalizar
    const allObligatoryAnswered = preguntas.every(q => 
      !q.obligatorio || (q.obligatorio && respuestas[q.id]?.opcion)
    );

    if (!allObligatoryAnswered) {
      setErrorMessage('Por favor, responda todas las preguntas obligatorias antes de finalizar.');
      return;
    }
    
    alert('Autoevaluación completada exitosamente. Actualizando Dashboard.');
    window.location.href = '/dashboard'; // Volver al dashboard actualizado
  };

  if (!currentQuestion) {
    return (
      <div className="container py-5 text-center">
        <h1 className="text-dark-blue">Cargando Checklist...</h1>
        <p className="text-muted">Por favor, espere.</p>
      </div>
    );
  }

  const progresoActual = Math.round(((currentQuestionIndex + (respuestas[currentQuestion.id]?.opcion ? 1 : 0)) / preguntas.length) * 100);

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-dark-blue">Autoevaluación: Checklist de Calidad</h1> {/* Nombre del checklist real */}
      <div className="card shadow-sm p-4">
        {confirmMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {confirmMessage}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {errorMessage}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}

        <div className="progress mb-4" style={{ height: '25px' }}>
          <div 
            className="progress-bar bg-primary-custom" 
            role="progressbar" 
            style={{ width: `${progresoActual}%` }} 
            aria-valuenow={progresoActual} 
            aria-valuemin="0" 
            aria-valuemax="100"
          >
            Pregunta {currentQuestionIndex + 1} de {preguntas.length} ({progresoActual}%)
          </div>
        </div>

        <div className="mb-4 text-start">
          <h4 className="text-hero-muted">
            {currentQuestion.texto}
            {currentQuestion.obligatorio && <span className="text-danger ms-2">*</span>}
          </h4>
        </div>

        <div className="mb-3 text-start">
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="radio" 
              name={`pregunta_${currentQuestion.id}`} 
              id={`cumple_${currentQuestion.id}`} 
              value="Cumple" 
              checked={respuestas[currentQuestion.id]?.opcion === 'Cumple'} 
              onChange={handleOptionChange} 
            />
            <label className="form-check-label" htmlFor={`cumple_${currentQuestion.id}`}>
              Cumple
            </label>
          </div>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="radio" 
              name={`pregunta_${currentQuestion.id}`} 
              id={`noCumple_${currentQuestion.id}`} 
              value="No Cumple" 
              checked={respuestas[currentQuestion.id]?.opcion === 'No Cumple'} 
              onChange={handleOptionChange} 
            />
            <label className="form-check-label" htmlFor={`noCumple_${currentQuestion.id}`}>
              No Cumple
            </label>
          </div>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="radio" 
              name={`pregunta_${currentQuestion.id}`} 
              id={`noAplica_${currentQuestion.id}`} 
              value="No Aplica" 
              checked={respuestas[currentQuestion.id]?.opcion === 'No Aplica'} 
              onChange={handleOptionChange} 
            />
            <label className="form-check-label" htmlFor={`noAplica_${currentQuestion.id}`}>
              No Aplica
            </label>
          </div>
        </div>

        <div className="mb-3 text-start">
          <label htmlFor={`observaciones_${currentQuestion.id}`} className="form-label text-hero-muted">Observaciones (Opcional)</label>
          <textarea 
            className="form-control" 
            id={`observaciones_${currentQuestion.id}`} 
            rows="3" 
            value={respuestas[currentQuestion.id]?.observaciones || ''} 
            onChange={handleObservationsChange}
          ></textarea>
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-outline-custom" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            Anterior
          </button>
          {currentQuestionIndex < preguntas.length - 1 ? (
            <button className="btn btn-primary-custom" onClick={handleNext}>
              Siguiente Pregunta
            </button>
          ) : (
            <button className="btn btn-primary-custom" onClick={handleFinishAutoevaluacion}>
              Finalizar Autoevaluación
            </button>
          )}
        </div>
        <button className="btn btn-secondary mt-3" onClick={handleSaveAndExit}>
            Guardar y Salir
        </button>
      </div>
    </div>
  );
};

export default ResponderChecklist;