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
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 24,  
  },
  avatar: {
    height: 150,
    width: 150
  },
  aboutMe: {
    marginTop: 16,
  },
  text: {
    fontFamily: 'Georgia, serif'
  }
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
      <Grid item xs={12} md={2} className={classes.avatarContainer}>
        <Avatar src={avatar.file.url} className={classes.avatar} />
      </Grid>
      <Grid item container xs={12} md={10}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.text}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Typography>
        </Grid>
        <Grid item className={classes.aboutMe} xs={12} md={8}>
          <Typography variant="subtitle1" className={classes.text}>
            {aboutMe}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MyInfo;
