import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"


const Navigation = () => {



    return (

        <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="myNavBar">
            <Container>
                <Navbar.Brand href="#home">Welcome</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavLink to="/" className="navLink" style={({ isActive }) => {
                            return {
                                color: isActive ? "red" : "white"
                            }
                        }}
                        >Home</NavLink>
                        <NavLink to="/addPost" className="navLink" style={({ isActive }) => {
                            return {
                                color: isActive ? "red" : "white"
                            }
                        }}
                        >AddPost</NavLink>
                        <NavLink to="/convert" className="navLink" style={({ isActive }) => {
                            return {
                                color: isActive ? "red" : "white"
                            }
                        }}
                        >Convert</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation