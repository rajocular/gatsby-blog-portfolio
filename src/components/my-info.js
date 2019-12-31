import React from 'react';
import {
  makeStyles,
  Grid,
  Avatar,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    padding: 24,
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 24,  
  },
  avatar: {
    height: 300,
    width: 300,
    [theme.breakpoints.down('sm')]: {
      height: 150,
      width: 150,
    }
  },
  aboutMe: {
    marginTop: 16,
  },
}))

const MyInfo = ({ info }) => {
  const classes = useStyles();
  const {
    name,
    aboutMe,
    avatar
  } = info;

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.avatarContainer}>
        <Avatar src={avatar.file.url} className={classes.avatar} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} className={classes.aboutMe}>
        <Typography variant="subtitle1">
          {aboutMe}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default MyInfo;
