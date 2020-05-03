import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Loading from './pages/Loading';
import * as serviceWorker from './serviceWorker';
import { onAuthStateChanged } from './utils/firebase-helper';

if ("Notification" in window && Notification.permission !== "denied") {
  Notification.requestPermission();
}

const enabled = true;

if (enabled) {
  onAuthStateChanged(function(user) {
    let login = false;
    if (user) {
      login = true
    }
    ReactDOM.render(
      <React.StrictMode>
        <App login={login} />
      </React.StrictMode>,
      document.getElementById('root')
    );
  });
}

ReactDOM.render(
  <React.StrictMode>
    <Loading />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
