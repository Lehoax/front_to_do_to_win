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



const Header = () => {
  const serveurURL = process.env.REACT_APP_SERVER_URL;
  const { isConnected, token, logout } = useAuth(); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {user, updateUser } = useUser();

  const fetchData = async () => {
    try {
      const userEmail = localStorage.getItem('email'); // Récupération de l'email depuis le localStorage

      if (!userEmail) {
        setError('Veuillez vous reconnecter');
        return; 
      }

      const response = await axios.post(`${serveurURL}/user/profile`, 
        { email: userEmail }, 
        {
          headers: {
            Authorization: `Bearer ${token}` // Utilisation du token depuis le contexte
          },
          withCredentials: true
        }
      );

      if (response.status === 200) {
        updateUser(response.data.user)        
        setError(null);        
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
    if (isConnected) {
      fetchData();
      console.log();

    } else {
      const currentPath = window.location.pathname;
      if (!['/login', '/signup', '/forgot-password'].includes(currentPath)) {
        navigate('/login'); 
      }
    }
  }, [isConnected, navigate, token, logout]);

const ClickLogout = () => {
  logout(); 
  navigate('/login');
}

  return (
    <div id="header">
      <img id='img_head' src={logo} alt="logo to do to win" />
      <p id="xp">
        {isConnected ? <Lvl xp={user.xp}/>  : '0'}
      </p>
      {isConnected && (
        <div>
        <img id="logout_btn"onClick={ClickLogout} src={logoutimg} alt="Logout" />
        <img src={profile} id='get_profile' alt="Profile" />
        </div>
      )}
      {error && <p className="error">{error}</p>} {/* Affichage d'un message d'erreur si présent */}
    </div>
  );
};

export default Header;
