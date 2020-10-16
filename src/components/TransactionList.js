import React, {Component} from 'react';
import {ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AddTransaction from "./AddTransaction";

class TransactionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionList: [],
            state:false
        }
        this.handleDebitModalTrigger = this.handleDebitModalTrigger.bind(this);
        this.handleCreditModalTrigger = this.handleCreditModalTrigger.bind(this);
    }

    componentWillMount() {
        let customerId = localStorage.getItem('customerId');
        let khatabookId = localStorage.getItem('khatabookId');
        //console.log(customerId + "...." + khatabookId);
        fetch('http://localhost:8080/transactions', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                customerId: customerId,
                khatabookId: khatabookId
            })
        }).then((response) => {
            response.json().then((res) => {
                this.setState({
                    transactionList: res.transactions
                });
            })

        })
    }

    onBackButtonEvent(e) {
        console.log("calling back button");
        e.preventDefault();
        this.goBack();
    }

    componentDidMount() {
        window.onpopstate = this.onBackButtonEvent;
    }
    handleDebitModalTrigger() {
        this.setState({
            showDebit: !this.state.showDebit
        })
    }

    handleCreditModalTrigger() {
        this.setState({
            showCredit: !this.state.showCredit
        })
    }

    render() {
        var transactionList = this.state.transactionList.map((item) =>

            // <ListGroup.Item>
                <ListGroup horizontal>
                    <ListGroup.Item className="borderless" action variant="warning">{item.date}</ListGroup.Item>
                    <ListGroup.Item className="borderless" action variant="warning">{item.description}</ListGroup.Item>
                    {item.type==="debit"?[
                        <ListGroup.Item action variant="warning">&#8377; {item.amount}</ListGroup.Item>,
                        <ListGroup.Item action variant="warning">{}</ListGroup.Item>
                    ]:[
                        <ListGroup.Item action variant="warning">{}</ListGroup.Item>,
                        <ListGroup.Item action variant="warning">&#8377; {item.amount}</ListGroup.Item>
                    ]}

                </ListGroup>

            // </ListGroup.Item>
        );
        return (
            <div>
                {/*transaction list-date time desc credit debit*/}
                <ListGroup className="list-group-item">
                    <ListGroup horizontal>
                        <ListGroup.Item className="borderless" action variant="warning">Date</ListGroup.Item>
                        <ListGroup.Item className="borderless" action variant="warning">Description</ListGroup.Item>
                        <ListGroup.Item action variant="warning">Debit</ListGroup.Item>
                        <ListGroup.Item action variant="warning">Credit</ListGroup.Item>
                    </ListGroup>
                </ListGroup>
                <ListGroup className="list-group-item">
                    {transactionList}
                </ListGroup>
                {/*   2 buttons:- you gave(red)/you got(green)*/}
                <br/><br/>
                <div className="row" id="wrap">
                    <div className="col" id="left">
                        <Button variant="danger" onClick={() => {
                            this.handleDebitModalTrigger()
                        }}>You Gave</Button>
                        {this.state.showDebit && <AddTransaction handleModalTrigger={
                            this.handleDebitModalTrigger} show={this.state.showDebit} value="debit"/>
                        }
                    </div>
                    <div className="col" id="right">
                        <Button variant="success" onClick={() => {
                            this.handleCreditModalTrigger()
                        }}>You got</Button>
                        {this.state.showCredit && <AddTransaction handleModalTrigger={
                            this.handleCreditModalTrigger} show={this.state.showCredit} value="credit"/>
                        }
                    </div>
                </div>


            </div>
        );
    }
}

export default TransactionList;