import React, { useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet"
import Lottie from 'react-lottie';
import {
  Grid,
  makeStyles,
  Divider,
  CssBaseline,
  Typography
} from "@material-ui/core";

import { graphql, StaticQuery } from "gatsby";

import MyInfo from '../components/my-info';
import Sidebar from "../components/sidebar";
import Article from "../components/article";
import * as animationData from '../../static/loader.json';

const query = graphql`
    query{
      allContentfulArticles(sort: {fields:order, order:ASC}) {
        group(field: category) {
          fieldValue
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
`;

const useStyles = makeStyles(theme => ({
  animationContainer: {
    height: '100vh',
    alignItems: 'center'
  },
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
  articleHeader: {
    alignItems: 'center',
    flexDirection: 'column',
    padding: '16px 32px',

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(4)
    }
  },
  articleHeaderText: {
    fontFamily: 'Georgia, serif',
  },
  articleHeaderDivider: {
    margin: '4px 0',
    height: '4px',
    width: '40px',
    backgroundColor: '#566573',
  },
  section: {
    padding: '16px 0'
  },
  divider: {
    margin: 0,
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  async function onRender() {
    await setTimeout(() => setLoading(false), 2000);
  }

  useEffect(() => {
    onRender();
  }, []);

  return (
    <Fragment>
      {loading
        ? (
        <Grid container className={classes.animationContainer}>
          <Lottie
            options={defaultOptions}
            height={300}
            width={300}
            isStopped={!loading}
          />
        </Grid>
        )
        : (
        <StaticQuery
          query={query}
          render={data => {
            const authorDetails = data.allContentfulAuthor.edges[0].node;
            const authorContactDetails = authorDetails.links;
            const articleGroups = data.allContentfulArticles.group;

            return (
              <div className={classes.root}>
                <Helmet title={authorDetails.name.charAt(0).toUpperCase() + authorDetails.name.slice(1)}/>
                <CssBaseline />
                <Sidebar contactInfo={authorContactDetails} />
                <main className={classes.content}>
                  <Grid container direction="column">
                    <MyInfo info={authorDetails} />
                    <Divider variant="fullWidth" className={classes.divider}/>
                    
                      {articleGroups.map((group, index) => {
                        const { fieldValue, edges: articles } = group;
                        const isLastSection = (index === articleGroups.length - 1);

                        return (
                          <Grid item container key={fieldValue}>
                            <Grid item container className={classes.articleHeader}>
                              <Typography variant="h5" className={classes.articleHeaderText}>{fieldValue}</Typography>
                              <Divider className={classes.articleHeaderDivider} />
                            </Grid>
                            <Grid item container justify="center" alignItems="center" className={classes.section}>
                              {articles.map(article => <Article key={article.node.title} article={article.node} />)}
                            </Grid>
                            {!isLastSection
                              && (
                              <Grid item xs={12} className={classes.section}>
                                <Divider variant="fullWidth" className={classes.divider} />
                              </Grid>
                              )
                            }
                          </Grid>
                        );
                      })}
                  </Grid>
                </main>
              </div>
            )}
          }
        />
        )
      }
    </Fragment>
  )
}
    
export default HomePage;
