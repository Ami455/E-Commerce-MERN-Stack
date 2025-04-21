import React, { useEffect, useState } from 'react'

import Card from '../../Card/ProductCard';
import { Col, Container, Row } from 'react-bootstrap';
import './Products.css'
import axios  from 'axios';


export default function Products() {

  // const products = [
  //   {
  //     id: 1,
  //     image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png',
  //     name: 'Kid Tapered Slim Fit Trouser',
  //     description:"this is descriptionsdlatsdfsfsffffffffffffj ...............this is description...............this is description...............",
  //     category: 'Kids',
  //     price: 38,
  //     quantity:4,
  //   },
  //   {
  //     id: 2,
  //     image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png',
  //     name: 'Kid Tapered Slim Fit Trouser',
  //     description:"this is descriptionsdlatsdfsfsffffffffffffj ...............this is description...............this is description...............",
  //     category: 'Kids',
  //     price: 38,
  //     quantity:4,
  //   },{
  //     id: 3,
  //     image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png',
  //     name: 'Kid Tapered Slim Fit Trouser',
  //     description:"this is descriptionsdlatsdfsfsffffffffffffj ...............this is description...............this is description...............",
  //     category: 'Kids',
  //     price: 38,
  //     quantity:4,
  //   },{
  //     id: 4,
  //     image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png',
  //     name: 'Kid Tapered Slim Fit Trouser',
  //     description:"this is descriptionsdlatsdfsfsffffffffffffj ...............this is description...............this is description...............",
  //     category: 'Kids',
  //     price: 38,
  //     quantity:4,
  //   }
  //   ,{
  //     id: 5,
  //     image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png',
  //     name: 'Kid Tapered Slim Fit Trouser',
  //     description:"this is descriptionsdlatsdfsfsffffffffffffj ...............this is description...............this is description...............",
  //     category: 'Kids',
  //     price: 38,
  //     quantity:4,
  //   },,{
  //     id: 6,
  //     image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png',
  //     name: 'Kid Tapered Slim Fit Trouser',
  //     description:"this is descriptionsdlatsdfsfsffffffffffffj ...............this is description...............this is description...............",
  //     category: 'Kids',
  //     price: 38,
  //     quantity:4,
  //   },,{
  //     id: 7,
  //     image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png',
  //     name: 'Kid Tapered Slim Fit Trouser',
  //     description:"this is descriptionsdlatsdfsfsffffffffffffj ...............this is description...............this is description...............",
  //     category: 'Kids',
  //     price: 38,
  //     quantity:4,
  //   }]


  const [products,setProducts]=useState([]);
  const [error, setError] = useState(null);

  const getProducts= async()=>{
    console.log(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_PRODUCTS_LIST}`)
    const res= await axios.get(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_PRODUCTS_LIST}`)
   
   

    if (res.status >= 200 && res.status < 300) {
      setProducts(res.data);
      setError(null);
    } else {
    
      setError(res.statusText);
      setProducts([]);
    }
    
  }
useEffect(()=>{
getProducts()
console.log(products)
},[])

  return (
    <>
    {error != null && <p>{error}</p>}
    <Container  >
      <Row className='product-list'>
     {products.length > 0 && products.map(product=> 
      <Col key={product.id}>
        <Card product={product}/>
        </Col>
     )}
    
      </Row>
    </Container>
    
    </>
  )
}
