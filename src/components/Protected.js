import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

function Protected(props) {
    const Cmp=props.cmp;
    let auth=JSON.parse(localStorage.getItem('auth'));
    let tk=auth.token;
    //console.log(localStorage.getItem('token'));
    return <div>{tk ? <Cmp/>:<Redirect to={"/"} ></Redirect>}</div>
}

export default Protected;