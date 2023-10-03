import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from './login.module.css'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()
 
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      console.log(email, password);
      const res = await fetch(`http://localhost:5000/auth/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (res.status === 404) {
        throw new Error("Wrong credentials");
      }
      const data = await res.json(); // Read and parse the response body once
      console.log(data); // Use the parsed data
  
      navigate('/');
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
      console.error(error);
    }
  };
  
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Login</h2>
        <form onSubmit={handleLogin}>
                <label htmlFor="email">
                    <input  type="email" id='email' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label htmlFor="password">
                    <input type="password" id='password' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button className={classes.submitBtn}>Login</button>
                <Link to="/register">Don't have an account? <p className={classes.register}>Register now</p></Link>
            </form>
            {error && 
           <div className={classes.errorMessage}>
                Wrong credentials! Try different ones.
            </div>
            }
      </div>
    </div>
  )
}

export default Login