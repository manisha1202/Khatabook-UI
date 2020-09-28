import React, {Component} from "react";
import NavigationBar from "./NavigationBar";
import {Button} from "react-bootstrap";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AddCustomer from "./AddCustomer";
import Balance from "./Balance";
import CustomerList from "./CustomerList";


export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            khatabookList: [],
            khatabookId:null
        }
        this.populateData=this.populateData.bind(this);
        this.handleModalTrigger=this.handleModalTrigger.bind(this);
    }

    handleModalTrigger() {
        this.setState({
            show: !this.state.show
        })
    }

    componentWillMount() {
        let data = JSON.parse(localStorage.getItem('auth'));
        fetch('http://localhost:8080/khatabooks', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"phone_number": data.phone_number})
        }).then((response) => {
            response.json().then((res) => {
                this.setState({
                    khatabookList: res.khatabooks
                });
            })
        })
    }
    populateData(id){
        localStorage.setItem("khatabookId",id);
        this.setState({
           khatabookId:id
        });
    }

    render() {
        console.log("dashboard: "+this.state.khatabookId);
        return (
            <div>
                <NavigationBar khatabookIdHandler={this.populateData} khatabookList={this.state.khatabookList}/>
                {
                    this.state.khatabookId!==null ?
                        ( <div>
                            <Balance khatabookId={this.state.khatabookId}/>
                            <hr/>
                            <CustomerList khatabookId={this.state.khatabookId}/>
                            <br/>
                            <Button variant="danger" onClick={() => {
                                this.handleModalTrigger()
                            }}><FontAwesomeIcon icon={faPlus}/> Add Customer</Button>
                            {this.state.show && <AddCustomer  khatabookId={this.state.khatabookId} handleModalTrigger={
                                this.handleModalTrigger} show={this.state.show}/>
                            }
                        </div>)
                        : (<div className="mb-2 text-muted">Please select the khatabook.</div>)
                }
            </div>
        );
    }
}
