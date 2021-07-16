import React, { Component } from 'react';
import {Navbar, Nav } from 'react-bootstrap'
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
                        <Nav className="ml-auto">
                            <Link className="navLink nav-link" to="/">
                            <img alt="AF" src="https://images-eu.ssl-images-amazon.com/images/G/03/MOZART/AMAZON-FASHION/2018/09_SEPT/SMWS_400X39-SEPTMERCH18_CB470776138_._CB483511684_.png" className=""/>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
        );
    }
}

export default withRouter(SecondNavBar)