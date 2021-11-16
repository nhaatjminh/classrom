import { Route, Routes } from 'react-router';
import './App.css';
import Login from './Component/Login';
import Register from './Component/Register';
import DetailClass from './Component/DetailClass'
import AcceptLink from './Component/AcceptLink'
import MembersList from './Component/Members';
function App() {
  return  (

    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/classes/detail/:id' element={<DetailClass/>}/>
      <Route path='/classes/members/:id' element={<MembersList/>}/>
      <Route path='/classes/acceptlink/:tokenlink' element={<AcceptLink/>}/>
    </Routes>

  );
}

export default App;