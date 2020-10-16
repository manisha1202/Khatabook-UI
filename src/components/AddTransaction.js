import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


class AddTransaction extends Component {
    constructor() {
        super();
        this.state = {
            startDate: new Date(),
            setStartDate: new Date(),
            amount: 0.0,
            description: "",
            customerId: localStorage.getItem('customerId'),
            khatabookId: localStorage.getItem('khatabookId')
        }
    }

    submit() {
        console.log(this.state.setStartDate + "," + this.state.amount + "," + this.props.value + ","
            + this.state.description + "," +this.state.customerId+","+this.state.khatabookId);
        fetch('http://localhost:8080/addTransaction', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date: this.state.startDate,
                amount: this.state.amount,
                type: this.props.value,
                description: this.state.description,
                customerId: this.state.customerId,
                khatabookId: this.state.khatabookId
            })
        }).then((response) => {
        })
        this.props.handleModalTrigger();
    }

    setStartDate(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <div>
                <Modal id="addTransactionModal" show={this.props.show} onHide={() => {
                    this.props.handleModalTrigger()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>You {this.props.value} &#8377;{this.state.amount} to {this.state.customerId}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Enter amount</label><br/>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({
                                       amount: event.target.value
                                   })
                               }}
                               required
                        /><br/><br/>
                        <label>Enter details (Item Name, Bill No, Quantity...)</label><br/>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({
                                       description: event.target.value
                                   })
                               }}
                               required
                        /><br/><br/>
                        <FontAwesomeIcon icon={faCalendarAlt} color="red" size="2x"/>&nbsp;&nbsp;
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={this.state.startDate}
                            onChange={date => this.setStartDate(date)}
                            calendarClassName="rasta-stripes"
                        />
                        <br/><br/>
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

export default AddTransaction;