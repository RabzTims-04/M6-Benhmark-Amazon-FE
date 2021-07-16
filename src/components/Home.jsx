import React, { Component } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Home extends Component {



    render() {

        return (

            <Container fluid className="mt-5">
                <Row>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <h4>{/* {product.name} */} <b>Harry Potter</b></h4>
                                <Card.Img variant="top" src="https://static.posters.cz/image/750/bilderharry-potter-deathly-hallows-part-1-i69611.jpg" />
                                <Card.Text>
                                    <span>{/* {product.price} */}</span>
                                    <p>{/* {product.brand} */}</p>
                                </Card.Text>
                                <Link to="/details/:id">
                                    See More
                                </Link>
                            </Card.Body>
                        </Card>

                    </Col>

                </Row>
                
            </Container>
        );
    }
}

export default Home;