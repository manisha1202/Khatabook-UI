import React,{Component} from 'react';
import './App.css';
import {BrowserRouter as Router,
        Switch,
        Route
       } from "react-router-dom";
import Home from "./components/auth/Home";
import Dashboard from "./components/Dashboard";
import Protected from "./components/Protected";
import Logout from "./components/auth/Logout";

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/logout">
                    <Logout />
                </Route>
                <Route path="/dashboard">
                    <Protected cmp={Dashboard}/>
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
