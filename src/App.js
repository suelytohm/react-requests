import './App.css';
import { useState, useEffect } from 'react';

const axios = require('axios').default;

function App() {

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

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



  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price: parseFloat(price),
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product),
    });

    // Carregamento dinâmico

    const addedProducts = await res.json();
    setProducts((prevProducts) => [...prevProducts, addedProducts]);

    // Limpando dados

    setName("");
    setPrice("");
    
  };

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
        <div className="add-product">
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input type="text" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Preço:
              <input type="number" name="price" required value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>   
            <input type="submit" value="Enviar" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
