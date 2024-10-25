import React , {useState}from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './style.css'

const ForgotPassword = () =>{
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const serveurURL = process.env.REACT_APP_SERVER_URL;
    const navigate = useNavigate();


    const handleClickLogin = () => {
      navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email) {
          setError('Veuillez entrer un email');
          return;
        }
        try {
          const response = await axios.post(serveurURL+'/user/forgotPassword', {
            email,
          }, {
            withCredentials: true
          });
    
          if (response.status === 200) {
            setSuccess('Email de réinitialisation envoyé '); 
          }
        } catch (err) {
          console.log(err);
          setError('Erreur veuillez réessayer plus tard'); 
        }
      }
     
    const renderContent = () => {
       
          return (
            <>
              <div id="forgot_password">
          <button className="button" onClick={handleClickLogin}>Connection</button>
        <h4 id="forgot_title">Mot de passe oublié</h4>
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
          <button type="submit" className='button end_button'>Envoyer</button>
          </form>
          </div>

            </>
          );
      
      };
    return(
        <>
  
        {renderContent()}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
        </>
    )
}

export default ForgotPassword;
