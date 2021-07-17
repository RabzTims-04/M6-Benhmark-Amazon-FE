import React, { Component } from 'react';
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap"
import { Link } from 'react-router-dom';
import "./Cart.css"

const {REACT_APP_BACKEND_URL} = process.env
class Cart extends Component {

url = `${REACT_APP_BACKEND_URL}/cart`

state={
    cart:[],
    deleted:false
}

componentDidMount = () =>{
    this.fetchCart()
}

componentDidUpdate =() =>{
    if(this.state.deleted){
        this.setState({
            ...this.state,
            deleted:false
        })
        this.fetchCart()
    }
}

fetchCart = async () => {
    try {
        const response = await fetch(this.url)
        const data = await response.json()
        console.log(data);
        if(response.ok){
            this.setState({
                cart:data
            })
        }
    } catch (error) {
        console.log(error);
    }
}

deleteCart = async (e, query) => {
    try {
        const deleteUrl = query ? `${this.url}/${e.target.id}?all=all` : `${this.url}/${e.target.id}`
        const response = await fetch(deleteUrl, {
            method:"DELETE"
        })
        console.log(response);
        if(response.ok){
            alert("deleted successfully")
            this.setState({
                ...this.state,
                deleted:true
            })
        }else{
            console.log("error deleting product");
        }
    } catch (error) {
        console.log(error);
    }
}

checkOut = async () => {
    try {
        const response = await fetch(this.url, {
            method:"DELETE"
        })
        if(response.ok){
            alert("Thankyou for shopping with us, Your shipment is on the way!!!")
            window.location.replace("http://localhost:3000")
        }
    } catch (error) {
        console.log(error);
    }


}
    render() {
        return (
            <Container fluid className="mt-5">
                <Row>
                    <Col xs={12} md={9}>
                      
                        <Card className="mb-5">
                            <Card.Header style={{backgroundColor:"white"}} >
                                <p className="card-head mb-0">Shopping Basket</p>
                                <div className="d-flex">
                                    <Link>Deselect all items</Link>
                                    <span className="ml-auto">Price</span>
                                </div>
                                </Card.Header> 
                        {this.state.cart.products && this.state.cart.products.map( c =>                         
                            <Card.Body className="d-flex pr-0 border-line">
                               <Col xs={12} md={3}>
                                   <img className="product-img img-fluid" src={c.product.imageUrl} alt=""/>
                               </Col>
                               <Col xs={12} md={7}>
                                    <Link to={`/details/${c.productId}`} className="title-link">
                                        <Card.Title className="mb-1">{c.product.description}</Card.Title>
                                    </Link>
                                    <div className="d-flex flex-column product-detail">
                                        <span style={{color:"#058552"}}>In stock</span>
                                        <span style={{color:"#565959"}}>Eligible for FREE Shipping</span>
                                        <Form.Group controlId="formBasicCheckbox" className="mb-0">
                                            <Form.Check type="checkbox" label="This will be a gift" />
                                        </Form.Group>
                                        <span variant="dark"><b>Name: </b>{c.product.name}</span>
                                        <span variant="dark"><b>Brand: </b>{c.product.brand}</span>
                                        <span variant="dark"><b>Price: </b>€{c.product.price}</span>
                                    </div>
                                    <div className="d-flex delete-product mt-3">
                                        <span className="mr-3"><b>Quantity:</b> {c.quantity}</span>
                                        <Link id={c.productId} onClick={(e) => this.deleteCart(e)} className="mr-3"> Delete One</Link>
                                        <Link id={c.productId} onClick={(e) => this.deleteCart(e, c.product.name)} > Delete All</Link>
                                    </div>
                               </Col>
                               <Col xs={12} md={2} className="text-right">
                                    <h5><b>€{c.total}</b></h5>
                               </Col>
                            </Card.Body>
                            
                            )}
                            <Card.Footer  style={{backgroundColor:"white"}} className="text-right">
                            <h5 className="mb-4">SubTotal ({this.state.cart && this.state.cart.total} {this.state.cart && this.state.cart.total === 1?"item":"items"}): <b>€{this.state.cart && this.state.cart.totalPrice }</b></h5>
                            </Card.Footer>
                        </Card>
                    </Col>

                    <Col xs={12} md={3}>
                        <Card className="">
                            <Card.Body>
                                <Card.Text className="checkout-right d-flex mb-4">
                                <div className="tick">
                                </div>
                                <div className="d-flex flex-column ml-4">
                                    <span>Your order qualifies for <b>FREE Delievry</b>.</span>
                                    <Link>Restrictions apply</Link>
                                </div>
                                </Card.Text>
                                <Card.Title className="mb-1">SubTotal ({this.state.cart && this.state.cart.total} {this.state.cart && this.state.cart.total === 1?"item":"items"}): <b>€{this.state.cart && this.state.cart.totalPrice }</b></Card.Title>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="This order contains a gift" />
                                    </Form.Group>
                                <Button onClick={(e) => this.checkOut()} className="checkout-btn w-100 p-1 mb-3">Proceed to Checkout</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>                               
            </Container>
        );
    }
}

export default Cart;