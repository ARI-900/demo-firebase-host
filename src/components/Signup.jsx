import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../Firebase'; 
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";



export default function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();

    if(!email || !password || !confirmPassword) {
      alert('Please enter email, password and confirm password');
      return ;
    }


    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }


    // Add your signup logic here
    try {
        const auth = getAuth(app);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        if(userCredential) {
            confirm("Signup Successfull");
            navigate('/');
        }
        else {
            alert("Signup Failed");
        }
    }
    catch(error) {
        console.warn("Error Occures in handleSignup fucntion");
        console.log(error.message);
    }
    finally {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }
  };




  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Signup</h2>
      <form onSubmit={handleSignup} style={styles.form}>
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
          autoComplete='off'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          autoCapitalize='off'
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Signup
        </button>
      </form>
      <div>
        <p>Already have an account? <Link to="/">Login</Link></p>
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
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
  },
};