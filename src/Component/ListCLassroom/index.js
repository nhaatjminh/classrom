
import React, { useState } from 'react';
import Classroom from '../Classroom';

const ListClassRoom = () => {

    const [arrayClassRoom, setAarrayClassRoom] = useState([]);
    let isLoadedList = false;

    const listClassRoom = (listCls) => {
        return listCls.map((ele) => <Classroom key={ele.id} dataClass={ele}/>)
    }
    
    const loadListClassRoom = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://best-classroom-ever-api.herokuapp.com/classes", requestOptions)
        .then(response => response.json())
        .then(result => {
            setAarrayClassRoom(result);

        })
        .catch(error => {
            console.log('error', error);
            this.logout();
        });
    }   

    const logout = () => {
        localStorage.removeItem("token");
        // onLogoutSuccess();
        console.log("Logout success");
    }

    if (!isLoadedList){
        loadListClassRoom();
        isLoadedList = true;
    }

    return (
        <div>
            <div className="p-3">
                <div className="btn-logout">
                    <button className="btn btn-success" onClick={logout}> Logout </button>
                </div>
                <div>
                    {listClassRoom(arrayClassRoom)}
                </div>
            </div>
        </div>
    )
}

export default ListClassRoom;