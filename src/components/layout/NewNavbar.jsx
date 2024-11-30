import React, { useState, useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardTab from "@mui/icons-material/KeyboardTab";
import { ThemeContext } from "../buttons/ThemeContext";
import "./styles/NewNavbar.css";

const NewNavbar = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  // State for managing the drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Toggle drawer open/close
  const toggleDrawer = (open) => () => setIsDrawerOpen(open);

  // Drawer content
  const drawerContent = (
    <div className="drawer-content">
      <KeyboardTab
        className="drawer-close"
        onClick={toggleDrawer(false)}
        style={{ cursor: "pointer", margin: "1rem" }}
      />
      <Nav className="flex-column">
        <Nav.Link href="/Quizzes">Quizzes</Nav.Link>
        <Nav.Link href="/CodeChallenges">Code Challenges</Nav.Link>
        <Nav.Link href="/Labs">Labs</Nav.Link>
        <Nav.Link href="/Uoabot">Uoabot</Nav.Link>
      </Nav>
    </div>
  );

  return (
    <Navbar
      bg={isDarkTheme === "true" ? "dark" : "light"}
      variant={isDarkTheme === "true" ? "dark" : "light"}
      expand="lg"
      className="fluid"
    >
      <Container fluid>
        <Navbar.Brand href="/">Prog Intro Lectures</Navbar.Brand>

        <div className="d-lg-none">
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon id="burger"/>
          </IconButton>
        </div>

        <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-flex">
          <Nav className="me-auto">
            <Nav.Link href="/Quizzes">Quizzes</Nav.Link>
            <Nav.Link href="/CodeChallenges">Code Challenges</Nav.Link>
            <Nav.Link href="/Labs">Labs</Nav.Link>
            <Nav.Link href="/Uoabot">Uoabot</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          {drawerContent}
        </Drawer>
      </Container>
    </Navbar>
  );
};

export default NewNavbar;