import './App.css';
import { useState, useEffect } from 'react';

const axios = require('axios').default;


function App() {

  const [products, setProducts] = useState([]);
  const url = "http://localhost:3000/products";

  // Request usando axios
  useEffect(() => {
    (async () => {
      await axios.get(url).then(function (response) {
        console.log(response.data);
    
    
      }).catch(function (error) {
        console.log(error)
      })
    })();

  }, []);

  


  // Request usando fetch

  useEffect(() => {

    (async () => {
      const res = await fetch(url);
  
      const data = await res.json();
  
      setProducts(data);

    })();
  }, []);



  return (
    <div className="App">
      <div className="title">
        <h1>Lista de produtos</h1>
      </div>
      <div>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <div key={product.id} className="card">
                <h3 className="product-title">
                  {product.name}
                </h3>
                <p className="product-price">
                  R${product.price.toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default App;
