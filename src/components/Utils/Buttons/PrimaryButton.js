import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  primaryButton: {
    backgroundColor: '#EC7700',
    color: '#FFF',
    '&:hover':{
      backgroundColor: '#DE7C00',
      boxShadow: 'none',
    },
    '&:disabled':{
      border: '1px solid #DAD7D7',
      backgroundColor: 'white',
      boxShadow: 'none',
      color: '#DAD7D7',
    }
  }
}));

const PrimaryButton = ({onClick, title, disabled, }) => {

  const classes = useStyles();

  return (
    <Button onClick={onClick} className={classes.primaryButton} disabled={disabled}>
      {title}
    </Button>
  )
}

export default PrimaryButton;
