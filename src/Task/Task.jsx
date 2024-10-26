import React from "react";
import Done from '../Done/Done'
import './style.css'


const Task = ({task}) => {


    return(
        <>
        
        <div className="task">
        <h2 className="title_task">{task.title}</h2>
        <p className="desc_task">{task.description}</p>
        <div className="xp_done">
        <p className="xp">+{task.xp}XP</p>
            <Done taskID={task._id}/>
        </div>
        </div>
        </>
    )

}


export default Task;