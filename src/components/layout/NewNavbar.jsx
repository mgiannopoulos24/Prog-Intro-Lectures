import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap'; 
import { ThemeContext } from '../buttons/ThemeContext';
import './NewNavbar.css';

const NewNavbar = () => {
    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <Navbar 
            bg={isDarkTheme === 'true' ? 'dark' : 'light'} 
            variant={isDarkTheme === 'true' ? 'dark' : 'light'} 
            expand="lg" 
            className="fluid"
        >
            <Container fluid>
                <Navbar.Brand href="/">Prog Intro Lectures</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Quizzes">Quizzes</Nav.Link>
                        <Nav.Link href="/CodeChallenges">Code Challenges</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NewNavbar;
