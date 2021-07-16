import React, { Component } from 'react';
import { Container, Card, Tabs, Tab, Form, Button, Row, Col, ListGroup } from 'react-bootstrap'
import "./Details.css"

class Details extends Component {



    render() {
        return (
            <Container fluid >
                <Row>
                    <Col xs={4}>
                        <img className="img-fluid p-5" src="https://static.posters.cz/image/750/bilderharry-potter-deathly-hallows-part-1-i69611.jpg" alt="product"/>
                    </Col>

                    <Col className="p-5" xs={8}>
                      <h1>Harry Potter </h1>
                         <ListGroup className="pt-4">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                    </Col>                    
                </Row>

                {/*POST reviews */}

                <div className="mt-5 px-5">
                <Tabs defaultActiveKey="Comments" id="review-tabs" style={{color:"black"}} >
                  <Tab id="work"  eventKey="Comments" title="Comments" >
                  <div>
                            <Form.Group className="my-3">
                            <Form.Label>Reviews</Form.Label>
                            <Form.Control 
                            id="rate"
                            required
                            type="number"
                            /* value={this.state.commentPost.author}
                             onChange={(e)=> this.commentInputHandle(e)} */
                            size="lg" 
                            placeholder="Rate" />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control 
                            id="comment"
                           /*  value={this.state.commentPost.text}
                            onChange={(e)=> this.commentInputHandle(e)} */
                            as="textarea"
                            placeholder="Comment" 
                            rows={3} />
                          </Form.Group>

                        </div>
                        <Button
                            /* onClick={(e)=> this.postComment(e)}  */
                            className="mt-4 mb-4" 
                            variant="primary">
                                Post Review
                        </Button>
                    {/*
                      <div className="mt-5">                                             
                        <div>
                            <Form.Group className="my-3">
                            <Form.Label>Reviews</Form.Label>
                            <Form.Control 
                            id="rate"
                            required
                            type="number"
                            value={this.state.commentPost.author}
                             onChange={(e)=> this.commentInputHandle(e)}
                            size="lg" 
                            placeholder="Rate" />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control 
                            id="comment"
                            value={this.state.commentPost.text}
                            onChange={(e)=> this.commentInputHandle(e)}
                            as="textarea"
                            placeholder="Comment" 
                            rows={3} />
                          </Form.Group>

                        </div>
                        <Button
                            onClick={(e)=> this.postComment(e)} 
                            className="mt-4 mb-4" 
                            variant="primary">
                                Post Review
                        </Button>

                        <hr/>

                         GET show reviews/ PUT reviews 
                         <div className="mt-5">
                          <h6>{this.state.comments.length} {this.state.comments.length === 1?'Comment':'Comments'}</h6>
                          {this.state.comments.length ? this.state.comments.map( comment =>
                              <div key={comment._id} className="mb-3">                      
                                <Card>
                                  {this.state.editMode === comment._id

                                  ?<>
                                  <Card.Header>
                                  <div className="d-flex justify-content-between">
                                    <div>
                                      <Form.Group className="my-3">
                                        <Form.Label>Rate</Form.Label>
                                        <Form.Control 
                                        id="rate"
                                        required
                                        value={this.state.editComments.author}
                                        onChange={(e)=> this.setState({
                                          ...this.state,
                                          editComments:{
                                            ...this.state.editComments,
                                            author: e.target.value
                                          }
                                        })}
                                        size="lg" 
                                         />
                                      </Form.Group>
                                    </div>                                      
                                    <div>                                    
                                      <svg id={comment._id} onClick={(e)=>this.setState({
                                            ...this.state,
                                            editMode:''
                                          })} style={{color:'red'}} focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                    </div>
                                  </div>                                   
                                </Card.Header>
                                <Card.Body>
                                  <div className="d-flex flex-row justify-content-between">
                                    <div className="d-flex">
                                      <div className="pr-5">
                                        <img className="commentAvatar" src ={`https://i.pravatar.cc/150?u=${comment._id}`} alt="avatar"/>
                                      </div>
                                      <div>
                                       <Form.Group>
                                          <Form.Label>Comment</Form.Label>
                                          <Form.Control
                                          id="text"
                                          value={this.state.editComments.text}
                                          onChange={(e)=> this.setState({
                                            ...this.state,
                                            editComments:{
                                              ...this.state.editComments,
                                              text:e.target.value
                                            }
                                          })}
                                          as="textarea"
                                          rows={3} />
                                        </Form.Group>
                                      </div>
                                    </div>
                                    <div className="">
                                        <svg id={comment._id} onClick={(e)=>this.editComment(e)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-save" viewBox="0 0 16 16">
                                          <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                                        </svg>
                                    </div>
                                  </div>                                
                                </Card.Body>
                                </>

                                  :<>
                                  <Card.Header>
                                    <div className="d-flex justify-content-between">
                                      <div>
                                        <h5>Rating: {comment.author}</h5>
                                      </div>                                      
                                      <div>
                                        <svg id={comment._id} onClick={(e)=>this.deleteComment(e)} style={{color:'red'}} focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                      </div>
                                    </div>                                   
                                  </Card.Header>
                                  <Card.Body>
                                    <div className="d-flex flex-row justify-content-between">
                                      <div className="d-flex">
                                        <div className="pr-5">
                                          <img className="commentAvatar" src ={`https://i.pravatar.cc/150?u=${comment._id}`} alt="avatar"/>
                                        </div>
                                        <div>
                                          <Card.Text>{comment.text}</Card.Text>
                                        </div>
                                      </div>
                                      <div className="">                                      
                                          <svg id={comment._id} onClick={(e)=>this.setState({
                                            ...this.state,
                                            editMode:e.currentTarget.id,
                                            editComments:{
                                              author:comment.author,
                                              text:comment.text
                                            }
                                          })} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="20" height="20" focusable="false">
                                          <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
                                          </svg> 
                                      </div>
                                    </div>                                
                                  </Card.Body>
                                  </>
                                }
                                  
                                </Card>
                              </div>
                            )
                          :<p>Be first to comment</p>}
                        </div>
                      </div> */}
                  </Tab>

                  <Tab eventKey="profile" title="Profile">
                  
                  </Tab>
                  <Tab eventKey="contact" title="Contact">
                  
                  </Tab>
                </Tabs>
          </div>
                
            </Container>
        );
    }
}

export default Details;