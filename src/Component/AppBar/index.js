import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './index.css'

export default function TopNavBar({ brandName }) {
	const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
	const [show, setShow] = React.useState(false);
  const [url] = React.useState("/profile/" + localStorage.getItem("userId"));

	let navigate = useNavigate();

	const onSubmitHandler = async(e) => {
		e.preventDefault();

    console.log("Clciked")

		var myHeaders = new Headers();
		myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
		myHeaders.append("Content-Type", "application/json");
		console.log(localStorage.getItem("token"));

		var raw = JSON.stringify({
			"name": name,
      "description": description
		});

		var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
		};

		fetch("https://best-classroom-ever-api.herokuapp.com/classes", requestOptions)
			.then(response => {
					console.log(response)
					if (response.ok) {
							return response.json();
					}

					throw Error(response.status);
			})
			.then(() => {
				navigate("/");
			})
			.catch(error => {
					console.log('error', error)
					alert("Add class fail");
			})
      .finally(() => {
        onHandleModalClose();
      });
	}

	const nameOnChangeHandler = (e) => setName(e.target.value);
  const descriptionOnChangeHandler = (e) => setDescription(e.target.value);
	const onHandleModalClose = () => setShow(false);
	const onHandleModalShow = () => setShow(true);
  const onHandleProfileOnClick = () => { navigate(url); }
 
  return (
    <Box className="nav-bar" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {brandName}
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="add classroom"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={onHandleModalShow}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                color="inherit"
                onClick={onHandleProfileOnClick}
              >
                <AccountCircle/>
              </IconButton>
            </div>
        </Toolbar>
      </AppBar>
      <Modal show={show} onHide={onHandleModalClose}>
        <Modal.Header closeButton>
        <Modal.Title>Adding Classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <div className="addClassInput">
                        <input type="text" className="form-control" placeholder="New class name..." onChange={nameOnChangeHandler} />
                    </div>
                    <div className="addClassInput">
                        <input type="text" className="form-control" placeholder="Description..." onChange={descriptionOnChangeHandler} />
                    </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-success addClassButton"> Add Class </button>
                  <button className="btn btn-success addClassButton" onClick={onHandleModalClose}> Close </button>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
    </Modal>
    </Box>
  );
}
