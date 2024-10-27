import React, { useState } from 'react';
import axios from 'axios';
import './style.css'
import AddNewFriend from '../AddNewFriend/AddNewFriend';
import { useAuth } from '../Context/AuthContext';


const NewFriend = () =>{
    const [email, setEmail] = useState('');
    const serveurURL = process.env.REACT_APP_SERVER_URL;
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [emailFind, setEmailFind] = useState('');
    const { token } = useAuth()




    const handleSubmit = async (e) => {
        e.preventDefault();    
        setSuccess(null);
    
        try {
            const response = await axios.post(serveurURL + '/user/findUser', 
                { email: email }, 
                {
                  headers: {
                    Authorization: `Bearer ${token}` 
                  },
                  withCredentials: true
                }
            );
    
            if (response.status === 200) {
                setEmailFind(response.data.user.email)                
                setError(null);
            }
        } catch (err) {
            console.log(err);
            
            if (err.status = 404) {
                setError("Ce compte n\'existe pas")
            }
    
        }
    };
    
    return (
                <div>
              <form id="friend_form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Rechercher un utilisateur"
                />
                <button id="friend_btn" type="submit">
                  Rechercher
                </button>
              </form>
              <div>
              {error && (
                  <div
                    style={{
                      color: 'red',
                      position: 'absolute',
                      zIndex: 1,
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    {error}
                   
                  </div>
                )}
                  {success && (
                  <div
                    style={{
                      color: 'red',
                      position: 'absolute',
                      zIndex: 1,
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    {success}
                   
                  </div>
                )}
              </div>
              {emailFind && (
                  <div>
                    <AddNewFriend emailFriend={emailFind}/>
                  </div>
                )}
            </div>
            
          );
}

export default NewFriend;