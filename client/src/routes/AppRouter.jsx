// client/src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard.jsx';
import FormularioAltaAuditoria from '../pages/FormularioAltaAuditoria.jsx';
import FormularioBorradorPlanAccion from '../pages/FormularioBorradorPlanAccion.jsx';
import FormularioGestionRiesgos from '../pages/FormularioGestionRiesgos.jsx';
import FormularioRegistroHallazgos from '../pages/FormularioRegistroHallazgos.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import ListadoAuditorias from '../pages/ListadoAuditorias.jsx';
import ListadoChecklists from '../pages/ListadoChecklists.jsx';
import ListadoPoliticas from '../pages/ListadoPoliticas.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import NotFound from '../pages/NotFound.jsx';
import Profile from '../pages/Profile.jsx';
import Register from '../pages/Register.jsx';
import ResponderChecklist from '../pages/ResponderChecklist.jsx'; 
import VisualizarPolitica from '../pages/VisualizarPolitica.jsx'; 

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} /> 
      
        <Route path="/listado-checklists" element={<DocumentList />} /> 
        <Route path="/responder-checklist/:checklistId" element={<ResponderChecklist />} /> 
        <Route path="/listado-politicas" element={<DocumentList />} /> 
        <Route path="/ver-politica/:politicaId" element={<VisualizarPolitica />} /> 
        <Route path="/listado-auditorias" element={<ListadoAuditorias />} /> 

        <Route path="/formulario-alta-auditoria" element={<FormularioAltaAuditoria/>}/>
        <Route path="/formulario-gestion-riesgos" element={<FormularioGestionRiesgos/>}/>
        <Route path="/formulario-borrador-plan-accion" element={<FormularioBorradorPlanAccion/>} /> 
        <Route path="/formulario-registro-hallazgo" element={<FormularioRegistroHallazgos/>} /> 

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;