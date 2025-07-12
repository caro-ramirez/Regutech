// ListadoPoliticas.jsx
import React from 'react';

const ListadoPoliticas = () => {
  const politicas = [
    { id: 1, nombre: 'Política de Conducta y Ética', estadoLectura: 'Leída' },
    { id: 2, nombre: 'Política de Prevención de Lavado de Activos (PLA/FT)', estadoLectura: 'Pendiente' },
    { id: 3, nombre: 'Política de Protección de Datos Personales', estadoLectura: 'Pendiente' },
    { id: 4, nombre: 'Política de Ciberseguridad Financiera', estadoLectura: 'Leída' },
  ];

  const handleVerPoliticaClick = (id) => {
    alert(`Redirigiendo para ver Política ${id}`);
    // Aquí iría la lógica de redirección a la pantalla de visualización de política
    window.location.href = `/ver-politica/${id}`;
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-dark-blue">Listado de Políticas de Compliance</h1>
      
      {politicas.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No hay políticas de compliance disponibles en este momento.
        </div>
      ) : (
        <div className="card shadow-sm p-4">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col" className="text-hero-muted">Nombre de la Política</th>
                <th scope="col" className="text-hero-muted">Estado de Lectura</th>
                <th scope="col" className="text-hero-muted">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {politicas.map(politica => (
                <tr key={politica.id}>
                  <td>{politica.nombre}</td>
                  <td>
                    {politica.estadoLectura === 'Leída' ? (
                      <span className="badge bg-success"><i className="fas fa-check-circle me-1"></i> {politica.estadoLectura}</span>
                    ) : (
                      <span className="badge bg-warning text-dark"><i className="fas fa-hourglass-half me-1"></i> {politica.estadoLectura}</span>
                    )}
                  </td>
                  <td>
                    <button 
                      className="btn btn-primary-custom btn-sm" 
                      onClick={() => handleVerPoliticaClick(politica.id)}
                    >
                      Ver Política
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

export default ListadoPoliticas;