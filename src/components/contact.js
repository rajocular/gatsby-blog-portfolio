import React from 'react';
import {
  makeStyles,
  Avatar
} from '@material-ui/core';
import {
  FaLinkedin,
  FaGithub,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa';

const useStyles = makeStyles(theme => ({
  link: {
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid #F05454',
    backgroundColor: 'transparent',
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
      marginRight: theme.spacing(2)
    },

    '&:after': {
      backgroundColor: '#F05454',
      content: '" "',
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      transform: 'translate(-100%, 0) rotate(10deg)',
      transformOrigin: 'top left',
      transition: '.2s transform ease-out',
      willChange: 'transform',
      zIndex: -1
    },

    '&:hover': {
      willChange: 'transform',
      '&:after': {
        transform: 'translate(0, 0)'
      },

      '& svg': {
        color: '#EBE645',
      }
    }
  },
  icon: {
    color: '#F05454',
    height: 24,
    width: 24,
  }
}));

const Contact = ({
  contactInfo
}) => {
  const classes = useStyles();

  const {
    linkedin,
    github,
    email,
    contact,
  } = contactInfo;
  return (
    <>
      {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <Avatar className={classes.link}>
              <FaLinkedin className={classes.icon}/>
            </Avatar>
          </a>
      )}
      {github && (
        <a href={github}>
          <Avatar className={classes.link}>
            <FaGithub className={classes.icon}/>
          </Avatar>
        </a>
      )}
      {email && (
        <a href={'mailto:'+ email}>
          <Avatar className={classes.link}>
            <FaEnvelope className={classes.icon}/>
          </Avatar>
        </a>
      )}
      {contact && (
        <a href={"tel:"+ contact}>
          <Avatar item className={classes.link}>
            <FaPhone className={classes.icon}/>
          </Avatar>
        </a>
      )}
    </>
  )
}

export default Contact;
