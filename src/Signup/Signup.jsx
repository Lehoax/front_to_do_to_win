import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css'



const Signup = () =>{
  const serveurURL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Repetepassword, setRepetepassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!email || !password) {
        setError('Veuillez entrer un email et un mot de passe.');
        return;
    }
    if (Repetepassword !== password) {
        setError('Les mots de passes ne correspondent pas.');
        return;
    }
    try {
        const response = await axios.post(serveurURL+'/user/signup', {
          email,
          password,
        });
  
        if (response.status === 201) {
          setSuccess('Inscription réussie!');
        }
      } catch (err) {
        if (err.response) {  
            console.log(err);
                      
          setError('Cette uttilisateur existe déja.');
        } else if (err.request) {
            console.log(err);

          setError('Erreur réseau ou serveur.');
        } else {
          setError('Erreur inconnue.');
        }
      }}

      const handleClickLogin = () => {
        navigate('/login');
      };
    
    return (
      <>
     
    <div id="Signup" >
          <button className="button"  id="login_btn" onClick={handleClickLogin}>Connection</button>
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
          <input
          placeholder='Repéter le mot de passe'
            type="password"
            value={Repetepassword}
            onChange={(e) => setRepetepassword(e.target.value)} 
            required
          />
        </div>
        <div>
          <button type="submit" className='button'>S'inscrire</button>
        </div>
      </form>
    </div>
      </>
    )
  }
  export default Signup