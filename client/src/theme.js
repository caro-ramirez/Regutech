// client/src/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  // Puedes personalizar colores, fuentes, componentes, etc. aquí
  // Por ahora, lo dejamos básico
  styles: {
    global: {
      body: {
        bg: 'gray.50', // Un color de fondo suave para toda la app
        color: 'gray.800',
      },
    },
  },
});

export default theme;