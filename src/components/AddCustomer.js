import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";

class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer_Name: "",
            phone_Number: "",
            amount: 0,
            type:"credit"
        }
    }

    submit() {
        fetch('http://localhost:8080/addCustomer', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                khatabookId:this.props.khatabookId,
                customerName:this.state.customer_Name,
                phoneNumber:this.state.phone_Number,
                amount:this.state.amount,
                type:this.state.type
            })
        }).then((response) => {
            // response.json().then((res) => {
            //     //console.log(res);
            // })
            //window.location.href = "http://localhost:3000/dashboard";
        });
        this.props.handleModalTrigger();
    }

    render() {
        console.log("addcustomer render: "+this.props.khatabookId);
        return (
            <div>
                <Modal id="addCustomerModal" show={this.props.show} onHide={() => {
                    this.props.handleModalTrigger()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Customer Name</label><br/>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({
                                       customer_Name: event.target.value
                                   })
                               }}
                               required
                        /><br/><br/>
                        <label>Customer Phone No.</label><br/>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({
                                       phone_Number: event.target.value
                                   })
                               }}
                               required
                        /><br/><br/>
                        <label>Loan Amount</label><br/>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({
                                       amount: event.target.value
                                   })
                               }}
                               defaultValue="&#8377; 0.0"
                               readOnly
                               required
                        /><br/><br/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            this.submit()
                        }}>Save</Button>{' '}&nbsp;
                        <Button variant="secondary" onClick={() => {
                            this.props.handleModalTrigger()
                        }}>Cancel</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default AddCustomer;