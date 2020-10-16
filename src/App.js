import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/auth/Home";
import Dashboard from "./components/Dashboard";
import Protected from "./components/Protected";
import Logout from "./components/auth/Logout";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/logout">
                        <Logout/>
                    </Route>
                    <Route exact path="/dashboard">
                        <Protected cmp={Dashboard}/>
                    </Route>
                    <Route path="/dashboard/transaction">
                        <Protected cmp={TransactionList}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
