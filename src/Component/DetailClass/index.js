
import React, { Component} from 'react';
import { NavLink } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from "react-bootstrap"
import './index.css'
export default class Classroom extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }
    render(){
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
                        Class: {this.props.dataDetail.name}
                    </h1>
                    <div className="mt-3">
                        ID: {this.props.dataDetail.id}
                    </div>
                    <div className="mt-3">
                        Class: {this.props.dataDetail.name}
                    </div>
                    <div className="mt-3">
                        Creator: {this.props.dataDetail.creator}
                    </div>
                    <div className="mt-3">
                        Description: {this.props.dataDetail.description}
                    </div>
                </div>
            </div>
        
        )
    }
}