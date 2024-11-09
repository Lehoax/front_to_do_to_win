import React ,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useNav } from "../Context/NavContext";
import back from '../img/left-arrow.png'
import './style.css'
import { useUser } from '../Context/UserContext';
import axios from 'axios';



const NewGroup = () => {
    const serveurURL = process.env.REACT_APP_SERVER_URL;
    const navigate = useNavigate(); 
    const {CurrentPage, setCurrentPage} = useNav('');
    const {user, updateUser } = useUser();
    const [nameGroup, setNameGroup] = useState([]);
    const [friendArr, setFriendArr] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const backNavigate = () =>{
        navigate('/groups');
        setCurrentPage('/groups');
    }
    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        
        try {
        const userToken = localStorage.getItem('accessToken');
        const userEmail = localStorage.getItem('email');

        const response = await axios.post(serveurURL+'/group/newgroup', {
            title: nameGroup,
            admin: userEmail,
            members: friendArr
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}` 
          },
          withCredentials: true
        });

        if (response.status = 201) {
            setError('');
            setSuccess('groupe créé avec succès')
            
        }
        } catch (error) {
            setSuccess('')
            setError('Erreur réseau ou serveur.');
        }
       
    

    }
    const updateFriensArr = (e) => {
        const value = e.target.value;
        setFriendArr((prevArr) =>
          prevArr.includes(value)
            ? prevArr.filter((friend) => friend !== value)
            : [...prevArr, [value]]
        );
      };
    const updateNamegroup = (e) =>{
        const value = e.target.value;
        setNameGroup(value);
        
    }
      

        return(
        <>
            <a className="see_groups"  onClick={backNavigate}>
                <h4>Voir les groupes</h4>
                <img id="see_group" src={back}/>
            </a>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nom du groupe"
                onChange={(e) => updateNamegroup(e)} 
                required/>
                <ul className="list_of_friend">
                {user && user.friends.length > 0 ? (
                    user.friends.map((friend) => (
                    <div key={friend+"1"} className="checkbox_user">
                        <li className="add_user_group" key={friend}>{friend}</li>
                        <input 
                            type="checkbox" 
                            value={friend} 
                            name={friend}
                            onChange={(e) => updateFriensArr(e)} 
                            key={friend + "2"} 
/>                    </div>
                    ))
           
            ) : (
                <>
                <p>Ajouter des amis pour créer un groupe</p>
                </>
            )}
                </ul>
            <button id="new_group" type="submit">Créer</button>
            </form>
        </>
    )
}

export default NewGroup;