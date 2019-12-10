import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import AuthentificationService from "../authentication/AuthentificationService";

class Navigationbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logedIn: false,
        }
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Navbar.Brand href="#home">Location-App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    {AuthentificationService.isUserLogedIn() &&
                    <Nav className="mr-auto">
                        <Nav.Link href="/users">Users</Nav.Link>
                        <Nav.Link href={'/locations/' + this.state.myUserId}>My locations</Nav.Link>
                    </Nav>
                    }
                    {AuthentificationService.isUserLogedIn() &&
                    <Nav>
                        <Nav.Link href="/login"><span onClick={this.logout}>Logout</span></Nav.Link>
                    </Nav>
                    }
                    {!AuthentificationService.isUserLogedIn() &&
                    <Nav className="mr-auto">
                        <Nav.Link href="#">Please login to see users and locations.</Nav.Link>
                    </Nav>
                    }
                    {!AuthentificationService.isUserLogedIn() &&
                    <Nav>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>
        );
    }

    logout = () => {
        AuthentificationService.logout();
    }
}

export default Navigationbar;