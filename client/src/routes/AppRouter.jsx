// client/src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa tus páginas existentes desde client/src/pages/
import LandingPage from '../pages/LandingPage.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Dashboard from '../pages/Dashboard.jsx'; // <--- Este es el Dashboard unificado
import Profile from '../pages/Profile.jsx';
// Las siguientes pueden ser páginas o componentes que se usan dentro de las páginas:
import DocumentList from '../pages/DocumentList.jsx'; // Para ListadoChecklists y ListadoPoliticas
import DocumentEditor from '../pages/DocumentEditor.jsx'; // Para PersonalizarPlantilla
import RiskManagement from '../pages/RiskManagement.jsx'; // Para FormularioGestionRiesgos
import AuditManagement from '../pages/AuditManagement.jsx'; // Para ListadoAuditorias, FormularioAltaAuditoria, FormularioRegistroHallazgos
// Si tienes componentes que son específicos de rutas, asegúrate de que sus archivos existan:
import ResponderChecklist from '../components/ResponderChecklist.jsx'; // Si es una ruta directa
import VisualizarPolitica from '../components/VisualizarPolitica.jsx'; // Si es una ruta directa
import FormularioBorradorPlanAccion from '../components/FormularioBorradorPlanAccion.jsx'; // Si es una ruta directa

import NotFound from '../pages/NotFound.jsx'; // Página 404

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas (Landing, Login, Registro) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas Protegidas (asume que tu AuthProvider las manejará) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} /> {/* La página Profile contendría la lógica para Modificar Perfil */}

        {/* Rutas para Módulo de Calidad (ISO 9001) y Compliance */}
        {/* Usando DocumentList como contenedor para listados de documentos/checklists/políticas */}
        <Route path="/documents" element={<DocumentList />} />
        <Route path="/documents/edit/:id" element={<DocumentEditor />} /> {/* Para PersonalizarPlantilla */}
        
        {/* Rutas más específicas que quizás no están en pages/ aún, pero son parte del flujo */}
        <Route path="/listado-checklists" element={<DocumentList />} /> {/* Podrías usar DocumentList para mostrar checklists */}
        <Route path="/responder-checklist/:checklistId" element={<ResponderChecklist />} /> {/* Componente de CU-001 */}
        <Route path="/listado-politicas" element={<DocumentList />} /> {/* Podrías usar DocumentList para mostrar políticas */}
        <Route path="/ver-politica/:politicaId" element={<VisualizarPolitica />} /> {/* Componente de CU-001 */}

        {/* Rutas para Gestión de Riesgos y Auditorías */}
        <Route path="/risk-management" element={<RiskManagement />} /> {/* Esta página contendrá el FormularioGestionRiesgos */}
        <Route path="/audit-management" element={<AuditManagement />} /> {/* Esta página contendrá ListadoAuditorias y AltaAuditoria */}
        
        {/* Rutas para Borrador de Plan de Acción (podría ser un modal o una página propia) */}
        <Route path="/formulario-borrador-plan-accion" element={<FormularioBorradorPlanAccion />} /> {/* Componente de CU-002 */}

        {/* Ruta para 404 No Encontrado */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;