
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Classroom from '../Classroom';
export default class ListClassRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrayClassRoom:[],
            show: false,
            name: ""
        }      
    }

    listClassRoom = (listCls) => {
        return listCls.map((ele) => <Classroom key={ele.id} dataClass={ele}/>)
    }
    componentWillMount(){
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
            console.log(result);
            this.setState({
                arrayClassRoom: result
            })
        })
        .catch(error => {
            console.log('error', error);
            this.logout();
        });
    }   
    
    onSubmitHandler = async(e) => {
        e.preventDefault();

        await fetch("https://best-classroom-ever-api.herokuapp.com/classes", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: this.state.name}) // body data type must match "Content-Type" header
        });
        
        window.location.reload();
    }

    onChangeHandler = (e) => this.setState({ name: e.target.value });
    onHandleClose = () => this.setState({show: false});
    onHandleShow = () => this.setState({show: true});

    logout = () => {
        localStorage.removeItem("token");
        this.props.onLogoutSuccess();
        console.log("Logout success");
    }
    render(){
        return(
            <div>
                <div className="p-3">
                    <div className="btn-logout">
                        <button className="btn btn-success" onClick={this.logout}> Logout </button>
                    </div>
                    <div className="btn-new">
                        <button className="btn btn-success" onClick={this.onHandleShow}> New Class </button>
                    </div>
                    <div className="text-center">
                        {this.listClassRoom(this.state.arrayClassRoom)}
                    </div>

                    <Modal show={this.state.show} onHide={this.onHandleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Adding Classroom</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={this.onSubmitHandler} action="https://best-classroom-ever-api.herokuapp.com/classes" method="POST">
                                <div className="row">
                                    <div className="col-9">
                                        <input type="text" name="name" className="form-control" placeholder="New class name..." onChange={this.onChangeHandler} />
                                    </div>
                                    <div className="col">
                                        <button type="submit" className="btn btn-success"> Add Class </button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                        <div onClick={this.onHandleClose}>
                            <button className="btn btn-dark" onClick={this.onHandleShow}> Close </button>
                        </div>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}