import React ,{useState}from "react";
import addFriend from '../img/addfriend.png'
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import './style.css'


const AcceptFriendship = ({emailApplicant}) =>{

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const serveurURL = process.env.REACT_APP_SERVER_URL;
    const { token } = useAuth()
    const [EmailApplicant, setEmailApplicant] = useState(emailApplicant);


const acceptFriend = async () =>{
    setSuccess(null);
    setError(null);               

        const userEmail = localStorage.getItem('email');
        try {
            const response = await axios.post(serveurURL + '/user/friendRequestAccepted', 
                { emailRecipient: userEmail,
                emailApplicant: EmailApplicant


                }, 
                {
                    headers: {
                    Authorization: `Bearer ${token}` 
                    },
                    withCredentials: true
                }
            );
    
            if (response.status === 201) {
                setSuccess('Demande d\'ami accepté')  
                setEmailApplicant(null);            
                setError(null);
            }
        } catch (err) {
                            
            if (err.response.status === 409) {
                setError('Erreur demande déjà accepté');
            }
            
            if (err.response.status === 404) {
                setError("Cette demande n'est pas valide")
            }
    
        }
    
}
    
return (
    EmailApplicant ? (
      <div className="accept_friend">
        <h4>{emailApplicant}</h4>
        <button onClick={acceptFriend} className="accept_friend_btn">
          <img className="accept_friend_img" src={addFriend} alt="Add Friend"/>
        </button>
      </div>
    ) : (
      <><h4>Aucune demande d'ami en attente</h4></>
    )
  );
  
}

export default AcceptFriendship;