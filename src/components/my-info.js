import React from 'react';
import {
  makeStyles,
  Avatar,
  Typography,
  Box,
  Container,
  Hidden,
} from '@material-ui/core';
import Contact from './contact';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh',
  },
  avatarContainer: {
    [theme.breakpoints.only('xs')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  avatar: {
    height: 200,
    width: 200,

    [theme.breakpoints.only('xs')]: {
      height: 150,
      width: 150,
    }
  },
  title: {
    fontFamily: 'Teko Bold',
    fontSize: 60,
    margin: theme.spacing(2, 0),

    [theme.breakpoints.only('xs')]: {
      fontSize: 30,
      textAlign: 'center'
    }
  },
  content: {
    fontFamily: 'Teko Medium',
    fontSize: 24,

    [theme.breakpoints.only('xs')]: {
      fontSize: 16
    }
  }
}));

const MyInfo = ({ info, contactInfo }) => {
  const classes = useStyles();
  const {
    name,
    aboutMe,
    avatar
  } = info;

  return (
    <Box className={classes.container}>
      <Container maxWidth='md'>
        <Box className={classes.avatarContainer}>
          <Avatar src={avatar.file.url} className={classes.avatar} />
        </Box>
        <Box py={2}>
          <Typography className={classes.title}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Typography>
          <Typography className={classes.content}>
            {aboutMe}
          </Typography>
        </Box>
        <Hidden mdUp>
          <Box display='flex' alignItems='center' justifyContent='center' flexWrap='wrap'>
            <Contact contactInfo={contactInfo} />
          </Box>
        </Hidden>
      </Container>
    </Box>
  )

}

export default MyInfo;
