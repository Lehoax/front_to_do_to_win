import React,{useState, useEffect} from "react";
import axios from 'axios';
import './style.css';


const NewTask = () =>{
  const serveurURL = process.env.REACT_APP_SERVER_URL;
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle]= useState('');
    const [description, setDescription]= useState('');
    const [xp, setXp] = useState('')


    useEffect(() => {
        const userToken = localStorage.getItem('accessToken'); 
        if (userToken) {
            setToken(userToken); 
        }else{
            setError('Veuillez vous reconnecter')
        }          
        const user = localStorage.getItem('email'); 
        if (user) {
            setEmail(user); 
        }else{
            setError('Veuillez vous reconnecter')
        }       
      }, []); 
    


    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!title && !description && !xp) {
            setError('Veuillez remplir tous les champs')
        }
        try {
            const response = await axios.post(serveurURL+'/task/newtask', {
                email,
                title,
                description,
                xp
              }, {
                headers: {
                  Authorization: `Bearer ${token}`
                },
                withCredentials: true
              });
                
            if (response.status === 201) {
              setSuccess('Tache créé'); 
              setError(''); 
            }
          } catch (err) {
            console.log(err);
            
            if (err.response) {
              setError('Veuillez vous reconnecter');
            } else if (err.request) {
              setError('Erreur réseau ou serveur.');
            } else {
              setError('Erreur inconnue.');
            }
            setSuccess(''); 
          }
        
    };

    return(
    <div>
      
        <form onSubmit={handleSubmit}  id="new_task_form">
            <input type="text" name="titre" 
            placeholder="Titre de la tache"
            onChange={(e) => setTitle(e.target.value)} 
            required
            />
            <textarea rows="5" cols="40" name="titre"
            placeholder="Description de la tache"
            onChange={(e) => setDescription(e.target.value)} 
            />
            <h3 id="hardness">Difficulté :</h3 >
            <div id="radio_btn_group">
            <input className="radio_btn" id="green" type="radio" name="hardness" value={10} 
            onChange={(e) => setXp(e.target.value)} 
            required
            />
            <input className="radio_btn" id="orange" type="radio" name="hardness" value={20} 
            onChange={(e) => setXp(e.target.value)} 
            required
            />
            <input className="radio_btn" id="red" type="radio" name="hardness" value={40} 
            onChange={(e) => setXp(e.target.value)} 
            required
            />
            </div>
            <button id="new_task_submit" type="submit">Créer</button>
        </form>
        {error && (
        <div style={{ 
          color: 'red', 
          position: 'absolute',  
          zIndex: 1,
          width: '100%',            
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
       {success && (
        <div style={{ 
          color: 'green', 
          position: 'absolute',  
          zIndex: 1,
          width: '100%',            
          textAlign: 'center'
        }}>
          {success}
        </div>
      )}

     </div>
    )
}

export default NewTask;