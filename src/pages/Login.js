import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { auth } from '../utils/firebase-helper';

const useStyles = makeStyles({
  contr: {
    height: '100vh',
  },
  paperContr: {
    height: '100%',
    padding: '8px',
  },
  paper: {
    height: '80vh',
    minHeight: '368px',
    width: '30vw',
    minWidth: '256px',
  },
  logo: {
    width: '64px',
    height: '64px',
  },
  title: {
    fontSize: '24px',
  },
  message: {
    color: 'red',
  },
});

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    try {
      await auth(email, password);
      history.push('/main');
      setMsg("");
    } catch(e) {
      setMsg("帳號或密碼錯誤");
    }
  };
  return (
    <Grid
      className={classes.contr}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Paper className={classes.paper} elevation={3}>
        <Grid
          className={classes.paperContr}
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
        >
          <img className={classes.logo} alt="logo" src="/logo192.png" />
          <p className={classes.title}>竹崎高中 即時通</p>
          <div>
            <TextField
              label="教室"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
            />
            <br/>
            <TextField
              type="password"
              label="密碼"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
            />
            <p align="center" className={classes.message}>{msg}</p>
          </div>
          <Button variant="outlined" onClick={onLogin}>
            登入
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};
