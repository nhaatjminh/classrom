
import React, { useState} from 'react';
import { NavLink, useParams} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from "react-bootstrap"
import './index.css'
const DetailClass = () => {
    const [data, setData] = useState({
            creator: "",
            description: "",
            id: -1,
            name: "",
            timeCreate: "" 
        });
    let params = useParams();
    const getDetail = async (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        await fetch("https://best-classroom-ever-api.herokuapp.com/classes/detail/" + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            setData({
                creator: result.creator,
                description: result.description,
                id: result.id,
                name: result.name,
                timeCreate: result.timeCreate 
            })
        })
        .catch(error => {
            console.log('error', error);
        });
    }
    getDetail(params.id);
    return(
            <div>
                
                <Navbar bg="dark" variant="dark">
                    
                    {/* <button className="btn btn-success backbtn" onClick={this.props.backToList}> Back </button> */}
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
                        Class: {data.name}
                    </h1>
                    <div className="mt-3">
                        ID: {data.id}
                    </div>
                    <div className="mt-3">
                        Class: {data.name}
                    </div>
                    <div className="mt-3">
                        Creator: {data.creator}
                    </div>
                    <div className="mt-3">
                        Description: {data.description}
                    </div>
                </div>
            </div>
        
        )
}
export default DetailClass;