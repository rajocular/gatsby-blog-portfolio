import React from 'react';
import {
  makeStyles,
  Drawer,
  Grid
} from '@material-ui/core';
import {
  FaLinkedin,
  FaGithub,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa';

const drawerWidth = 80;

const useStyles = makeStyles({
  linkContainer: {
    height: '100%',
    flexDirection: 'column',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#566573',
    border: 'none',
  },
  link: {
    display: 'flex',
    justifyContent: 'center',
    padding: '8px',
    cursor: 'pointer',
  },
  icon: {
    color: '#D6DBDF',
    height: '32px',
    width: '32px',
    '&:hover': {
      color: '#363636'
    }
  }
});

const Sidebar = ({ contactInfo }) => {
  const classes = useStyles();
  const {
    linkedin,
    github,
    email,
    contact,
  } = contactInfo;

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <Grid
        item
        container
        justify="center"
        className={classes.linkContainer}
      >
        {linkedin && (
          <Grid item className={classes.link}>
            {linkedin === 'fake'
              ? <FaLinkedin className={classes.icon}/>
              : (
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className={classes.icon}/>
              </a>
              )
            }
          </Grid>
        )}
        {github && (
          <Grid item className={classes.link}>
            {github === 'fake'
              ? <FaGithub className={classes.icon}/>
              : (
              <a href={github}>
                <FaGithub className={classes.icon}/>
              </a>
              )
            }
          </Grid>
        )}
        {email && (
          <Grid item className={classes.link}>
            {email === 'fake'
              ? <FaEnvelope className={classes.icon}/>
              : (
              <a href={'mailto:'+ email}>
                <FaEnvelope className={classes.icon}/>
              </a>
              )
            }
          </Grid>
        )}
        {contact && (
          <Grid item className={classes.link}>
            {contact === 'fake'
              ? <FaPhone className={classes.icon}/>
              : (
              <a href={"tel:"+ contact}>
                <FaPhone className={classes.icon}/>
              </a>
              )
            }
          </Grid>
        )}
      </Grid>
    </Drawer>
  );
}

export default Sidebar;
