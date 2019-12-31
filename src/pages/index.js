import React, { useState } from "react";
import { Helmet } from "react-helmet"
import {
  Grid,
  makeStyles,
  Divider,
  Typography,
  CssBaseline,
  Avatar,
} from "@material-ui/core";

import { graphql, StaticQuery } from "gatsby";

import MyInfo from '../components/my-info';
import Sidebar from "../components/sidebar";
import Article from "../components/article";

const query = graphql`
    query{
        allContentfulArticles(sort:{fields: publishedDate,order:DESC}){
            edges{
                node{
                    title
                    articleUrl
                    description{json}
                    publishedDate(formatString: "MMMM Do, YYYY")
                    image{
                        file{
                            fileName
                            url
                        }
                    }
                }
            }
        }
        allContentfulAuthor{
            edges{
                node{
                    name
                    aboutMe
                    links{
                        linkedin
                        github
                        contact
                        email
                    }
                    avatar{
                        file{
                            fileName
                            url
                        }
                    }
                }
            }
        }
    }
`

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  titleContainer: {
    margin: 10,
    width: '100%',
    font: 'Open Sans',
  },
  articlesContainer: {
    alignItems: 'center',
    marginTop: '32px',
  },
  avatar: {
    height: 150,
    width: 150,

    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0px 0px 40px 0px rgba(0,0,0, 0.5)',
    },
  },
  title: {
    padding: 16,
    '&:hover': {
      cursor: 'pointer'
    },
  },
  divider: {
    margin: 0,
  },
  card: {
    alignItems: 'center',
    flexDirection: 'column',
    padding: '32px',
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const [selectedArticle, setArticle] = useState(undefined);

  return (
    <StaticQuery
      query={query}
      render={data => {
        const authorDetails = data.allContentfulAuthor.edges[0].node;
        const authorContactDetails = authorDetails.links;
        const articles = data.allContentfulArticles.edges;

        return (
          <div className={classes.root}>
            <Helmet title={authorDetails.name.charAt(0).toUpperCase() + authorDetails.name.slice(1)}/>
            <CssBaseline />
            <Sidebar contactInfo={authorContactDetails} showHomeIcon={selectedArticle} onClick={() => setArticle(undefined)} />
            <main className={classes.content}>
              {selectedArticle
                ? <Article article={selectedArticle} onClick={() => setArticle(undefined)} />
                : (
                <Grid container direction="column">
                  <MyInfo info={authorDetails} />
                  <Divider variant="fullWidth" className={classes.divider}/>
                  <Grid
                    item
                    container
                    className={classes.articlesContainer}
                  >
                    {articles.map(data => {
                      const article = data.node;
                      const { image, title } = article;
                      return (
                        <Grid
                          item
                          container
                          xs={12}
                          md={4}
                          className={classes.card}
                          key={article.title}
                        >
                          <Grid item>
                            <Avatar
                              src={image.file.url}
                              className={classes.avatar}
                              onClick={() => setArticle(article)}
                            />
                          </Grid>
                          <Grid item>
                            <Typography
                              className={classes.title}
                              onClick={() => setArticle(article)}
                            >
                              {title}
                            </Typography>
                          </Grid>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Grid>
                )
              }
            </main>
          </div>
        )}
      }
    />
  )
}
    
export default HomePage;
