
import {React, useEffect, useState} from 'react';
import {  useParams} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import ListClassRoom from '../ListCLassroom';
import Login from '../Login';
const AcceptLink = () => {
    const [haveTokenAccount, setHaveTokenAccount] = useState(false);
    const params = useParams();
    const tokenAccount = localStorage.getItem("token");
    const tokenLink = params.tokenlink;
    const PostData = async () => {
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
    const CheckToken = () => {
        if (tokenAccount) {
            PostData();
            setHaveTokenAccount(true);
        }
        else {
            setHaveTokenAccount(false);
            localStorage.setItem("tokenLink", params.tokenlink);
        }
    }
    useEffect(() => {
        CheckToken();
    })
    
    return(
        <div>
            {haveTokenAccount ?
            <ListClassRoom></ListClassRoom> : 
            <Login></Login>} 
        </div>
        )
}
export default AcceptLink;