import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";
import {Redirect} from "react-router-dom";

class Home extends Component {

    constructor() {
        super();
        this.state = {
            phone_number: null,
            password: null,
            isRegister: false,
            token: null
        }
    }

    login() {
        fetch('http://localhost:8080/login', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then((response) =>
            response.text()).then((res) => {
            console.log("abc: " + this.state.phone_number);
            if (res.length > 0) {
                localStorage.setItem("auth", JSON.stringify({
                    token: res,
                    phone_number: this.state.phone_number
                }));
                console.log("yes");
                this.setState({
                    token: res
                });
            } else {
                alert("Invalid credentials");
            }
        })
    }

    register() {
        fetch('http://localhost:8080/register', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then((response) => {
            response.json().then((res) => {
                console.log(res);
            })

        })
    }

    render() {
        let auth = JSON.parse(localStorage.getItem('auth'));
        return (
            <div>
                {
                    auth ? <Redirect to={"/dashboard"}></Redirect> : null
                }
                <div className="header">KHATABOOK</div>
                <br/>

                {
                    !this.state.isRegister ?
                        <div>
                            <h5>Login</h5>
                            <Form>
                                <input
                                    type="text"
                                    placeholder="Contact No."
                                    onChange={(event) => {
                                        this.setState({
                                            phone_number: event.target.value
                                        })
                                    }}
                                    required
                                /><br/><br/>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(event) => {
                                        this.setState({
                                            password: event.target.value
                                        })
                                    }}
                                    required
                                /><br/>
                                <a href="www.google.com">Forgot Password</a><br/><br/>
                                <Button type="submit" onClick={() => {
                                    this.login()
                                }}>Submit</Button>
                                <h6>OR</h6>
                                <p> Create new Account</p>
                                <Button type="submit" onClick={() => {
                                    this.setState({isRegister: true})
                                }}>Register</Button>
                            </Form>
                        </div>
                        :
                        <div>
                            <h5>Register</h5>
                            <Form>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    onChange={(event) => {
                                        this.setState({
                                            user_name: event.target.value
                                        })
                                    }}
                                /><br/><br/>
                                <input
                                    type="text"
                                    placeholder="Contact No."
                                    onChange={(event) => {
                                        this.setState({
                                            phone_number: event.target.value
                                        })
                                    }}
                                /><br/><br/>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(event) => {
                                        this.setState({
                                            password: event.target.value
                                        })
                                    }}
                                /><br/><br/>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    onChange={(event) => {
                                        this.setState({
                                            email: event.target.value
                                        })
                                    }}
                                /><br/><br/>
                                <Form.Group>
                                    <Form.File id="exampleFormControlFile1" label="Add Profile photo"/>
                                </Form.Group>
                                <Button type="submit" onClick={() => {
                                    this.register()
                                }}>Register</Button>
                                <p>OR</p>
                                <h6>Already have an account?</h6>
                                <Button type="submit" onClick={() => {
                                    this.setState({isRegister: false})
                                }}>Login</Button>
                            </Form>
                        </div>
                }
            </div>
        );
    }
}

export default Home;
