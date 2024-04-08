import React, { useState } from 'react';

const RegistrationForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await fetch('http://localhost:5001/auth/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Registration successful
      } else {
        const error = await response.json();
        console.error('Registration failed:', error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  



  return (
    <div className='Register'>
      <h2>Registration</h2>
      <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Username'/>

      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>

      <button onClick={handleRegistration}>Register</button>
      
    </div>
  );
};

export default RegistrationForm;