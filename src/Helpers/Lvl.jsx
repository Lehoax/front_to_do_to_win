import React from "react";

const Lvl = (xp) =>{
  
    const calculateLevel = (xp) => {    
        const xpBase = 40; 
        return Math.floor(Math.sqrt(xp / xpBase)) + 1;
      };

    return calculateLevel(xp.xp)
}

export default Lvl;