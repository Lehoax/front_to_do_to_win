import React, {useState} from "react";
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import './style.css'
import cross from '../img/add.png' 



const AddNewFriend = ({emailFriend}) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const serveurURL = process.env.REACT_APP_SERVER_URL;
    const { token } = useAuth()

const addFriend = async () =>{
    setSuccess(null);
    setError(null);               

        const userEmail = localStorage.getItem('email');
        try {
            const response = await axios.post(serveurURL + '/user/friendRequest', 
                { emailRecipient: emailFriend,
                emailApplicant: userEmail


                }, 
                {
                  headers: {
                    Authorization: `Bearer ${token}` 
                  },
                  withCredentials: true
                }
            );
    
            if (response.status === 201) {
                setSuccess('Demande d\'ami envoyée')               
                setError(null);
            }
        } catch (err) {
                         
            if (err.response.status === 409) {
                setError('Demande d\'ami déjà envoyée');
            }
           
            if (err.response.status === 404) {
                setError("Ce compte n\'existe pas")
            }
    
        }
    
}

return (
    <div id="display_friend">
        <div id="friend">
            <h4>{emailFriend}</h4>
            <button id="add_friend_btn" onClick={addFriend}>
                <img src={cross} id="add_friend_btn_img" />
            </button>
        </div>
        <div className="message-container">
            {error && <p className="message">{error}</p>}
            {success && <p className="message success-message">{success}</p>}
        </div>
    </div>
);

}

export default AddNewFriend;