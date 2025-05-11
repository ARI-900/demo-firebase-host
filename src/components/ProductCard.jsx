import axios from 'axios';
import React, { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;


function ProductCard() {

  const [products, setProducts] = useState(null);

  useEffect(() => {

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
    fetchData();
  }, []);

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
