import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './Header/Header';
import Login from '../src/Login/Login';
import Signup from '../src/Signup/Signup'
import NavBar from './NavBar/Navbar';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Tasks from './Tasks/Tasks';
import Profile from './Profile/Profile';
import NewTask from './NewTask/NewTask';
import NewFriend from './NewFriend/NewFriend';
import Groups from './Groups/Groups';
import NewGroup from './NewGroup/NewGroup';


function App() {
  return (
    <div className="App">
      <Header/>
      <div className='home'>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/new_task" element={<NewTask />} />
        <Route path="/" element={<Tasks />} />
        <Route path='/new_friend' element={<NewFriend/>} />
        <Route path='/groups' element={<Groups/>} />
        <Route path='/newgroup' element={<NewGroup/>} />

      </Routes>
      </div>
      <NavBar/>

    </div>
  );
}

export default App;
