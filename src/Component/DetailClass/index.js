
import React, { Component} from 'react';
import { NavLink } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from "react-bootstrap"
import './index.css'
export default class DetailClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ""
        }  
    }
    getDetail = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        fetch("https://best-classroom-ever-api.herokuapp.com/classes/detail/" + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({
                data: result
            })
        })
        .catch(error => {
            console.log('error', error);
            this.logout();
        });
    }
    render(){
        this.getDetail(this.props.detailClassID);
        return(
            <div>
                
                <Navbar bg="dark" variant="dark">
                    
                    <button className="btn btn-success backbtn" onClick={this.props.backToList}> Back </button>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <NavLink className="nav-link" to="#" >
                        Detail
                    </NavLink>
                    <NavLink className="nav-link" to="/" >
                        People
                    </NavLink>
                    </Navbar.Collapse>
                </Navbar>

                <div className="container mt-5">
                    <h1 className="text-center">
                        Class: {this.state.data.name}
                    </h1>
                    <div className="mt-3">
                        ID: {this.state.data.id}
                    </div>
                    <div className="mt-3">
                        Class: {this.state.data.name}
                    </div>
                    <div className="mt-3">
                        Creator: {this.state.data.creator}
                    </div>
                    <div className="mt-3">
                        Description: {this.state.data.description}
                    </div>
                </div>
            </div>
        
        )
    }
}