import React from "react";
import add from "../img/add.png"
import "./style.css"
import { useNavigate } from 'react-router-dom';
import { useNav } from "../Context/NavContext";



const Groups = () =>{
    const navigate = useNavigate(); 
    const {CurrentPage, setCurrentPage} = useNav('');

    const newGroupNavigate = () =>{
        navigate('/newgroup')
        setCurrentPage('/newgroup')
    }
    
    return(
        <div>
            <a className="new_group" onClick={newGroupNavigate}>
                <h4>Créer un groupe</h4>
                <img src={add} id="new_group_add"/>
            </a>
        </div>
    )
}

export default Groups;