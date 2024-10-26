import React, { useEffect, useState } from 'react';
import logo from '../img/logo.png';
import './style.css';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import profile from '../img/user.png';
import logoutimg from '../img/logout.png'
import axios from 'axios';
import { useUser } from '../Context/UserContext';
import Lvl from '../Helpers/Lvl'
import { useNav } from "../Context/NavContext";




const Header = () => {
  const serveurURL = process.env.REACT_APP_SERVER_URL;
  const { isConnected, token, logout } = useAuth(); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {user, updateUser } = useUser();
  const {CurrentPage, setCurrentPage} = useNav();

  const fetchData = async () => {
    try {
      const userEmail = localStorage.getItem('email'); 

      if (!userEmail) {
        setError('Veuillez vous reconnecter');
        return; 
      }

      const response = await axios.post(`${serveurURL}/user/profile`, 
        { email: userEmail }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (response.status === 200) {   
        setError(null);             
        return updateUser(response.data.user)
      }
    } catch (err) {
      if (err.response) {
        setError('Veuillez vous reconnecter');
        logout(); // Déconnexion si erreur de connexion
      } else if (err.request) {
        setError('Erreur réseau ou serveur.');
      } else {
        setError('Erreur inconnue.');
      }
    }
  };

  useEffect(() => {
    let isMounted = true; 
    if (!isConnected) {
      navigate('/login')
      setCurrentPage('login')
    }
    
    const fetchUser = async () => {
      if (isConnected && isMounted) { 
        const newUser = await fetchData();
        if (newUser && newUser !== user) {
          updateUser(newUser); 
        }
      }
    };
  
    fetchUser(); 
  
    return () => {
      isMounted = false; 
    };
    
  }, [isConnected, token, user]); 
  
const ClickLogout = () => {
  logout(); 
  navigate('/login');
}
const ClickProfile = () =>{
  navigate('/profile');
  setCurrentPage('/profile')
}

  return (
    <div id="header">
      <img id='img_head' src={logo} alt="logo to do to win" />
      <p id="xp">
      {isConnected && user ? <Lvl xp={user.xp} /> : '0'}

      </p>
      {isConnected && (
        <div>
        <img id="logout_btn"onClick={ClickLogout} src={logoutimg} alt="Logout" />
        <img src={profile} onClick={ClickProfile} id='get_profile' alt="Profile" />
        </div>
      )}
      {error && <p className="error">{error}</p>} {/* Affichage d'un message d'erreur si présent */}
    </div>
  );
};

export default Header;
