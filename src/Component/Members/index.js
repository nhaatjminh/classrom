import React, {useState} from "react";
import { NavLink, useParams} from "react-router-dom";
import { Navbar } from "react-bootstrap";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Grid } from "@material-ui/core";
import PersonIcon from '@mui/icons-material/Person';
import { green } from '@mui/material/colors';

export default function MembersList() {
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loadFirst, setLoadFirst] = useState(true);
    let params = useParams();

    const getMembers = async (idClass) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch("https://best-classroom-ever-api.herokuapp.com/classes/members/" + idClass, requestOptions)
        .then(response => response.json())
        .then(result => {
            setStudents(result.students);
            setTeachers(result.teachers);
        })
        .catch(error => console.log('error', error));
    }

    const renderMember = (id, name) => {
        return(
            <div key={id}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar>
                        <PersonIcon/>
                    </Avatar>
                    </ListItemAvatar>
                    <h5>{name}</h5>
                </ListItem>
                <Divider variant="inset" component="li" />
            </div>
        );
    }

    const detailURL = '/classes/detail/' + params.id;

    if (loadFirst) {
        getMembers(params.id)
        setLoadFirst(false);
    }

  return (
      <div>
        <Navbar bg="dark" variant="dark">
                    
            {/* <button className="btn btn-success backbtn" onClick={this.props.backToList}> Back </button> */}
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <NavLink className="nav-link" to={detailURL} >
                Detail
            </NavLink>
            <NavLink className="nav-link" to='#'>
                People
            </NavLink>
            </Navbar.Collapse>
        </Navbar>

        <Grid align='center'>
            
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <Grid style={{margin: '20px 0', color: green[300]}}>
                <h2>Teachers</h2>
                </Grid>
                <Divider sx={{ bgcolor: green[800] }} variant="inset" component="li" />
                {teachers.map((row) => (
                    renderMember(row.id, row.name)
                ))}
                
                <Grid style={{margin: '40px 0 20px 0', color: green[300]}}>
                <h2>Students</h2>
                </Grid>
                <Divider sx={{ bgcolor: green[800] }} variant="inset" component="li" />
                {students.map((row) => (
                    renderMember(row.id, row.name)
                ))}
                
            </List>
            
        </Grid>
      </div>
    
  );
}
