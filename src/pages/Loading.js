import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  contr: {
    height: '100vh',
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
      <CircularProgress size={48}/>
    </Grid>
  )
};
