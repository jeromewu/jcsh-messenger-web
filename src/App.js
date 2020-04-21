import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import muiTheme from './utils/muiTheme';
import Login from './pages/Login';
import Main from './pages/Main';

function App({ login }) {
  return (
    <ThemeProvider theme={muiTheme}>
      <Router>
        <Switch>
          <Route exact path="/">
            {login ? <Redirect to="/main" /> : <Login />}
          </Route>
          <Route exact path="/main">
            {!login ? <Redirect to="/" /> : <Main />}
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
