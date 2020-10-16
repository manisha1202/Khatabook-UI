import React, {Component} from 'react';
import {ListGroup} from "react-bootstrap";
import {Redirect} from "react-router-dom";

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
            isRedirect: false
        }
    }

    getDetail() {
        alert("details");
    }

    componentWillMount() {
        fetch('http://localhost:8080/customerList', {
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
                //console.log("zero");
                this.setState({
                    customerList: res.customers
                });
            })

        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        fetch('http://localhost:8080/customerList', {
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
                //console.log("zero");
                this.setState({
                    customerList: res.customers
                });
            })

        })
    }

    render() {
        if (this.state.isRedirect) {
            return <Redirect to={"/dashboard/transaction"}/>
        }
        var customersList = this.state.customerList.map((item) =>
            // <ListGroup.Item>
                <ListGroup horizontal onClick={() => {
                    localStorage.removeItem("customerId");
                    localStorage.setItem("customerId", item.id);
                    this.setState({
                        isRedirect: true
                    });
                }}>
                    <ListGroup.Item className="borderless" action variant="warning">{item.name}</ListGroup.Item>
                    <ListGroup.Item action variant="warning">&#8377; {item.amount}</ListGroup.Item>
                </ListGroup>

            // </ListGroup.Item>
        );
        return (

            <div>
                <ListGroup className="list-group-item">
                    {customersList}
                </ListGroup>
            </div>
        );
    }
}

export default CustomerList;