import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './style.css'; // Asegúrate de que este archivo existe, si no, coméntalo o crea uno vacío
import { AuthProvider } from './context/AuthContext.js'; // Asegúrate de que esta ruta es correcta
import { ChakraProvider } from '@chakra-ui/react';
// import theme from './theme'; // Comenta esta línea si no has creado theme.js aún

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider /* theme={theme} -- Comenta esto si no tienes theme.js */>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
);