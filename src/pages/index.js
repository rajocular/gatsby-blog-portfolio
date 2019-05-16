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
                    role
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

class CollapsePage extends Component {
    state = {
        collapseID: ""
    }
    
    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }
    
    render() {
      return (
            <StaticQuery 
                query={query}
                render={data=>(
                    <MDBContainer fluid>
                        <MDBRow>
                            <MDBCol md="3 pt-5 pb-5 bg-dark" style={{color:'white'}}>
                                {data.allContentfulAuthor.edges.map(edge=>{
                                    return(
                                        <MDBContainer className="mt-5 text-center">
                                            <Helmet title={edge.node.name.charAt(0).toUpperCase() + edge.node.name.slice(1)}/>
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
                                            <h1 className="display-3 pb-5">{edge.node.name.charAt(0).toUpperCase() + edge.node.name.slice(1)}</h1>
                                            <h4 className="pb-5 text-center text-justify">{edge.node.aboutMe}</h4>
                                            {edge.node.links.linkedin && (
                                                <a href={edge.node.links.linkedin}>
                                                    <MDBIcon fab icon="linkedin" size="2x" className=" pr-5"/>
                                                </a>
                                            )}
                                            {edge.node.links.github && (
                                                <a href={edge.node.links.github}>
                                                    <MDBIcon fab icon="github" size="2x" className=" pr-5"/>
                                                </a>
                                            )}
                                            {edge.node.links.email && (
                                                <a href={'mailto:'+edge.node.links.email}>
                                                    <MDBIcon icon="envelope" size="2x" className=" pr-5"/>
                                                </a>
                                            )}
                                            {edge.node.links.contact && (
                                                <a href={"tel:"+edge.node.links.contact}>
                                                    <MDBIcon icon="phone" size="2x" className=" pr-5"/>
                                                </a>
                                            )}
                                            
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
                                                <MDBCardImage className="img-fluid" src={edge.node.image.file.url} waves />
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
                                                        {edge.node.role && (
                                                            <h6 className="pt-2 text-left"><b>Category: {edge.node.role}</b></h6>
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
    
export default CollapsePage;