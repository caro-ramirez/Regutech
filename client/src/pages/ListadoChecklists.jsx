// ListadoChecklists.jsx
import React from 'react';

const ListadoChecklists = () => {
  const checklists = [
    { id: 1, nombre: 'Checklist Sección 4: Contexto de la Organización', estado: 'En Progreso', progreso: 60 },
    { id: 2, nombre: 'Checklist Sección 5: Liderazgo', estado: 'Pendiente', progreso: 0 },
    { id: 3, nombre: 'Checklist Sección 6: Planificación', estado: 'Completado', progreso: 100 },
  ];

  const handleResponderClick = (id) => {
    alert(`Redirigiendo para responder Checklist ${id}`);
    // Aquí iría la lógica de redirección a la pantalla de responder checklist
    window.location.href = `/responder-checklist/${id}`; 
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-dark-blue">Listado de Checklists de Autoevaluación ISO 9001</h1>
      
      {checklists.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No hay checklists de autoevaluación ISO 9001 disponibles en este momento.
        </div>
      ) : (
        <div className="card shadow-sm p-4">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col" className="text-hero-muted">Nombre del Checklist</th>
                <th scope="col" className="text-hero-muted">Estado de Completitud</th>
                <th scope="col" className="text-hero-muted">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {checklists.map(checklist => (
                <tr key={checklist.id}>
                  <td>{checklist.nombre}</td>
                  <td>
                    {checklist.estado === 'Completado' ? (
                      <span className="badge bg-success">{checklist.estado}</span>
                    ) : (
                      <>
                        <div className="progress" style={{ height: '20px' }}>
                          <div 
                            className="progress-bar bg-primary-custom" 
                            role="progressbar" 
                            style={{ width: `${checklist.progreso}%` }} 
                            aria-valuenow={checklist.progreso} 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                          >
                            {checklist.progreso}%
                          </div>
                        </div>
                        <small className="text-muted">{checklist.estado}</small>
                      </>
                    )}
                  </td>
                  <td>
                    <button 
                      className="btn btn-primary-custom btn-sm" 
                      onClick={() => handleResponderClick(checklist.id)}
                      disabled={checklist.estado === 'Completado'}
                    >
                      {checklist.estado === 'Completado' ? 'Ver Respuestas' : 'Responder'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="text-center mt-4">
        <button className="btn btn-outline-custom" onClick={() => window.history.back()}>
          Volver al Dashboard
        </button>
      </div>
    </div>
  );
};

export default ListadoChecklists;