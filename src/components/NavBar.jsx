import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown, Button, Form, FormControl, InputGroup} from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import "./NavBar.css"

class NavBar extends Component {
    render() {
        return (
                <Navbar className="pr-0 mr-0" collapseOnSelect expand="lg" id="navbar">
                    <Navbar.Brand as={Link} to="/">
                        <img 
                        className="amazon-logo"
                        src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
                        alt="logo"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="">
                            <Link className="nav-link ml-4" id="nav-one" to="/">
                                
                            </Link>
                            <Link className="nav-link" id="nav-two" to="/">
                                <div className="text-sm" style={{color:"#CCCCC1", fontSize:"0.9em"}}>
                                    Hello
                                </div>
                                <div>
                                    <b>Select your address</b>
                                </div>
                            </Link>

                        </Nav>
                        <InputGroup className="search-field ml-3">
                            <InputGroup.Prepend >
                            <InputGroup.Text id="basic-addon3"> 
                                <NavDropdown id="search-drop" title="All">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>                               
                            </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="basic-url" placeholder="search" aria-describedby="basic-addon3" />
                            <InputGroup.Append>
                                <Button className="search-button"><svg className="search-svg" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></Button>
                            </InputGroup.Append>
                        </InputGroup>

                        <NavDropdown className="flag flag-dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>

                        <Link className=" ml-3 p-0" id="nav-two" to="/signIn" >
                            <div as={Link} to="/signIn" className="text-sm ml-3" style={{color:"white", fontSize:"0.9em"}}>
                                  Hello, Sign in
                            </div>
                            <div>
                                 <NavDropdown title="Account & Lists" style={{fontWeight:"bold", textDecoration:"none"}}>
                                     <NavDropdown.Item as={Link} to="/signIn" >Register</NavDropdown.Item>
                                     <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                     <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                     <NavDropdown.Divider />
                                     <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </Link>

                        <Link className="nav-link" id="nav-two" to="/">
                            <div className="text-sm" style={{color:"white", fontSize:"0.9em"}}>
                                 Returns
                            </div>
                            <div>
                                <b>& Orders</b>
                            </div>
                        </Link>

                        <Link className="total-cart"  to="/cart">
                                <span className="shop-cart"></span>
                                <b className="cart-count">0</b>
                        </Link>

                        <Link className="nav-link ml-0 pl-2 mr-0 pr-0" id="nav-two" to="/cart">
                            <div className="text-sm" style={{color:"white", fontSize:"0.9em"}}>
                                 Shopping-
                            </div>
                            <div>
                                <b>Basket</b>
                            </div>
                        </Link>
                    </Navbar.Collapse>
                </Navbar>
        );
    }
}

export default withRouter(NavBar)