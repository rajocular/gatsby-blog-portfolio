import React from 'react';
import {
  Grid,
  Typography,
  Avatar,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    alignItems: 'center',
    flexDirection: 'column',
    padding: '32px',
  },
  avatar: {
    height: 150,
    width: 150,

    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0px 0px 30px 2px rgba(0,0,0, 0.5)',
    },
  },
  title: {
    padding: 16,
    fontFamily: 'Georgia, serif'
  },
  description: {
    fontFamily: 'Georgia, serif'
  }
});

const Article = ({ article }) => {
  const classes = useStyles();
  const {
    image,
    title,
    articleUrl,
    description,
  } = article;

  return (
    <Grid
      item
      container
      xs={12}
      md={4}
      className={classes.card}
    >
      <Grid item>
        <a href={articleUrl} target="_blank" rel="noopener noreferrer">
          <Avatar src={image.file.url} className={classes.avatar} />
        </a>
      </Grid>
      <Grid item>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" className={classes.description}>
          {description && description.description}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Article;
