import React, { Component } from 'react';
import { Container, Card, Tabs, Tab, Form, Button, Row, Col, ListGroup } from 'react-bootstrap'
import "./Details.css"

const {REACT_APP_BACKEND_URL} = process.env
class Details extends Component {

id = this.props.match.params.id
url = `${REACT_APP_BACKEND_URL}/products/${this.id}`
reviewUrl = `${REACT_APP_BACKEND_URL}/reviews`

state={
  editMode:'',
  editReview:{
    comment:'',
    rate:'',
    productId:this.id
  },
  deleteReview:false,
  product:{},
  postReview:{
    comment:'',
    rate:'',
    productId:this.id
  }
}

componentDidMount = () => {
  this.fetchProduct()
}

componentDidUpdate = (prevProps, prevState) => {
  if((prevState.postReview.comment !== this.state.postReview.comment) || (prevState.postReview.rate !== this.state.postReview.rate)
  || (this.state.deleteReview) ||(prevState.editReview.rate !== this.state.editReview.rate) ||(prevState.editReview.comment !== this.state.editReview.comment)
  ){
    this.setState({
      ...this.state,
      deleteReview:false
    })
    this.fetchProduct()

  }
}

fetchProduct = async () => {
  try {
    const response = await fetch(this.url)
    const data = await response.json()
    console.log(data);
    if(response.ok){
      this.setState({
        ...this.state,
        product:data
      })
    }
    console.log(this.state.product.category.name);
  } catch (error) {
    console.log(error);
  }
}

postReview = async (e) => {
  try {
    const response = await fetch(this.reviewUrl, {
      method: 'POST',
      body:JSON.stringify(this.state.postReview),
      headers:{
        'content-type':"application/json"
      }
    })
    const data = await response.json()
    console.log(data);
    if(response.ok){
      alert("comment added successfully")
      this.setState({
        ...this.state,
        postReview:{
          comment:"",
          rate:"",
          productId: this.id
        }
      })
    }
    else{
      console.log("error posting comment");
    }
  } catch (error) {
    console.log(error);
  }
}

editComment = async (e) => {
  try {
    const response = await fetch(`${this.reviewUrl}/${e.currentTarget.id}`,{
      method:"PUT",
      body:JSON.stringify(this.state.editReview),
      headers:{
        "content-type":"application/json"
      }
    })
    if(response.ok){
      alert("comment edited successfully")
      this.setState({
        ...this.state,
        editMode:'',
        editReview:{
          rate:"",
          comment:"",
          productId:this.id
        }
      })
    }
    else{
      console.log("error editing comment");
    }
  } catch (error) {
    console.log(error);
  }
}

deleteReview = async (e) => {
  try {
    const response = await fetch(`${this.reviewUrl}/${e.currentTarget.id}`,{
      method:"DELETE"
    })
    console.log(response);
    if(response.ok){
      alert('comment deleted successfully')
      this.setState({
        ...this.state,
        deleteReview:true
      })
    }
    else{
      console.log("error while deleting comment");
    }
  } catch (error) {
    console.log(error);
  }
}

    render() {
      const { name, brand, id, imageUrl, price, category, reviews, description } = this.state.product
        return (
            <Container fluid >
                <Row>
                    <Col xs={4}>
                        <img style={{height:'30rem'}} className="img-fluid p-5" src={imageUrl} alt="product"/>
                    </Col>

                    <Col className="p-5" xs={8}>
                      <h1>{name}</h1>
                         <ListGroup className="pt-4">
                            <ListGroup.Item><b>Brand: </b>{brand}</ListGroup.Item>
                            <ListGroup.Item><b>Price: </b>{price} €</ListGroup.Item>
                            <ListGroup.Item><b>Category: </b>{category && category.name}</ListGroup.Item>
                        </ListGroup>
                        <div style={{backgroundColor:'white'}}>
                          <p className="mt-5 p-3"><b>Description: </b>{description}</p>
                        </div> 
                    </Col> 
                  
                </Row>

                {/*POST reviews */}

                <div className="mt-5 px-5">
                <Tabs defaultActiveKey="Comments" id="review-tabs" style={{color:"black"}} >
                  <Tab  eventKey="Comments" title="Comments" >
                  <div className="mt-5">
                  <div>
                            <Form.Group className="my-3">
                            <Form.Label>Rate</Form.Label>
                            <Form.Control 
                            id="rate"
                            min="1"
                            max="5"
                            required
                            type="number"
                            value={this.state.postReview.rate}
                            onChange={(e)=> this.setState({
                              ...this.state,
                              postReview:{
                                ...this.state.postReview,
                                rate: e.target.value
                              }
                            })}
                            size="lg" 
                            placeholder="Rate" />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control 
                            id="comment"
                            value={this.state.postReview.comment}
                            onChange={(e)=> this.setState({
                              ...this.state,
                              postReview:{
                                ...this.state.postReview,
                                comment: e.target.value
                              }
                            })}
                            as="textarea"
                            placeholder="Comment" 
                            rows={3} />
                          </Form.Group>

                        </div>
                        <Button
                            onClick={(e)=> this.postReview(e)}
                            className="mt-4 mb-4" 
                            variant="primary">
                                Post Review
                        </Button>

                        {/* GET product reviews/ PUT reviews  */}

                         <div className="mt-5">
                          <h6>{reviews && reviews.length} {reviews && reviews.length === 1?'Comment':'Comments'}</h6>
                          {reviews && reviews.length ? reviews.reverse().map( review =>
                              <div key={review.reviewId} className="mb-3">                      
                                <Card>
                                  {parseInt(this.state.editMode) === review.reviewId

                                  ?<>
                                  <Card.Header>
                                  <div className="d-flex justify-content-between">
                                    <div>
                                      <Form.Group className="my-3">
                                        <Form.Label>Rate</Form.Label>
                                        <Form.Control 
                                        id="rate"
                                        type="number"
                                        min="1"
                                        max="5"
                                        required
                                        value={this.state.editReview.rate}
                                        onChange={(e)=> this.setState({
                                          ...this.state,
                                          editReview:{
                                            ...this.state.editReview,
                                            rate: e.target.value
                                          }
                                        })} 
                                        size="lg" 
                                         />
                                      </Form.Group>
                                    </div>                                      
                                    <div>                                    
                                      <svg id={review.reviewId} onClick={(e)=>this.setState({
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
                                        <img className="commentAvatar" src ={`https://i.pravatar.cc/150?u=${review.reviewId}`} alt="avatar"/>
                                      </div>
                                      <div>
                                       <Form.Group>
                                          <Form.Label>Comment</Form.Label>
                                          <Form.Control
                                          id="comment"
                                         value={this.state.editReview.comment}
                                          onChange={(e)=> this.setState({
                                            ...this.state,
                                            editReview:{
                                              ...this.state.editReview,
                                              comment:e.target.value
                                            }
                                          })}
                                          as="textarea"
                                          rows={3} />
                                        </Form.Group>
                                      </div>
                                    </div>
                                    <div className="">
                                        <svg id={review.reviewId} onClick={(e)=>this.editComment(e)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-save" viewBox="0 0 16 16">
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
                                        <h5>Rating: {review.rate === 1 ? "⭐" 
                                        : review.rate === 2 ? "⭐⭐"
                                        : review.rate === 3 ? "⭐⭐⭐"
                                        : review.rate === 4 ? "⭐⭐⭐⭐"
                                        :"⭐⭐⭐⭐⭐" 
                                        }</h5>
                                      </div>                                      
                                      <div>
                                        <svg id={review.reviewId} onClick={(e)=>this.deleteReview(e)} style={{color:'red'}} focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                      </div>
                                    </div>                                   
                                  </Card.Header>
                                  <Card.Body>
                                    <div className="d-flex flex-row justify-content-between">
                                      <div className="d-flex">
                                        <div className="pr-5">
                                          <img className="commentAvatar" src ={`https://i.pravatar.cc/150?u=${review.reviewId}`} alt="avatar"/>
                                        </div>
                                        <div>
                                          <Card.Text>{review.comment}</Card.Text>
                                        </div>
                                      </div>
                                      <div className="">                                      
                                          <svg id={review.reviewId}  onClick={(e) => {
                                            console.log(e.currentTarget.id);
                                            this.setState({
                                            ...this.state,
                                            editMode:e.currentTarget.id,
                                            editReview:{
                                              rate:review.rate,
                                              comment:review.comment,
                                              productId:this.id
                                            }
                                          })}}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="20" height="20" focusable="false">
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
                   </div>
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