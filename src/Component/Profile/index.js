import React, { useState } from "react";
import { Grid, Paper } from '@material-ui/core';
import { Form } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import './index.css'

const Profile = () => {
    let params = useParams();
    
    const [studentID, setStudentID] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [isLoadedInfo, setIsLoadedInfo] = useState(false);
    const [isOwner] = useState((params.id === localStorage.getItem("userId")));

    const paperStyle = {
        padding: 40,
        width: '90%',
        margin: "20px auto"
    }

    const loadUserInfo =  async() => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch("https://best-classroom-ever-api.herokuapp.com/accounts/" + params.id, requestOptions)
        .then(response => response.json())
        .then(result => {
            setStudentID(result.account[0].studentID);
            setName(result.account[0].name);
            setPhone(result.account[0].phone);
            setAddress(result.account[0].address);
        })
        .catch(error => {
            console.log('error', error);
        });
    }

    const saveBtnOnClick = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("studentID", studentID);
        urlencoded.append("name", name);
        urlencoded.append("address", address);
        urlencoded.append("phone", phone);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch("https://best-classroom-ever-api.herokuapp.com/accounts/update", requestOptions)
        .then(response =>  response.text())
        .then(result => {
            alert("Updated!");
            console.log(result);
        })
        .catch(error => {
            alert("An error occur");
            console.log('error', error)
        });
    }

    const studentIDOnChangeHandler = (e) => setStudentID(e.target.value);
	const nameOnChangeHandler = (e) => setName(e.target.value);
    const addressOnChangeHandler = (e) => setAddress(e.target.value);
    const phoneOnChangeHandler = (e) => setPhone(e.target.value);

    if (!isLoadedInfo) {
        loadUserInfo();
        setIsLoadedInfo(true);
    }

    return (
        <Grid>
            <Paper elevation={10} style ={paperStyle}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Student ID </Form.Label>
                        <Form.Control type="text" value={studentID} disabled={!isOwner} onChange={studentIDOnChangeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Fullname </Form.Label>
                        <Form.Control type="text" value={name} disabled={!isOwner} onChange={nameOnChangeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Address </Form.Label>
                        <Form.Control type="text" value={address} disabled={!isOwner} onChange={addressOnChangeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Numberphone </Form.Label>
                        <Form.Control type="text" value={phone} disabled={!isOwner} onChange={phoneOnChangeHandler} />
                    </Form.Group>
                    <div className="text-center" hidden={!isOwner}>
                        <button className="btn btn-dark btnEdit" onClick={saveBtnOnClick}> SAVE </button>
                    </div>
                </Form>
            </Paper>
        </Grid>
    )
}

export default Profile;