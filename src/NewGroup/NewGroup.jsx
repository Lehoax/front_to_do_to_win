import React ,{useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useNav } from "../Context/NavContext";
import back from '../img/left-arrow.png'
import './style.css'
import { useUser } from '../Context/UserContext';


const NewGroup = () => {
    const navigate = useNavigate(); 
    const {CurrentPage, setCurrentPage} = useNav('');
    const {user, updateUser } = useUser();
    const [friends, setFriends] = useState('')


    const backNavigate = () =>{
        navigate('/groups');
        setCurrentPage('/groups');
    }

    useEffect(() => {    
        setFriends(user.friends);
        console.log(friends);
        

    }, []); 


        return(
        <div>
            <a className="see_groups"  onClick={backNavigate}>
                <h4>Voir les groupes</h4>
                <img id="see_group" src={back}/>
            </a>

            <form>
                <input type="text" placeholder="Nom du groupe"/>
               

            </form>
        </div>
    )
}

export default NewGroup;