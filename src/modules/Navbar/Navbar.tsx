import React from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavbarApp = () => {
   
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                    >
                        <NavLink
                            className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
                            to="/">Home</NavLink>
                        <NavLink
                            className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
                            to="/contact">contact</NavLink>
                    </Nav>
                    <Form className="d-flex align-items-center">
                        <img
                            className="image-logo"
                            src='https://www.web3.ca/wp-content/uploads/web3-logo-favicon.png'
                            alt='logo' />
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarApp