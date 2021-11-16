
import React, { useState} from 'react';
import { NavLink, useParams} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Modal } from "react-bootstrap"
import './index.css'
import SendIcon from '@mui/icons-material/Send';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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
    const [showDialog, setShowDialog] = useState(false);
    const [email, setEmail] = useState("");
    const [roleInvite, setRoleInvite] = useState("Student");
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

        await fetch("https://best-classroom-ever-api.herokuapp.com/classes/invitelink/" + id + "/" + role, requestOptions)
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

    const onHandleShow = () => {
        setShowDialog(true);
    }
    const onHandleClose = () => {
        setShowDialog(false);
    }
    const onChangeHandler = (e) => {
        setEmail(e.target.value);
    }
    const handleChange = (e) => {
        setRoleInvite(e.target.value);
    }

    const sendEmail = async (recipient, inviteLink, role) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "recipient": recipient,
            "inviteLink": inviteLink,
            "role": role
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch("http://localhost:5000/sendEmail", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw Error(response.status);
        })
        .then(result => {
            alert("Invitation was sent!");
            onHandleClose();
        })
        .catch(error => {
            alert("Fail to send invitation!");
            onHandleClose();
        });
    }

    

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        let link  = "";
        if (roleInvite == "student") {
            link = inviteLinkStudent
        }
        else {
            link = inviteLinkTeacher
        }

        await sendEmail(email, link, roleInvite);
    }

    if (loadFirst) {
        getInviteLink(params.id, 'student');
        getInviteLink(params.id, 'teacher');
        setLoadFirst(false);
    }
    getDetail(params.id);
    const memberURL = '/classes/members/' + params.id;
    return(
            <div>
                
                <Navbar bg="dark" variant="dark">
                    
                    {/* <button className="btn btn-success backbtn" onClick={this.props.backToList}> Back </button> */}
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <NavLink className="nav-link" to="#" >
                        Detail
                    </NavLink>
                    <NavLink className="nav-link" to={memberURL}>
                        People
                    </NavLink>
                    </Navbar.Collapse>
                </Navbar>
                <div className="btn-new" style={{ margin: '10px 0'}}>
                        <button className="btn btn-success" onClick={onHandleShow}> Invite </button>
                </div>

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
                    
                    <div className="row">
                        <div className="col-5">
                            A
                        </div>
                        <div className="col-3">
                        B
                        </div>
                    </div>
                </div>

                <div>
                    <Modal show={showDialog} onHide={onHandleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Invitation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={onSubmitHandler}>
                                <div className="mt-3" fullWidth>
                                    <div className="col-12">
                                        Link Invite Student: {inviteLinkStudent}
                                    </div>
                                </div>
                                <div className="mt-3" fullWidth>
                                    <div className="col-12">
                                        Link Invite Teacher: {inviteLinkTeacher}
                                    </div>
                                </div>
                                <div>
                                    <FormControl style={{width: 120, margin: '10px 0'}}>
                                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={roleInvite}
                                            label="Role"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={"student"}>Student</MenuItem>
                                            <MenuItem value={"teacher"}>Teacher</MenuItem>
                                        </Select>
                                        </FormControl>
                                </div>
                                <div className="row">
                                    <div className="col-10">
                                        <input type="text" name="name" className="form-control" placeholder="Send this invitaion to email..." onChange={onChangeHandler} />
                                    </div>
                                    <div className="col">
                                        <button type="submit" className="btn btn-success"> <SendIcon/> </button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                        
                    </Modal>
                </div>
            </div>
        
        )
}
export default DetailClass;