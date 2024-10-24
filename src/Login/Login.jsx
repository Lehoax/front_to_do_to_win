import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { useNav } from "../Context/NavContext";

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
        storeToken(token);         
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

  const handleClickSignup = () => {
    navigate('/signup');
  };

  return (
    <>
      <div id='group_login_btn'>
        <button className="button" onClick={handleClickSignup}>Inscription</button>
      </div>
      <div id="login">
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
            <button type="submit" className='button end_button'>Se connecter</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
