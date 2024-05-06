import React, { useState } from 'react';
import URL from '../url';

const RegistrationForm = ({ onRegistrationSuccess }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameTrue, setUserNameTrue] = useState(' ')

  const handleRegistration = async () => {
    try {
      const response = await fetch(`http://${URL.code}:5001/auth/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); 
        onRegistrationSuccess();
      } else {
        const error = await response.json();
        console.error('Registration failed:', error.message);
        
        const errorMessage = error.message
        setUserNameTrue(errorMessage)
        
        
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setUserNameTrue('Register is succesfuly.');
      } else {
        setUserNameTrue('User with this username already existss.');
      }
    }
  };


  



  return (
    <div className='Register'>
      <h2>Registration</h2>
      {userNameTrue && <p className='error__login'>{userNameTrue}</p>}
      <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Username'/>

      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>

      <button onClick={handleRegistration}>Register</button>
      
    </div>
  );
};

export default RegistrationForm;