import React, { Component } from "react";
import { Helmet } from "react-helmet"
import { 
    MDBContainer, MDBIcon, MDBBtn,
    MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol
} from "mdbreact";
import { graphql, StaticQuery } from "gatsby"
import {documentToReactComponents} from "@contentful/rich-text-react-renderer"

import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import pageStyles from '../styles/style.module.scss'

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

class HomePage extends Component {
    
    render() {
      return (
            <StaticQuery 
                query={query}
                render={data=>(
                    <MDBContainer fluid>
                        <MDBRow>
                            <MDBCol md="3 pt-5 pb-5 bg-info" style={{color:'white'}}>
                                {data.allContentfulAuthor.edges.map(edge=>{
                                    return(
                                        <MDBContainer className="mt-5 text-center">
                                            <Helmet title={edge.node.name.charAt(0).toUpperCase() + edge.node.name.slice(1)}/>
                                            {edge.node.avatar.file.url && (
                                              <img
                                                src={edge.node.avatar.file.url}
                                                className="img-fluid mb-3"
                                                alt=""
                                                style={{
                                                  'vertical-align': 'middle',
                                                  width: '250px',
                                                  height: '250px',
                                                  'border-radius': '50%'
                                                }}
                                              />
                                            )}
                                            {edge.node.name && (
                                              <h1 className="mt-3 pb-5">{edge.node.name.charAt(0).toUpperCase() + edge.node.name.slice(1)}</h1>
                                            )}
                                            {edge.node.aboutMe && (
                                              <h4 className="pb-5 text-center text-justify">{edge.node.aboutMe}</h4>
                                            )}
                                            <div>
                                              {edge.node.links.linkedin && (
                                                  <a href={edge.node.links.linkedin}>
                                                      <MDBIcon fab icon="linkedin" size="2x" className="white-text pr-5"/>
                                                  </a>
                                              )}
                                              {edge.node.links.github && (
                                                  <a href={edge.node.links.github}>
                                                      <MDBIcon fab icon="github" size="2x" className="white-text pr-5"/>
                                                  </a>
                                              )}
                                              {edge.node.links.email && (
                                                  <a href={'mailto:'+edge.node.links.email}>
                                                      <MDBIcon icon="envelope" size="2x" className="white-text pr-5"/>
                                                  </a>
                                              )}
                                              {edge.node.links.contact && (
                                                  <a href={"tel:"+edge.node.links.contact}>
                                                      <MDBIcon icon="phone" size="2x" className="white-text pr-5"/>
                                                  </a>
                                              )}
                                            </div>
                                        </MDBContainer>
                                    )
                                })}
                            </MDBCol>
                            <MDBCol className={pageStyles.scrollContent}>
                                <div className="d-flex flex-wrap justify-content-center">
                                    {data.allContentfulArticles.edges.map((edge)=>{
                                        return(
                                            <>
                                                <MDBCard className="m-3 text-center hoverable" style={{ width: "22rem" }} >
                                                    <a href={edge.node.articleUrl} target="_blank" rel="noopener noreferrer" style={{'cursor':'pointer'}}>
                                                      <MDBCardImage className="img-fluid" src={edge.node.image.file.url} waves />
                                                    </a>
                                                    <MDBCardBody>
                                                        {edge.node.title && (
                                                            <MDBCardTitle className="p-2">{edge.node.title}</MDBCardTitle>
                                                        )}
                                                        <MDBCardText >
                                                            {edge.node.publishedDate && (
                                                                <p className="border-bottom border-info">{edge.node.publishedDate}</p>
                                                            )}
                                                            {edge.node.description && (
                                                                <div className="text-justify">
                                                                    {documentToReactComponents(edge.node.description.json)}
                                                                </div>
                                                            )}
                                                        </MDBCardText>
                                                    </MDBCardBody>
                                                    {edge.node.articleUrl && (
                                                        <MDBBtn href={edge.node.articleUrl} color="info" target="_blank" rel="noopener noreferrer">view</MDBBtn>
                                                    )}
                                                </MDBCard>
                                            </>
                                        )
                                    })}
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                )}
            />
        );
    }
}
    
export default HomePage;
