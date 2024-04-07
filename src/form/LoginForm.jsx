import React, {  useState } from 'react';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  

const navigate = useNavigate()
Axios.defaults.withCredentials= true

const handleSubmit = (e) => {
  
    e.preventDefault()
    Axios.post('http://localhost:5000/auth/login', {
        userName,
        password
    }).then(response => {

      
        if(response.data.token) {
            navigate('/')
            console.log(response.data.token)
        }
        
    }).catch(err => {
        console.log(err)
    })
}




  return (
    <div className='Login'>
      <h2>Login</h2>
      
      
      <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='User Name' autoComplete="off"/>
      
      
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>

      <button onClick={handleSubmit}>Sign In</button>
    </div>
  );
};

export default LoginForm;




