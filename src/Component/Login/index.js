import React, {useState} from "react";
import {Link} from 'react-router-dom'
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@material-ui/core'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ListClassRoom from "../ListCLassroom";

import './index.css';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isLogin, setIsLogin] = useState(localStorage.getItem("token") != null)
    const paperStyle = {
        padding: 20,
        height: '70vh',
        width: 300,
        margin: "20px auto"
    }
    const avatarStyle = {
        backgroundColor: '#1bbd7e'
    }
    const buttonStyle = {
        margin: '10px 0'
    }

    const handleOnchangeUsername = (e) => {
        setUsername(e.target.value);
    }
    const handleOnchangePassword = (e) => {
        setPassword(e.target.value);
    }
    const responseFacebook = response => {
        console.log(response);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id_token": response.accessToken
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };
        //fetch("http://localhost:5000/auth/facebook-sign-in", requestOptions)
        fetch("https://best-classroom-ever-api.herokuapp.com/auth/facebook-sign-in", requestOptions)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                }

                throw Error(response.status);
            })
            .then(result => {
                console.log(result)
                localStorage.setItem("token", result.token);
                setIsLogin(true);
            })
            .catch(error => {
                console.log('error', error)
            });
    }
    const onSuccessGoogle = response => {
        console.log(response);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id_token": response.tokenId
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };
//fetch("http://localhost:5000/auth/google-sign-in", requestOptions)
        fetch("https://best-classroom-ever-api.herokuapp.com/auth/google-sign-in", requestOptions)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                }

                throw Error(response.status);
            })
            .then(result => {
                console.log(result)
                localStorage.setItem("token", result.token);
                setIsLogin(true);
            })
            .catch(error => {
                console.log('error', error)
            });
    }
    const login = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": username,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://best-classroom-ever-api.herokuapp.com/login", requestOptions)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                }

                throw Error(response.status);
            })
            .then(result => {
                console.log(result)
                localStorage.setItem("token", result.token);
                setIsLogin(true);
            })
            .catch(error => {
                console.log('error', error)
                alert("Incorrect username or password!");
            });
    }

    const onLogoutSuccess = () => {
        setIsLogin(false);
    }
    const PostData = async (tokenLink, tokenAccount) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        await fetch("http://localhost:5000/classes/acceptlink/" + tokenLink + "/" + tokenAccount, requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.log('error', error);
        });
    }
    const AcceptClass = () => {
        let tokenLink = localStorage.getItem("tokenLink");
        if (tokenLink && isLogin) {
            let tokenAccount = localStorage.getItem("token")
            PostData(tokenLink, tokenAccount);
        }
    }
    AcceptClass();
    return (
        <div>
        { isLogin ?
        <ListClassRoom key={isLogin} onLogoutSuccess={onLogoutSuccess}/> :

        <Grid>
            <Paper elevation={10} style ={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField name='username' label='Username' placeholder='Enter username' fullWidth required onChange={handleOnchangeUsername}/>
                <TextField name='password' label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handleOnchangePassword}/>
                <Button type='button' style={buttonStyle} color='primary' variant='contained' fullWidth onClick={login}>Sign In</Button>
                <Typography>
                    Don't have an account?
                    <Link to="/register"> Sign Up
                    </Link>
                </Typography>
                <FacebookLogin
                    appId="842222179779996"
                    fields="name,picture,email"
                    autoLoad = {false}
                    cssClass="btnFacebook"
                    textButton = "Sign In with Facebook"                                                                
                    callback={responseFacebook} />
                <br></br>
                < GoogleLogin
                    clientId="176406720657-kvkukhtjlamdlv6cnc1vg8qanluodo33.apps.googleusercontent.com"
                    buttonText="Sign In with Google"
                    onSuccess={onSuccessGoogle}
                    isSignedIn={false}
                    className="btnGoogle"
                />
            </Paper>
        </Grid>
        }
        </div>
    );
}

export default Login;