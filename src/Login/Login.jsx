import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { useNav } from "../Context/NavContext";

import './style.css'

const Login = () => {
  const { setCurrentPage } = useNav();
  const serveurURL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const { isConnected, setIsConnected, storeToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setCurrentPage('login');
  }, [setCurrentPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Veuillez entrer un email et un mot de passe.');
      return;
    }

    try {
      const response = await axios.post(`${serveurURL}/user/login`, {
        email,
        password,
      }, {
        withCredentials: true
      });

      if (response.status === 200) {
        const token = response.data.token; 
        
        localStorage.setItem("email",response.data.email );

        storeToken(token);      
        setIsConnected(true);           
        setSuccess('Connexion réussie!');
        setError(''); 
      }
    } catch (err) {
      console.log(err);
      
      if (err.response) {
        setError('Email ou mot de passe incorrect.');
      } else if (err.request) {
        setError('Erreur réseau ou serveur.');
      } else {
        setError('Erreur inconnue.');
      }
      setSuccess(''); 
    }
  };

  if (isConnected) {    
    return <Navigate to="/" replace />;
  }
  const forgotPassword = () =>{
    navigate('/forgot_password')
  }

  const handleClickSignup = () => {
    navigate('/signup');
  };

  return (
    <>
      <div id="login">
        <button className="button" id='signup_btn' onClick={handleClickSignup}>Inscription</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>} 
        <form onSubmit={handleSubmit}>
          <div>
            <input
              placeholder='Email'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div>
            <input
              placeholder='Mot de passe'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <div>
            <button type="submit" className='button'>Se connecter</button>
          </div>
        </form>

        <a id='forgot_btn' onClick={forgotPassword}>Mot de passe oublié</a>
      </div>
    </>
  );
};

export default Login;
