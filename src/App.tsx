import { ThemeProvider } from 'styled-components';
import { AppProvider } from './hooks';
import { AppRoutes } from './routes';
import { theme } from './styles/theme';

function App () {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ThemeProvider>
  )
}

export default App;