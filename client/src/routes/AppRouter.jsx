// client/src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importa todas tus páginas
import LandingPage from '../pages/LandingPage.jsx'; // <--- Nueva importación
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Profile from '../pages/Profile.jsx';
import DocumentList from '../pages/DocumentList.jsx';
import DocumentEditor from '../pages/DocumentEditor.jsx';
import RiskManagement from '../pages/RiskManagement.jsx';
import AuditManagement from '../pages/AuditManagement.jsx';
import NotFound from '../pages/NotFound.jsx';

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LandingPage />} /> {/* <--- Landing Page como ruta raíz */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas (temporalmente accesibles directamente para desarrollo) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/documents" element={<DocumentList />} />
        <Route path="/documents/edit/:id" element={<DocumentEditor />} />
        <Route path="/risk-management" element={<RiskManagement />} />
        <Route path="/audit-management" element={<AuditManagement />} />

        {/* Ruta para 404 No Encontrado */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;