import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import muiTheme from './muiTheme';
import Login from './pages/Login';

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <Login />
    </ThemeProvider>
  );
}

export default App;
