import React, { useState } from "react";
import './style.css';
import add from '../img/add.png';
import back from '../img/left-arrow.png';
import friends from '../img/friends.png';
import { useNavigate } from 'react-router-dom';
import { useNav } from "../Context/NavContext";
import { useAuth } from '../Context/AuthContext';


const NavBar = () => {
    const navigate = useNavigate(); 
    const {CurrentPage, setCurrentPage} = useNav('');
    const { isConnected } = useAuth();
    
    const handleNavigation = (view) => {
        setCurrentPage(view);
        navigate(view);
    };
    

    const renderContent = () => (
        <>
        {isConnected === false ? (
                    ''
                    ) : (
                        <>
            {CurrentPage !== '/' ? (
                <div className="nav_bar">
                    <button className="logo_btn back" onClick={() => handleNavigation('/')} >
                        <img src={back} alt="Retour" />
                    </button>
                </div>
            ) : (
                <div className="nav_bar">
                    <button className="logo_btn left" /* onClick={() => handleNavigation('')} */>
                        <img src={friends} alt="Amis" />
                    </button>
                    <button className="logo_btn center" /* onClick={() => handleNavigation('')} */>
                        <img src={add} alt="Ajouter" />
                    </button>
                    <button className="logo_btn right" /* onClick={() => handleNavigation('')} */>
                        <img src={friends} alt="Amis" />
                    </button>
                </div>
            )}
            </>
        )}

        </>
    );
    

    return <>{renderContent()}</>;
};

export default NavBar;
