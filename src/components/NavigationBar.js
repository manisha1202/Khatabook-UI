import React, {Component} from 'react';
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state={
            khatabookList:[]
        }
    }
    getData() {
        let data=JSON.parse(localStorage.getItem('auth'));
        console.log(data.contact);
        fetch('http://localhost:8080/khatabooks', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data.contact)
        }).then((response) =>{
            response.json().then((res) => {
                this.setState({
                    khatabookList:res
                });
            })
        })
    }
    getRecords(item){
        let data=JSON.parse(localStorage.getItem('auth'));
        fetch('http://localhost:8080/records', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                khatabookName:item,
                user_phone_number:JSON.stringify(data.contact)
            })
        }).then((response) =>{
            response.json().then((res) => {

            })
        })
    }
    logout(){
        localStorage.clear();
        window.location.href="http://localhost:3000/";
    }

    render() {
        var khatabookNames=this.state.khatabookList.map((item)=>
                <NavDropdown.Item >{item}
                <NavDropdown.Divider onClick={()=>{this.getRecords(item)}}/>
                </NavDropdown.Item>

        );
        return (

            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">KHATABOOK</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="All" id="basic-nav-dropdown" onClick={()=> this.getData()}>
                                {khatabookNames}
                            </NavDropdown>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        &nbsp;<Button variant="warning" onClick={()=>{this.logout()}}><FontAwesomeIcon icon={faUser}/> Logout</Button>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;