// ListadoAuditorias.jsx
import React from 'react';

const ListadoAuditorias = () => {
  const planesAuditoria = [
    { id: 1, fecha: '2025-08-10', area: 'Procesos de Captación de Clientes', responsable: 'Laura Pérez' },
    { id: 2, fecha: '2025-09-20', area: 'Monitoreo Transaccional PLD', responsable: 'Juan Gómez' },
    { id: 3, fecha: '2025-07-01', area: 'Políticas de Ciberseguridad', responsable: 'Sofía Díaz' },
  ];

  const handleRegistrarHallazgos = (id) => {
    alert(`Redirigiendo para registrar hallazgos para el Plan de Auditoría ${id}`);
    window.location.href = `/registrar-hallazgos/${id}`;
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-dark-blue">Gestión de Auditorías Internas</h1>
      
      <div className="text-end mb-3">
        <button className="btn btn-primary-custom" onClick={() => window.location.href='/nuevo-plan-auditoria'}>
          Nuevo Plan de Auditoría
        </button>
      </div>

      {planesAuditoria.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No hay planes de auditoría interna registrados en este momento.
        </div>
      ) : (
        <div className="card shadow-sm p-4">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col" className="text-hero-muted">Fecha</th>
                <th scope="col" className="text-hero-muted">Área a Auditar</th>
                <th scope="col" className="text-hero-muted">Responsable</th>
                <th scope="col" className="text-hero-muted">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {planesAuditoria.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.fecha}</td>
                  <td>{plan.area}</td>
                  <td>{plan.responsable}</td>
                  <td>
                    <button 
                      className="btn btn-primary-custom btn-sm" 
                      onClick={() => handleRegistrarHallazgos(plan.id)}
                    >
                      Registrar Hallazgos
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

export default ListadoAuditorias;