import React, {Component} from 'react';
import {ListGroup} from "react-bootstrap";

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList: []
        }
    }

    getDetail() {
        alert("details");
    }
    componentWillMount() {
         // console.log("customer list will: "+this.props.khatabookId);
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
                //console.log(JSON.stringify(res));
            })

        })
    }

    componentWillReceiveProps(nextProps,nextContext){
         // console.log("customer list recieve: "+this.props.khatabookId);
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
        // console.log("customer list render: "+this.props.khatabookId);
        var customersList = this.state.customerList.map((item) =>
            <ListGroup.Item onClick={() => {
                this.getDetail()
            }}>
                <ListGroup horizontal>
                    <ListGroup.Item className="borderless" action variant="warning">{item.name}</ListGroup.Item>
                    <ListGroup.Item action variant="warning">&#8377; {item.amount}</ListGroup.Item>
                    {/*<ListGroup.Item action variant="warning">{item.date}</ListGroup.Item>*/}
                </ListGroup>
            </ListGroup.Item>
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