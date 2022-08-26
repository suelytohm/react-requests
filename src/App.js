import './App.css';
import logo from './loading.gif';
import { useState, useEffect } from 'react';


import { useFetch } from './hooks/useFetch';

const axios = require('axios').default;

function App() {

  const [products, setProducts] = useState([]);
  
  const url = "http://localhost:3000/products";
  
  const { data: items, httpConfig, loading, error } = useFetch(url);
  
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);



// Request usando axios
/*
useEffect(() => {
  (async () => {
    await axios.get(url).then(function (response) {
      // console.log(response.data);
  
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
*/

  /*
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
  */
  // Limpando dados

  const handleRemove = (id) => {
      httpConfig(id, "DELETE");
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price: parseFloat(price),
    };



    
    
    httpConfig(product, "POST");
    
    setName("");
    setPrice("");
    
  };
  
  return (
    <div className="App">
      <div className="title">
        <h1>Lista de produtos</h1>
      </div>
      <div>
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
            {/** Loading Post */}
            {loading && <input type="submit" disabled value="Aguarde" />}
            {!loading && <input type="submit" value="Enviar" />}

            
          </form>
        </div>  
        { /** Loading */}
        {loading && <img src={logo} alt="Carregando dados" />}         
        {error && <p>{error}</p>}
        {!loading &&         
        <ul>
          {items && items.map((product) => (
            <li key={product.id}>
              <div key={product.id} className="card">
                <h3 className="product-title">
                  {product.name}
                </h3>
                <p className="product-price">
                  R${product.price.toFixed(2)}
                </p>
                <button className="btn-delete" onClick={() => handleRemove(product.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
        }
      </div>
    </div>
  );
}

export default App;
