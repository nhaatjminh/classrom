import { Route, Routes } from 'react-router';
import './App.css';
import Login from './Component/Login';
import Register from './Component/Register';
import DetailClass from './Component/DetailClass'
function App() {
  return  (

    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/classes/detail/:id' element={<DetailClass/>}/>
    </Routes>

  );
}

export default App;