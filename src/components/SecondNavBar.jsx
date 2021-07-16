import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import "./NavBar.css"

class SecondNavBar extends Component {
    render() {
        return (
                <Navbar collapseOnSelect expand="lg" id="secondnavbar">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="">
                            <Link className="navLink nav-link ml-4 hm-icon"  to="/">
                               
                            </Link>
                            <Link className="navLink nav-link"  to="/">
                                <b>All</b>
                            </Link>
                            <Link className="navLink nav-link"  to="/">
                                Best Sellers
                            </Link>
                            <Link className="navLink nav-link"  to="/">
                                Amazon Basics
                            </Link>
                            <Link className="navLink nav-link"  to="/">
                                New Releases
                            </Link>
                            <Link className="navLink nav-link"  to="/">
                                Customer Service
                            </Link>
                            <Link className="navLink nav-link"  to="/">
                                Prime
                            </Link>
                            {/* <Link id="nav-drop" className="navLink nav-link"  to="/">
                            <NavDropdown className="navLink" title="Prime" id="collasible-nav-dropdown">
                                <NavDropdown.Item >Action</NavDropdown.Item>
                                <NavDropdown.Item >Another action</NavDropdown.Item>
                                <NavDropdown.Item >Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item >Separated link</NavDropdown.Item>
                            </NavDropdown>
                            </Link> */}
                            <Link className="navLink nav-link"  to="/">
                                Prime Video
                            </Link>
                            <Link className="navLink nav-link"  to="/">
                                Books
                            </Link>
                            <Link className="navLink nav-link"  to="/newProduct">
                                Add Products
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
        );
    }
}

export default withRouter(SecondNavBar)