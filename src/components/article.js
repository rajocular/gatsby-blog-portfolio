import React, { Fragment } from 'react';
import classNames from 'classnames';
import {
  Grid,
  Typography,
  Avatar,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    perspective: '1000px',

    '&:hover': {
      cursor: 'pointer'
    },

    [theme.breakpoints.up('lg')]: {
      height: '400px',
      padding: '32px',
      
      '&:hover $cardContainer': {
        transform: 'rotateY(180deg)',
      },
    }
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',

    [theme.breakpoints.up('lg')]: {
      position: 'relative',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      borderRadius: '16px',
    }
  },
  card: {
    padding: '32px',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',

    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
    }
  },
  cardFront: {
    justifyContent: 'center',
  },
  cardBack: {
    transform: 'rotateY(180deg)',
    display: 'flex',
    backgroundColor: '#566573',
    borderRadius: '16px',
  },
  avatar: {
    height: 150,
    width: 150,
    position: 'unset'
  },
  title: {
    padding: 16,
    width: '100%',
    textAlign: 'center',
    marginTop: '8px',
    fontFamily: 'Georgia, serif'
  },
  descriptionContainer: {
    padding: '0 32px 8px 32px',
  },
  description: {
    fontFamily: 'Georgia, serif',
    color: 'black',
    fontWeight: 'normal',
    margin: 'auto',

    [theme.breakpoints.up('lg')]: {
      color: 'white',
      fontWeight: 'bold',
      overflowY: 'auto',
      height: '100%'
    }
  },
}));

const Article = ({ article }) => {
  const classes = useStyles();

  const {
    image,
    title,
    articleUrl,
    description,
  } = article;
  const isSmall = useMediaQuery('(max-width: 1280px)');

  const openLink = () => {
    if (articleUrl === 'fake') return;

    const newTab = window.open(articleUrl, '_blank');
    newTab.focus()
  };

  return (
    <Fragment>
      <Grid
        item
        container
        xs={12}
        lg={4}
        className={classes.container}
        onClick={() => openLink()}
      >
        <Grid className={classes.cardContainer}>

          <Grid item container className={classNames(classes.card, classes.cardFront)}>
            <Avatar src={image.file.url} className={classes.avatar} />
            <Typography variant="h5" className={classes.title}>
              {title}
            </Typography>
          </Grid>

          {!isSmall
            && (
            <Grid item className={classNames(classes.card, classes.cardBack)}>
              <Typography variant="body1" className={classes.description}>
                {description && description.description}
              </Typography>
            </Grid>
            )
          }
        </Grid>

      </Grid>
      {isSmall
        && (
        <Grid item className={classes.descriptionContainer}>
          <Typography variant="body1" className={classes.description}>
            {description && description.description}
          </Typography>
        </Grid>
        )
      }
    </Fragment>
  );
}

export default Article;
