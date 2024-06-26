import React, {  useState } from 'react';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import URL from '../url';

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  

const navigate = useNavigate()
Axios.defaults.withCredentials= true

const handleSubmit = (e) => {
  
    e.preventDefault()
    Axios.post(`http://${URL.code}:5001/auth/login`, {
        userName,
        password
    }).then(response => {
        if(response.data.token) {
          localStorage.setItem('token', response.data.token)
            navigate('/')
          setTimeout(() => {
            localStorage.removeItem('token')
          }, 3600000)

        }
        
    }).catch(err => {
      if (err.response && err.response.status === 401) {
        setLoginError('Invalid username or password.');
      } else {
        setLoginError('An error occurred. Please try again later.');
      }
    })
}




  return (
    <div className='Login'>
      <h2>Login</h2>
      
      {loginError && <p className='error__login'>{loginError}</p>}
      <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='User Name' autoComplete="off"/>
      
      
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>

      <button onClick={handleSubmit}>Sign In</button>
    </div>
  );
};

export default LoginForm;




