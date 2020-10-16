import React, {Component} from "react";
import NavigationBar from "./NavigationBar";
import {Button} from "react-bootstrap";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AddCustomer from "./AddCustomer";
import Balance from "./Balance";
import CustomerList from "./CustomerList";
import AddTransaction from "./AddTransaction";


export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            khatabookId: null
        }
        this.populateData = this.populateData.bind(this);
        this.handleModalTrigger = this.handleModalTrigger.bind(this);
    }

    handleModalTrigger() {
        this.setState({
            show: !this.state.show
        })
    }


    populateData(id) {
        localStorage.removeItem("khatabookId");
        localStorage.setItem("khatabookId", id);
        this.setState({
            khatabookId: id
        });
    }

    render() {
        let userPhNum = JSON.parse(localStorage.getItem('auth')).phone_number;
        return (
            <div>
                <NavigationBar khatabookIdHandler={this.populateData} userPhNum={userPhNum}
                               handleKhatabookModalTrigger={this.handleModalTrigger} show={this.state.show}/>
                {
                    this.state.khatabookId !== null ?
                        (<div>
                            <Balance khatabookId={this.state.khatabookId}/>
                            <hr/>
                            <CustomerList khatabookId={this.state.khatabookId}/>
                            <br/>
                            <Button variant="danger" onClick={() => {
                                this.handleModalTrigger()
                            }}><FontAwesomeIcon icon={faPlus}/> Add Customer</Button>
                            {this.state.show && <AddCustomer khatabookId={this.state.khatabookId} handleModalTrigger={
                                this.handleModalTrigger} show={this.state.show}/>
                            }
                        </div>)
                        : (<div className="mb-2 text-muted">Please select the khatabook.</div>)
                }
            </div>
        );
    }
}
