import React, { useState } from "react";
import { Grid, Paper } from '@material-ui/core';
import { Form } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import './index.css'

const Profile = () => {
    let params = useParams();
    
    const [userInfo, setUserInfo] = useState({
        name: "",
        phone: "",
        address: ""
    });
    const [isEdit, setIsEdit] = useState(false);
    const [textEditButton, setTextEditButton] = useState("Edit");
    const [isLoadedInfo, setIsLoadedInfo] = useState(false);
    
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
            setUserInfo(result.account[0]);
        })
        .catch(error => {
            console.log('error', error);
            setUserInfo({
                name: "",
                phone: "",
                address: ""
            });
        });
    }

    const editBtnOnClick = () => {
        console.log(isEdit);
        if (!isEdit) {
            setIsEdit(true);
            setTextEditButton("Save");
        } else {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                "name": userInfo.name,
                "address": userInfo.address,
                "phone": userInfo.phone,
            });

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            
            fetch("https://best-classroom-ever-api.herokuapp.com/accounts/update", requestOptions)
                .then(response => {
                    if (response.ok) {
                        alert("Account updated!")
                        return response.json();
                    }

                    throw Error(response.status);
                })
                .then(response => response.json())
                .catch(error => {
                    console.log('error', error)
                    alert("Incorrect username or password!");
                });
        }
    }


	const nameOnChangeHandler = (e) => setUserInfo( userInfo.name = e.target.value);
    const addressOnChangeHandler = (e) => setUserInfo( userInfo.address = e.target.value);
    const phoneOnChangeHandler = (e) => setUserInfo( userInfo.phone = e.target.value);

    if (!isLoadedInfo) {
        loadUserInfo();
        setIsLoadedInfo(true);
    }

    return (
        <Grid>
            <Paper elevation={10} style ={paperStyle}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Fullname </Form.Label>
                        <Form.Control type="text" value={userInfo.name} disabled={!isEdit} onChange={nameOnChangeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Address </Form.Label>
                        <Form.Control type="text" value={userInfo.address} disabled={!isEdit} onChange={addressOnChangeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Numberphone </Form.Label>
                        <Form.Control type="text" value={userInfo.phone} disabled={!isEdit} onChange={phoneOnChangeHandler} />
                    </Form.Group>
                    <div className="text-center">
                        <button className="btn btn-dark btnEdit" onClick={editBtnOnClick}> {textEditButton} </button>
                    </div>
                </Form>
            </Paper>
        </Grid>
    )
}

export default Profile;