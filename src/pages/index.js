import React from "react";
import { Helmet } from "react-helmet"
import {
  Grid,
  makeStyles,
  Divider,
  CssBaseline
} from "@material-ui/core";

import { graphql, StaticQuery } from "gatsby";

import MyInfo from '../components/my-info';
import Sidebar from "../components/sidebar";
import Article from "../components/article";

const query = graphql`
    query{
        allContentfulArticles(sort: {fields:order, order:ASC}){
            edges{
                node{
                    title
                    articleUrl
                    description{
                      description
                    }
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
    backgroundColor: 'transparent',
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
  divider: {
    margin: 0,
  },
}));

const HomePage = () => {
  const classes = useStyles();

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
            <Sidebar contactInfo={authorContactDetails} />
            <main className={classes.content}>
              <Grid container direction="column">
                <MyInfo info={authorDetails} />
                <Divider variant="fullWidth" className={classes.divider}/>
                <Grid
                  item
                  container
                  className={classes.articlesContainer}
                >
                  {articles.map(data => <Article article={data.node} key={data.node.title} />)}
                </Grid>
              </Grid>
            </main>
          </div>
        )}
      }
    />
  )
}
    
export default HomePage;
