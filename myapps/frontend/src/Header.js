import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import logo from './logo.svg';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">
                <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
            Test Application
            </Navbar.Brand>
            </Container>
        </Navbar>
    )
};

export default Header;