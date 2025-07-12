// client/src/App.jsx
import React from 'react';
import AppRouter from './routes/AppRouter';
import Footer from './components/layout/Footer'; // Importa el Footer
import { Box, Flex } from '@chakra-ui/react'; // Importa componentes de Chakra UI para layout

function App() {
  return (
    <Flex direction="column" minH="100vh"> {/* Flexbox para asegurar que el footer esté abajo */}
      {/* Aquí podrías poner un Navbar o Header global si lo creas más adelante */}
      <Box flex="1"> {/* Esto hace que el contenido ocupe el espacio restante */}
        <AppRouter />
      </Box>
      <Footer /> {/* Incluye el Footer al final */}
    </Flex>
  );
}

export default App;