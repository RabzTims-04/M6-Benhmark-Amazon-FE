import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import trash from "../assets/red-recycle-bin-icon-20.jpg"
import "./Home.css"

const {REACT_APP_BACKEND_URL} = process.env
class Home extends Component {

state={
    deleted:false,
    products:[]
}

url = `${REACT_APP_BACKEND_URL}/products`

componentDidMount = () => {
  this.fetchProducts()
}

componentDidUpdate = (prevProps) => {
    if(prevProps.search !== this.props.search){
        this.fetchProducts()
    }
    if(this.state.deleted){
        this.setState({
            ...this.state,
            deleted:false
        })
        this.fetchProducts()
    }
}

fetchProducts = async () => {
    try {
        const response = await fetch(!this.props.search.length ? this.url: `${this.url}?category=${this.props.search}` )
        const data = await response.json()
        console.log(data);
        if(response.ok){
            this.setState({
                products:data
            })
        }
    } catch (error) {
        console.log(error);
    }
}

deleteProduct = async (e) => {
    try {
        const response = await fetch(`${this.url}/${e.currentTarget.id}`,{
            method:"DELETE"
        })
        if(response.ok){
            alert("product deleted!!")
            this.setState({
                ...this.state,
                deleted:true
            })
        }
        else{
            console.log("error deleting product");
        }
    } catch (error) {
        console.log(error);
    }
}

    render() {

        return (

            <Container fluid className="mt-5">
                <Row>
                    {this.state.products && this.state.products.map( product => 
                        <Col className="" md={3} key={product.id}>
                        <Card style={{ width: '15rem', height:'20rem' }}>
                            <Card.Body>
                                <h4><b>{product.name}</b></h4>
                                <Card.Img style={{ width: '12rem', height:'13rem' }} className="img-fluid mb-4 pt-3" variant="top" src={product.imageUrl} />
                               <div className="d-flex">
                                <Link to={`/details/${product.id}`} >
                                        See More
                                    </Link>
                                    <Link className="ml-auto" >
                                        <img id={product.id} onClick={(e) => this.deleteProduct(e)} className="trash-can" src={trash} alt="delete-icon"/>
                                    </Link>
                               </div>
                            </Card.Body>
                        </Card>

                    </Col>
                    )}

                </Row>
                
            </Container>
        );
    }
}

export default Home;