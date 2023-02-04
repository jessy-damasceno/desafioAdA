import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../logo.jpg';

const useStyles = makeStyles(theme => ({
  logo: {
    height: '50px',
    marginRight: theme.spacing(2),
  },
}));

function LogoMenuItem() {
  const classes = useStyles();

  return (
    <img src={logo} alt="Logo" className={classes.logo} />
  );
}

export default LogoMenuItem;