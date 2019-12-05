import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class Navigationbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logedIn: false,
            myUserId: 1,
            myUsername: 'Michael',
        }
    }

    render() {
        return (
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="/">Location-APP</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/users">Users</Nav.Link>
                    <Nav.Link href={'/locations/' + this.state.myUserId}>My locations</Nav.Link>
                </Nav>
                {this.state.logedIn === false &&
                <Nav className="">
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
                }
                {this.state.logedIn &&
                <Nav>
                    <span className="text-white">Hallo {this.state.myUsername}</span>
                </Nav>
                }
            </Navbar>
        );
    }
}

export default Navigationbar;