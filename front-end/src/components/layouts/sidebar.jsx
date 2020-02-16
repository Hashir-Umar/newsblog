import React from "react";
import {Navbar, Button, Nav} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBlog} from "@fortawesome/free-solid-svg-icons";

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar
                bg="light" className="navbar shadow-sm mb-3 bg-white rounded" expand>
                <Button variant="outline-info">
                    <FontAwesomeIcon icon={faBlog}/>
                    <span className="ml-2">Blog</span>
                </Button>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto" navbar>

                        {this.props.navList.map((nav, index) =>
                            <Nav.Link key={index} href="#">{nav}</Nav.Link>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}