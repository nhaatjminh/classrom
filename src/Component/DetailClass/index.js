
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
            timeCreate: "",
            linkInvite: ""
        });
    const [loadFirst, setLoadFirst] = useState(true);
    const [inviteLinkStudent, setInviteLinkStudent] = useState();
    const [inviteLinkTeacher, setInviteLinkTeacher] = useState();
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
    const getInviteLink = async (id,role) => { //truyen role vo day nhe bro
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        await fetch("http://best-classroom-ever-api.herokuapp.com/classes/invitelink/" + id + "/" + role, requestOptions)
        // await fetch("http://localhost:5000/classes/invitelink/" + id + "/" + role, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("into")
            if (role === 'teacher') {
                setInviteLinkTeacher(result);
            } else if (role === 'student') {
                setInviteLinkStudent(result);
            }
        })
        .catch(error => {
            console.log('error', error);
        });
    }
    if (loadFirst) {
        getInviteLink(params.id, 'student');
        getInviteLink(params.id, 'teacher');
        setLoadFirst(false);
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

                <div className="container-fluid mt-5">
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
                    <div className="mt-3">
                        <div className="col-12">
                            Link Invite Student: {inviteLinkStudent}
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="col-12">
                            Link Invite Teacher: {inviteLinkTeacher}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            A
                        </div>
                        <div className="col-3">
                        B
                        </div>
                    </div>
                </div>
            </div>
        
        )
}
export default DetailClass;