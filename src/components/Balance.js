import React, {Component} from 'react';
import {Button, Card} from "react-bootstrap";

class Balance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            credit:0.0,
            debit:0.0
        }
    }
    youGive(){
        alert("Your money is going!!!")
    }
    youGet(){
        alert("Money is coming to you!!!")
    }
    componentWillMount() {
        console.log("balance will mount"+this.props.khatabookId);
        fetch('http://localhost:8080/balance', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.props.khatabookId
            })
        }).then((response) => {
            response.json().then((res) => {
                this.setState({
                    credit:res.credit,
                    debit:res.debit
                });
            })
        })
    }

    componentWillReceiveProps(nextProps,nextContext) {
        console.log("balance will recieve"+nextProps.khatabookId);
        fetch('http://localhost:8080/balance', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: nextProps.khatabookId
                })
            }).then((response) => {
                response.json().then((res) => {
                    console.log(res.credit+" , "+res.debit);
                    this.setState({
                        credit:res.credit,
                        debit:res.debit
                    });
                })
            })
    }

    render() {
        console.log("balance render: "+this.props.khatabookId);
        return (
            <div>
                <div className="row" id="wrap">
                    <div className="col" id="left">
                        <Card
                            bg="danger"
                            style={{ width: '18rem',
                            }}
                            text="white"
                            className="mb-2">
                            <Card.Body onClick={()=>{this.youGive()}} >
                                <Card.Title>&#8377; {this.state.debit}</Card.Title>
                                <Card.Subtitle className="mb-2 text">You will give</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col" id="right">
                        <Card
                            bg="success"
                            style={{ width: '18rem'
                                }}
                            text="white"
                            className="mb-2">
                            <Card.Body onClick={()=>{this.youGet()}} >
                                <Card.Title>&#8377; {this.state.credit}</Card.Title>
                                <Card.Subtitle className="mb-2 text">You will get</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <Button variant="primary">View REPORT</Button>
            </div>
        );
    }
}

export default Balance;