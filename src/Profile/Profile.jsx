import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNav } from "../Context/NavContext";


const Profile = () => {
  const serveurURL = process.env.REACT_APP_SERVER_URL;
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [reminder, setReminder] = useState(false); 
  const {CurrentPage, setCurrentPage} = useNav();

  const fetchData = async () => {
    try {
      const userToken = localStorage.getItem('accessToken');
      const userEmail = localStorage.getItem('email');

      if (!userToken || !userEmail) {
        setError('Veuillez vous reconnecter');
        return; 
      }

      const response = await axios.post(serveurURL+'/user/profile', 
        { email: userEmail }, 
        {
          headers: {
            Authorization: `Bearer ${userToken}` 
          },
          withCredentials: true
        }
      );

      if (response.status === 200) {
        setReminder(response.data.user.reminder); 
        setError(null);
      }
    } catch (err) {
      if (err.response) {
        setError('Veuillez vous reconnecter');
      } else if (err.request) {
        setError('Erreur réseau ou serveur.');
      } else {
        setError('Erreur inconnue.');
      }
    }
  };

  const updateData = async (reminder) => {
    try {
      const userToken = localStorage.getItem('accessToken');
      const userEmail = localStorage.getItem('email');
  
      if (!userToken || !userEmail) {
        setError('Veuillez vous reconnecter');
        return; 
      }
  
      const response = await axios.put(serveurURL+'/user/update', 
        { email: userEmail, reminder }, 
        {
          headers: {
            Authorization: `Bearer ${userToken}` 
          },
          withCredentials: true
        }
      );
  
      if (response.status === 200) {
        if (reminder) {
          setSuccess('L\'utilisateur recevra les rappels à 12h si il ne s\'est pas connecté depuis plus de 24H');
        }else{
          setSuccess('L\'utilisateur ne recevra plus les rappels');

        }
        setError(null);
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        setError('Veuillez vous reconnecter');
      } else if (err.request) {
        setError('Erreur réseau ou serveur.');
      } else {
        setError('Erreur inconnue.');
      }
    }
  };
  useEffect(() => {
    fetchData();
    setCurrentPage('profile'); 
  }, []);

  const handleChange = () => {
    setReminder(prevReminder => {
      const newReminder = !prevReminder;
      updateData(newReminder); 
      return newReminder; 
    });
  };

  return (
    <div id='profile'>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>} 
      <label>Recevoir des rappels journaliers</label>
      <input type='checkbox' onChange={handleChange} checked={reminder} />
    </div>
  );
};

export default Profile;
