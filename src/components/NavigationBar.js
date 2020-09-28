import React, {Component} from 'react';
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faUser} from "@fortawesome/free-solid-svg-icons";

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state={
            currentKhatabookName:"Khatabooks"
        }
    }

    logout() {
        localStorage.clear();
        window.location.href = "http://localhost:3000/";
    }

    render() {
        var khatabookNames = this.props.khatabookList.map((item) =>
            <NavDropdown.Item onClick={()=>{
                this.props.khatabookIdHandler(item.id);
                this.setState({
                    currentKhatabookName:item.name
                });

            }}>{item.name}
                <NavDropdown.Divider/>
            </NavDropdown.Item>
        );
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">KHATABOOK</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link"><FontAwesomeIcon icon={faPlus}/> Add Khatabook</Nav.Link>
                            <NavDropdown title={this.state.currentKhatabookName} id="basic-nav-dropdown">
                                {khatabookNames}
                            </NavDropdown>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        &nbsp;<Button variant="warning" onClick={() => {
                        this.logout()
                    }}><FontAwesomeIcon icon={faUser}/> Logout</Button>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;