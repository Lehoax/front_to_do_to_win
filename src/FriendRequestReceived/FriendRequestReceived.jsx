import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import AcceptFriendship from "../AcceptFriendship/AcceptFriendship";


const FriendRequestReceived = () =>{
    const {token } = useAuth(); 
    const [error, setError] = useState(null);
    const [friendArray, setFriendArray] = useState(null);
    const serveurURL = process.env.REACT_APP_SERVER_URL;



    const GetFriendRequestReceived = async () => {
        try {
          const userEmail = localStorage.getItem('email'); 
    
          if (!userEmail) {
            setError('Veuillez vous reconnecter');
            return; 
          }
    
          const response = await axios.post(`${serveurURL}/user/friendRequestReceived`, 
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
            return setFriendArray(response.data.friendRequest);            
          }
        } catch (err) {
          if (err.status === 401) {
            setError('Aucune demande d\'amis en attente');
          } else if (err.request) {
            setError('Erreur réseau ou serveur.');
          } else {
            setError('Erreur inconnue.');
          }
        }
      };


  useEffect(() => {
    GetFriendRequestReceived(); 
  }, []); 

  return (
    <div>
      <h1>Demande d'amis</h1>
        {friendArray && friendArray.length > 0 ? (
            <div>
                {friendArray.map((friend) => (
                    <AcceptFriendship key={friend._id} emailApplicant={friend.emailApplicant} />
                ))}
            </div>
        ) : (
            <p>Aucune demande d'amis en attente</p>
        )}

    </div>
);

}


export default FriendRequestReceived;