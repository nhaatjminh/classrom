import { Route, Routes } from 'react-router';
import React, { useState } from 'react'
import './App.css';
import Login from './Component/Login';
import Register from './Component/Register';
import DetailClass from './Component/DetailClass'
import AcceptLink from './Component/AcceptLink'
import MembersList from './Component/Members';
import TopNavBar from './Component/AppBar';
import Profile from './Component/Profile';

function App() {

  const [isLogin, setIsLogin] = useState(localStorage.getItem("token") != null);
  const onLogoutSuccess = () => {
    setIsLogin(false);
    console.log("Logout success");
  }
  const onLoginSuccess = () => {
    setIsLogin(true);
    console.log("Login success");
  }

  return  (
    <div>
      { isLogin ? <TopNavBar brandName={""} onLogoutSuccess={onLogoutSuccess}></TopNavBar> : 
      <div></div>}
      {/* <TopNavBar onLogout={"Brand",logout}></TopNavBar> */}
    <Routes>
      <Route path='/' element={<Login onLoginSuccess={onLoginSuccess}/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/classes/detail/:id' element={<DetailClass/>}/>
      <Route path='/classes/members/:id' element={<MembersList/>}/>
      <Route path='/classes/acceptlink/:tokenlink' element={<AcceptLink/>}/>
      <Route path='/profile/:id' element={<Profile/>}/>
    </Routes>
    </div>
  );
}

export default App;