import React from 'react';
import {
  Grid,
  Typography,
  Avatar,
  makeStyles,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";

const useStyles = makeStyles({
  container: {
    flexDirection: 'column',
    marginTop: 60,
  },
  navigation: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: 8,
  },
  avatar: {
    height: 150,
    width: 150,
  },
  detail: {
    padding: 8,
  }
});

const Article = ({ article, onClick }) => {
  const classes = useStyles();
  const {
    image,
    title,
    articleUrl,
    description,
    publishedDate,
  } = article;

  return (
    <Grid container className={classes.container}>
      <Grid item onClick={() => onClick()} className={classes.navigation}>
        <ArrowBack />
        <Typography variant="subtitle1">Back</Typography>
      </Grid>
      <Grid item className={classes.detail}>
        <Avatar src={image.file.url} className={classes.avatar} />
      </Grid>
      <Grid item className={classes.detail}>
        <Typography variant="h4">{title}</Typography>
      </Grid>
      <Grid item className={classes.detail}>
        <Typography>{publishedDate}</Typography>
      </Grid>
      <Grid item className={classes.detail}>
        <Typography>{documentToReactComponents(description.json)}</Typography>
      </Grid>
      <Grid item className={classes.detail}>
        <a href={articleUrl} target="_blank" rel="noopener noreferrer">
          <Typography>click here to see more</Typography>
        </a>
      </Grid>
    </Grid>
  );
}

export default Article;
