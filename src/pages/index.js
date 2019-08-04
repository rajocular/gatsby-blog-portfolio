import React from "react";
import { Helmet } from "react-helmet"
import {
  Grid,
  makeStyles,
  Divider,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import {
  FaLinkedin,
  FaGithub,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import { graphql, StaticQuery } from "gatsby";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";

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

const useStyles = makeStyles({
  titleContainer: {
    margin: 10,
    width: '100%',
    font: 'Open Sans',
  },
  articlesContainer: {
    margin: '5rem auto',
  },
  image: {
    width: 200,
    height: 200,
  },
  divider: {
    margin: 0,
  },
  contactIcon: {
    color: 'black',
    fontSize: '2rem',
  },
  card: {
    maxWidth: 345,
    border: '1px solid black',
    '&:hover': {
      boxShadow: '0px 0px 40px 0px rgba(0,0,0, 0.5)',
    }
  },
  media: {
    height: 340,
  },
  action: {
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      color: 'black',
    }
  }
});

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
          <Grid container direction="column">
            <Helmet title={authorDetails.name.charAt(0).toUpperCase() + authorDetails.name.slice(1)}/>
            <Grid
              item
              container
              alignItems="center"
              spacing={6}
              className={classes.titleContainer}
            >
              <Grid item>
                {authorDetails.avatar
                  && (
                  <img
                    src={authorDetails.avatar.file.url}
                    className={classes.image}
                    alt="featureImage"
                  />
                )}
                <Grid
                  item
                  container
                  spacing={3}
                  justify="center"
                >
                  <Grid item>
                    {authorContactDetails.linkedin && (
                      <a href={authorContactDetails.linkedin}>
                        <FaLinkedin className={classes.contactIcon}/>
                      </a>
                    )}
                  </Grid>
                  <Grid item>
                    {authorContactDetails.github && (
                      <a href={authorContactDetails.github}>
                        <FaGithub className={classes.contactIcon}/>
                      </a>
                    )}
                  </Grid>
                  <Grid item>
                    {authorContactDetails.email && (
                      <a href={'mailto:'+ authorContactDetails.email}>
                        <FaEnvelope className={classes.contactIcon}/>
                      </a>
                    )}
                  </Grid>
                  <Grid item>
                    {authorContactDetails.contact && (
                      <a href={"tel:"+ authorContactDetails.contact}>
                        <FaPhone className={classes.contactIcon}/>
                      </a>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {authorDetails.name && (
                  <Typography variant="h3">
                    {authorDetails.name.charAt(0).toUpperCase() + authorDetails.name.slice(1)}
                  </Typography>
                )}
                {authorDetails.aboutMe && (
                  <Typography variant="body1">
                    {authorDetails.aboutMe}
                  </Typography>
                )}
              </Grid>

            </Grid>
            <Divider variant="fullWidth" className={classes.divider}/>
            <Grid
              item
              container
              alignItems="center"
              spacing={6}
              lg={9}
              wrap
              className={classes.articlesContainer}
            >
              {articles.map(data => {
                const article = data.node;
                const { image, title, description, publishedDate, articleUrl } = article;
                return (
                  <Grid item>
                    <Card className={classes.card}>
                      <a
                        href={articleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.action}
                      >
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
                            image={image.file.url}
                            title={title}
                            component='img'
                          />
                          <CardContent>
                            <Typography variant="h5" component="h2" align="center">
                              {title}
                            </Typography>
                            <Typography variant="p" component="p" align="center">
                              {publishedDate}
                            </Typography>
                            <Divider variant="inset" className={classes.divider}/>
                            <Typography variant="body2" color="textSecondary" component="p" align="justify">
                              {documentToReactComponents(description.json)}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </a>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        )}
      }
    />
  )
}
    
export default HomePage;
