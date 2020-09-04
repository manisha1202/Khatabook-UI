import React,{Component} from "react";
import NavigationBar from "./NavigationBar";
import {Button} from "react-bootstrap";


export default class Dashboard extends Component {
    constructor(props) {
        super();

    }



    render() {

        return (
            <div >
                <NavigationBar />
                {/*<Button onClick={() => {*/}
                {/*    this.getData()*/}
                {/*}}>getKhatabookList</Button>*/}
            </div>
        );
    }
}
