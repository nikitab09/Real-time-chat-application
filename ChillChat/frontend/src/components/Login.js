import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login.css';
import Header from './Header';

const Login = () => {
const [username, setUsername] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();

const handleLogin = (e) => {
e.preventDefault();
const trimmedUsername = username.trim();
if (trimmedUsername === '') {
setError('Please enter a valid username!');
return;
}
localStorage.setItem('username', trimmedUsername);
navigate(`/chat/${trimmedUsername}`);
};

return ( <main className="login-page"> <Header />

  <div className="form-container">  
    <h2 className="welcome-msg">Welcome to Chill Chat!</h2>  

    <form onSubmit={handleLogin} className="login-form">  
      <input  
        type="text"  
        placeholder="Enter your username"  
        value={username}  
        onChange={(e) => setUsername(e.target.value)}  
        className={error ? 'input-error' : ''}  
        autoFocus  
      />  

      <button type="submit" className="login-button">  
        Login  
      </button>  
    </form>  

    {error && <p className="error-msg">{error}</p>}  
  </div>  
</main>  

);
};

export default Login;
