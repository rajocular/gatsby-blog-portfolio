import React from 'react';
import {
  makeStyles,
  Box
} from '@material-ui/core';
import Contact from './contact';

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    position: 'fixed',
    top: 10,
    left: 10
  },
}));

const Sidebar = ({ contactInfo }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Contact contactInfo={contactInfo} />
    </Box>
  );
}

export default Sidebar;
