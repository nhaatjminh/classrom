import { Route, Routes } from 'react-router';
import './App.css';
import ListClassRoom from './Component/ListCLassroom';
import Login from './Component/Login';
import Register from './Component/Register';

function App() {
  return  (

    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>

  );
}

export default App;