import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";

class AddKhatabook extends Component {
    constructor(props) {
        super(props);
        this.state={
            khatabookName:""
        }
    }
    submit(){
        console.log("name: "+this.state.khatabookName);
        fetch('http://localhost:8080/addKhatabook', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                khatabookName:this.state.khatabookName,
                userPhoneNumber:JSON.parse(localStorage.getItem('auth')).phone_number,
                credit:0,
                debit:0
            })
        }).then((response) => {
            // response.json().then((res) => {
            //     //console.log(res);
            // })
        });
        this.props.handleKhatabookModalTrigger();
    }
    render() {
        return (
            <div>
                <Modal id="addKhatabookModal" show={this.props.show} onHide={() => {
                    this.props.handleKhatabookModalTrigger()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Khatabook</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Khatabook Name</label><br/>
                        <input type="text"
                               onChange={(event) => {
                                   this.setState({
                                       khatabookName: event.target.value
                                   })
                               }}
                               required
                        /><br/><br/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            this.submit()
                        }}>Save</Button>{' '}&nbsp;
                        <Button variant="secondary" onClick={() => {
                            this.props.handleKhatabookModalTrigger()
                        }}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default AddKhatabook;