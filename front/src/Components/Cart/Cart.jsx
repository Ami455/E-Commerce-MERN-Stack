
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Button ,Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck, faCreditCard, faCreditCardAlt, faMinus, faPen, faPenNib, faPlus, faShoppingBag, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
import './Cart.css'

export default function Cart() {
    const navigate = useNavigate();
const [products, setProducts] = useState([]);
const [totalPrice, setTotalPrice] = useState([]);

        const getData = async ()=>{
            const cart = await axios.get(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_CARTPRODUCT}`)
         setProducts( cart.data.products)
         setTotalPrice( cart.data.totalPrice)
        
       // console.log(cart.data)
        };

        const editQuantity = async (id,operation,index=null)=>{
            
            operation=="+" ?products[index].CartProduct.quantity++:products[index].CartProduct.quantity--;

            if(operation=="*"||products[index].CartProduct.quantity<=0){
                //console.log("delete")
                await axios.delete(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_CARTPRODUCT}/${id}`);
            }else
            {
               if(products[index].CartProduct.quantity>products[index].stock)
               {
                products[index].CartProduct.quantity=products[index].stock
               }
                await axios.put(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_CARTPRODUCT}/${id}`,{quantity:products[index].CartProduct.quantity});


            }
            
          getData();
        }
        

        useEffect(()=>{
          getData()
        }
        ,[])

    
const handleCheckout=()=>{
    navigate('/checkout', {
        state: {
            totalPrice: totalPrice,
        }
    })
}

  return (
    <>
<Container className='mt-5 mb-5'>
<Table>
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>#</th>
                  <th style={{ width: "15%" }}>Image</th>
                  <th style={{ width: "30%" }}>Name</th>
                  <th style={{ width: "15%" }}>Category</th>
                  <th style={{ width: "5%" }}>Price</th>
                  <th style={{ width: "5%" }}>-</th>
                  <th style={{ width: "5%" }}>Quantity</th>
                  <th style={{ width: "5%" }}>+</th>
                  <th style={{ width: "5%" }}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product,index) =>
                  <tr key={product.id} >
                    <td>{product.id}</td>
                    <td><img src={product.image} className='imageTable' /></td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price*product.CartProduct.quantity}</td>
                   <td><Link onClick={() => editQuantity(product.id,"-",index)}><FontAwesomeIcon icon={faMinus} className="custom-icon" /></Link></td>
                    <td>{product.CartProduct.quantity}</td>
                    <td><Link onClick={() => editQuantity(product.id,"+",index)}><FontAwesomeIcon icon={faPlus} className="custom-icon" /></Link></td>
                    <td><Link onClick={() => editQuantity(product.id,"*")}><FontAwesomeIcon icon={faTrash} className="custom-icon" /></Link></td>

                  </tr>
                )}
              </tbody>
            </Table>
            <h1>Total Price: {totalPrice}</h1>
            <Button onClick={handleCheckout}>
    <FontAwesomeIcon icon={faArrowRight} /> Proceed to Checkout
</Button>
         
</Container>
        



    </>
  )
}
