import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../Firebase';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    if(!email || !password) {
      alert('Please enter email and password');
      return ;
    }

    // Add your login logic here
   try {

        const auth = getAuth(app);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        if(userCredential) {
            confirm("Login Successfull");
            // localStorage.setItem("user", JSON.stringify(userCredential.user)); // dont need as state is maintained by firebase
            navigate('/products');
        }
   } 
   catch (error) {
        console.warn("Error Occures in handleLogin fucntion");
        console.log(error.message); 
   }
   finally {
        setEmail("");
        setPassword("");
   }
   
  };






  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete='on'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      <div>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
  },
};