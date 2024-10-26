import React, { useState, useEffect } from "react";
import nothing from './nothing.png';
import './style.css'
import { useUser } from '../Context/UserContext';
import { useNav } from "../Context/NavContext";
import Task from "../Task/Task";



const Tasks = () =>{
    const {user, updateUser } = useUser();
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);
    const {CurrentPage, setCurrentPage} = useNav('');

    useEffect(() => {
      setCurrentPage('/')
      
    }, []); 
    
    return (
        <div id="list_of_task">
          {error && <div style={{ color: 'red' }}>{error}</div>} 
          {user && user.task.length > 0 ? (
            user.task.slice().reverse().map((task) => (
              <Task key={task._id} task={task} />
            ))
           
          ) : (
            <>
              <img id="nothing_img" src={nothing} alt="Aucune tâche" />
              <h4 id="congrat">Félicitations, vous avez complété toutes vos tâches !</h4>
            </>
          )}
        </div>
      );
}

export default Tasks;
