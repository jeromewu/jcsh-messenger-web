import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  contr: {
    height: '100vh',
  },
  paperContr: {
    height: '100%',
    padding: '32px',
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
});

export default () => {
  const classes = useStyles();
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
            <TextField label="教室" />
            <br/>
            <TextField label="密碼" />
          </div>
          <Button variant="outlined">
            登入
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};
