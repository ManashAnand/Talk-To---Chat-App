
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';


function App() {

  const { currentUser } = useContext(AuthContext);
  


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={currentUser?<Home/>:<Login/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
