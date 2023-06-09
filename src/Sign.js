import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sign.css';

function Sign() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('user', email);
      navigate('/main');
    } else {
      alert('Invalid sign-in credentials');
    }
  };


  return (
    <div>
      <h1 >Sign In</h1>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <div className='btn'>
        <button type="submit">Sign In</button></div>
      </form>

      
    </div>
  );
}

export default Sign;
