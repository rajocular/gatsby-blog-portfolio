import React, { useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet"
import Lottie from 'react-lottie';
import {
  Grid,
  makeStyles,
  CssBaseline,
  Box,
  Hidden
} from "@material-ui/core";

import { graphql, StaticQuery } from "gatsby";

import MyInfo from '../components/my-info';
import Sidebar from "../components/sidebar";
import Articles from "../components/articles";
import * as animationData from '../../static/loader.json';

import '../styles/index.css';

const query = graphql`
    query{
      allContentfulArticles(sort: {fields:order, order:ASC}) {
        edges {
          node {
            title
            articleUrl
            description {
              description
            }
            image {
              file {
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
`;

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#EBE645',
    overflow: 'auto',
    position: 'relative'
  },
  animationContainer: {
    height: '100vh',
    alignItems: 'center'
  },
  titleContainer: {
    margin: 10,
    width: '100%',
    font: 'Open Sans',
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
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, []);

  return (
    <Fragment>
      {loading
        ? (
        <Grid container className={classes.animationContainer}>
          <Lottie
            options={defaultOptions}
            height={500}
            width={500}
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
            const articles = data.allContentfulArticles.edges;

            return (
              <Box className={classes.root}>
                <Helmet title={authorDetails.name.charAt(0).toUpperCase() + authorDetails.name.slice(1)}/>
                <CssBaseline />
                <Hidden smDown>
                  <Sidebar contactInfo={authorContactDetails} />
                </Hidden>
                <Box p={3}>
                  <MyInfo info={authorDetails} contactInfo={authorContactDetails} />
                  <Articles articles={articles} />
                </Box>
              </Box>
            )}
          }
        />
        )
      }
    </Fragment>
  )
}
    
export default HomePage;
