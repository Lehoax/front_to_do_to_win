import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './Header/Header';
import Login from '../src/Login/Login';
import Signup from '../src/Signup/Signup'
import NavBar from './NavBar/Navbar';
import ForgotPassword from './ForgotPassword/ForgotPassword';


function App() {
  return (
    <div className="App">
      <Header/>
      <div className='home'>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
      </Routes>
      </div>
      <NavBar/>

    </div>
  );
}

export default App;
