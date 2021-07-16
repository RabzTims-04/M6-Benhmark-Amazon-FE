import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap"

const {REACT_APP_BACKEND_URL} = process.env
class Cart extends Component {

url = `${REACT_APP_BACKEND_URL}/cart`

state={
    cart:[]
}

componentDidMount = () =>{
    this.fetchCart()
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
    render() {
        return (
            <Container className="mt-5">
                <span><b>Total Products: </b> {this.state.cart && this.state.cart.total }</span>
                <span className="ml-5"><b>Total Price: </b> {this.state.cart && this.state.cart.totalPrice }</span>
                
                    
                    {this.state.cart.products && this.state.cart.products.map( c => 
                                                   <Row className="mt-5">
                                                        <p><b>Name:</b> {c.product.name}</p>
                                                        <hr/>
                                                        <p><b>Price:</b> {c.product.price}</p>
                                                        <hr/>
                                                        <p><b>Quantity:</b> {c.quantity}</p>
                                                        <hr/>
                                                        <p><b>Total:</b> {c.total}</p>
                                                    </Row>
                        )}
                    

                               
            </Container>
        );
    }
}

export default Cart;