import axios from 'axios';
import React, { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const auth = getAuth();


function ProductCard() {

    const [user, setUser] = useState(null);
    const [products, setProducts] = useState(null);
    const Navigate = useNavigate();


    async function fetchData() {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
      }
      catch (error) {
        console.warn("Error Occures in fetchData fucntion");
        console.log(error.message);
      }
    }


   useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user) {
            setUser(user);
            fetchData();
            console.log("hello", user);
        }
        else {
            Navigate("/");
        }
    })
        return () => {
            unsubscribe();
        }
   }, [])




  if (!products) {
    return (
      <p style={{
        height: '100%', width: '100vw', display: 'flex', justifyContent: 'center',
        alignItems: 'center', fontSize: '3rem', color: 'red', fontWeight: 'bold'
      }}>Loading...</p>
    )
  }
  


  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem'  }}>
            <h1>Products of <span style={{ color: 'red', fontWeight: 'bold', fontSize: '2rem', textTransform: 'capitalize', textDecoration: 'underline' }}>{user.email.split('@')[0]}</span></h1>
            <button
                onClick={() => auth.signOut()}
                style={{ backgroundColor: 'red', color: 'white', padding: '1rem 2rem', borderRadius: '10px', fontSize: '1rem' }}
            >Logout</button>
        </div>
      {
        products.map((product, index) => {
          return (
            <div key={product.id}>
              <img src={product.image} alt={`img-${index}`} style={{ width: '20%', height: 'auto', objectFit: 'cover' }} />
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <big>{product.category}</big>
              <p>{product.price}</p>
              <div style={{ display: 'flex', gap: 2 }}>
                <p style={{ color: 'yellow' }}>{product.rating.rate} of</p>
                <p style={{ color: 'red' }}>{product.rating.count}</p>
              </div>
              <hr style={{ backgroundColor: 'red', marginBottom: '2rem' }} />
            </div>
          )
        })
      }
    </div>
  )
}

export default ProductCard
