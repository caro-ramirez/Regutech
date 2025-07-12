// VisualizarPolitica.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Si usas react-router para obtener el ID de la política

const VisualizarPolitica = () => {
  const { politicaId } = useParams(); // Obtener ID de la política de la URL
  const [politica, setPolitica] = useState(null);
  const [confirmado, setConfirmado] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showScrollAlert, setShowScrollAlert] = useState(false);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);

  useEffect(() => {
    // Simular carga de política
    // En una app real, aquí harías una llamada a tu API
    const fetchedPolitica = {
      id: 2, 
      nombre: 'Política de Prevención de Lavado de Activos (PLA/FT)', 
      contenido: `
        <h3>Introducción a la Política de PLA/FT</h3>
        <p>Esta política establece las directrices y procedimientos para prevenir, detectar y reportar actividades relacionadas con el Lavado de Activos (LA) y el Financiamiento del Terrorismo (FT) dentro de [Nombre de la PYME Financiera]. Es de cumplimiento obligatorio para todos los empleados, directores y socios.</p>
        
        <h4>Principios Generales</h4>
        <ul>
          <li><strong>Conocimiento del Cliente (KYC):</strong> Debemos aplicar medidas de debida diligencia sobre nuestros clientes, verificando su identidad y comprendiendo la naturaleza de sus actividades.</li>
          <li><strong>Monitoreo de Transacciones:</strong> Se implementarán sistemas de monitoreo para identificar transacciones inusuales o sospechosas.</li>
          <li><strong>Reporte de Operaciones Sospechosas (ROS):</strong> Cualquier operación sospechosa debe ser reportada a la Unidad de Información Financiera (UIF) de acuerdo con la normativa vigente.</li>
          <li><strong>Capacitación Continua:</strong> Todos los empleados recibirán capacitación periódica sobre PLA/FT.</li>
        </ul>
        
        <h4>Responsabilidades</h4>
        <p>Cada empleado es responsable de comprender y aplicar esta política. El Oficial de Cumplimiento es la figura designada para la supervisión de esta política.</p>
        
        <h4>Actualizaciones</h4>
        <p>Esta política será revisada anualmente o ante cualquier cambio regulatorio significativo.</p>
        <p style="margin-top: 50px;">Fecha de Última Actualización: 2025-01-15</p>
        <p>Versión: 1.1</p>
      `,
      estadoLectura: 'Pendiente' // Simula el estado actual del usuario
    };
    setPolitica(fetchedPolitica);
    setConfirmado(fetchedPolitica.estadoLectura === 'Leída');
  }, [politicaId]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 1) { // +1 para manejar pequeñas variaciones de redondeo
      setHasScrolledToEnd(true);
      setShowScrollAlert(false);
    } else {
      setShowScrollAlert(true); // Opcional: mostrar un aviso si no ha llegado al final
    }
  };

  const handleConfirmarLectura = () => {
    if (!politica) return;

    if (!hasScrolledToEnd && !confirmado) {
      setErrorMessage('Por favor, lea la política completa antes de confirmar su lectura.');
      return;
    }

    // Simular la confirmación de lectura
    setConfirmado(true);
    setErrorMessage('');
    alert('¡Lectura de política confirmada! Redirigiendo...');
    // En una app real, aquí harías una llamada a tu API para registrar la confirmación
    window.location.href = '/politicas'; // Volver al listado actualizado
  };

  if (!politica) {
    return (
      <div className="container py-5 text-center">
        <h1 className="text-dark-blue">Cargando Política...</h1>
        <p className="text-muted">Por favor, espere.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-dark-blue">Política: {politica.nombre}</h1>
      <div className="card shadow-sm p-4">
        {errorMessage && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {errorMessage}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}
        {confirmado && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            ¡Ya has confirmado la lectura de esta política!
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}

        <div 
          className="policy-content p-3 border rounded mb-4" 
          style={{ maxHeight: '400px', overflowY: 'auto', backgroundColor: '#f5f5f5' }}
          onScroll={handleScroll}
          dangerouslySetInnerHTML={{ __html: politica.contenido }} // Renderiza HTML desde el contenido
        >
        </div>
        
        {showScrollAlert && !hasScrolledToEnd && (
             <div className="alert alert-info text-center mt-3" role="alert">
                Desplázate hasta el final para poder confirmar la lectura.
             </div>
        )}

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-outline-custom" onClick={() => window.history.back()}>
            Volver al Listado de Políticas
          </button>
          <button 
            className="btn btn-primary-custom" 
            onClick={handleConfirmarLectura} 
            disabled={confirmado || !hasScrolledToEnd} // Deshabilitado si ya confirmó o no hizo scroll
          >
            Confirmar Lectura
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualizarPolitica;