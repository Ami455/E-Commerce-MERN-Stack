import React, { useEffect, useState } from 'react'

import Card from '../../Card/ProductCard';
import { Button, Col, Container, Row } from 'react-bootstrap';
import './Products.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export default function Products() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [error, setError] = useState(null);

  const getCart = async (id) => {
    const cart = await axios.get(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_CARTPRODUCT}`)
    setCart(cart.data.products)
  };
  const getProducts = async () => {
   // console.log(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_PRODUCTS_LIST}`)
    const res = await axios.get(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_PRODUCTS_LIST}`)




    if (res.status >= 200 && res.status < 300) {
      setProducts(res.data);
     // console.log(res.data)
      setError(null);
    } else {

      setError(res.statusText);
      setProducts([]);
    }

  }
  const editQuantity = async (id, operation, index = null) => {
    if (operation == "#") {
      await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_CARTPRODUCT}/${id}`,{ quantity: 1 } );

    } else {
      
      let count = getProductQuantity(id)
      operation == "+" ? count++ : count--;

      //count = Math.min(Math.max(count, 1), products[index].stock);
     // console.log(count)
      await axios.put(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_CARTPRODUCT}/${id}`, { quantity: count });

    }

    getProducts()
    getCart()
  }


  const getProductQuantity = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    return cartItem ? cartItem.CartProduct.quantity : 0;
  };
  useEffect(() => {
    getProducts()
    getCart()
   
  }, [])
 const l=()=> { 
  const productWithId44 = products.find(product => product.id === 44)
    if (productWithId44) {
      console.log('Product with id 44:', productWithId44);
    }}
  return (
    <>
    {console.log(l())}
      {error != null && <p>{error}</p>}
      <Container  >
        <Row className='product-list'>
          {products.length > 0 && products.map((product, index) =>
            <Col key={product.id}>
              <Card product={product} />

              {getProductQuantity(product.id) > 0 ?
                (<div className='w-75 bg-primary d-flex justify-content-between '>
                  <Link onClick={() => editQuantity(product.id, "-", index)}><FontAwesomeIcon icon={faMinus} className="custom-icon" /></Link>
                    {getProductQuantity(product.id)}  
                  <Link onClick={() => editQuantity(product.id, "+", index)}><FontAwesomeIcon icon={faPlus} className="custom-icon" /></Link>
                </div>)
                :
                <Button onClick={() => editQuantity(product.id, "#", index)} variant="primary" className='w-75 mb-3'>Add to Cart</Button>}

            </Col>
          )}

        </Row>
      </Container>

    </>
  )
}



