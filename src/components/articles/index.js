import React from 'react';
import {
  makeStyles,
  Typography,
  Box,
  Container,
  Link
} from "@material-ui/core";
import { ArrowRightAlt } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  article: {
    width: '100%',
    minHeight: 700,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: '#F05454',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',

    '&:hover': {
      transform: 'scale(1.01)',

      '& #arrow': {
        display: 'block',
        transition: 'transform 0.2s ease-in-out 0s',
        transform: 'translateX(5px)'
      }
    },

    [theme.breakpoints.down('sm')]: {
      minHeight: 'unset'
    }
  },
  articleTitle: {
    fontFamily: 'Teko Bold',
    fontSize: 45,
    color: '#1A1A1A',
    textDecoration: 'none'
  },
  articleDescription: {
    fontFamily: 'Teko Medium',
    fontSize: 24,
    color: '#1A1A1A',
  },
  section: {
    padding: '16px 0'
  },
  divider: {
    margin: 0,
  },
  avatar: {
    width: 400,
    height: 400
  },
  arrow: {
    display: 'none',
    width: 'inherit',
    height: 'inherit',
    color: '#EBE645'
  },
  link: {
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'none',
    }
  }
}));

const Articles = ({
  articles
}) => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth='md'>
        {articles.map((article) => (
          <Link key={article.node.title} href={article.node.articleUrl} className={classes.link} target='_blank' rel='noopener noreferrer'>
            <Box className={classes.article}>
              <Box>
                {/* <img src={article.node.image.file.url} alt={article.node.image.file.fileName} className={classes.avatar} /> */}
                <Typography className={classes.articleTitle}>
                  {article.node.title}
                </Typography>
                {article.node.description && (
                  <Typography className={classes.articleDescription}>
                    {article.node.description.description}
                  </Typography>
                )}
              </Box>
              <Box display='flex' alignItems='center' justifyContent='flex-end'>
                <Box width={50} height={50}>
                  <ArrowRightAlt id='arrow' className={classes.arrow} />
                </Box>
              </Box>
            </Box>
          </Link>
        ))}
      </Container>
    </>
  )
}

export default Articles;
