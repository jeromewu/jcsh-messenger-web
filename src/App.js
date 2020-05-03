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
import SignOut from './pages/SignOut';

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
          <Route exact path="/sign-out">
            <SignOut />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
