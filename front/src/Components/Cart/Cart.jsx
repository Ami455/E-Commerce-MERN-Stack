import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Button ,Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMinus,faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';



import './Cart.css'
import { api } from '../../utils/api';
import toast from 'react-hot-toast';


import useCartCount from '../../Hooks/useCartCount';

export default function Cart() {
  
    const navigate = useNavigate();
const [products, setProducts] = useState([]);
const [totalPrice, setTotalPrice] = useState([]);
const {getCartCount} = useCartCount()
        const getData = async ()=>{
            try{
              const cart = await api.get(`${import.meta.env.VITE_CARTPRODUCT}`)
         setProducts( cart.data.products)
         setTotalPrice( cart.data.totalPrice)
            }catch(error){
              console.log(error)
            }
        
       // console.log(cart.data)
        };

        const editQuantity = async (id,operation,index=null)=>{
            
            operation=="+" ?products[index].CartProduct.quantity++:products[index].CartProduct.quantity--;

            if(operation=="*"||products[index].CartProduct.quantity<=0){
                //console.log("delete")
                await api.delete(`${import.meta.env.VITE_CARTPRODUCT}/${id}`);
                
              }else
              {
                if(products[index].CartProduct.quantity>products[index].stock)
                  {
                    products[index].CartProduct.quantity=products[index].stock
                  }
                  await api.put(`${import.meta.env.VITE_CARTPRODUCT}/${id}`,{quantity:products[index].CartProduct.quantity});
                  
                }
                toast.success("Cart updated")
                
            getCartCount()
          getData();
        }
        

        useEffect(()=>{
          getData()
        }
        ,[])

    
const handleCheckout=()=>{
  if(!totalPrice){
toast.error("Cart is empty")
return
  }
    navigate('/checkout', {
        state: {
            totalPrice: totalPrice,
        }
    })
}

  return (
    <>
<Container className="mt-5 mb-5">
  <Table responsive="sm" bordered hover>
    <thead className="bg-main-sub text-white">
      <tr>
        <th>#</th>
        <th>Image</th>
        <th>Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>-</th>
        <th>Quantity</th>
        <th>+</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product, index) => (
        <tr key={product.id}>
          <td>{product.id}</td>
          <td>
            <img
              src={`${import.meta.env.VITE_LOCAL_HOST}/uploads/${product.image}`}
              className="imageTable"
              alt={product.name}
            />
          </td>
          <td>{product.name}</td>
          <td>{product.category}</td>
          <td>{product.price * product.CartProduct.quantity}</td>
          <td>
            <Link onClick={() => editQuantity(product.id, "-", index)}>
              <FontAwesomeIcon icon={faMinus} className="custom-icon" />
            </Link>
          </td>
          <td>{product.CartProduct.quantity}</td>
          <td>
            <Link onClick={() => editQuantity(product.id, "+", index)}>
              <FontAwesomeIcon icon={faPlus} className="custom-icon" />
            </Link>
          </td>
          <td>
            <Link onClick={() => editQuantity(product.id, "*")}>
              <FontAwesomeIcon icon={faTrash} className="custom-icon" />
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>

  <div className="d-flex justify-content-between align-items-center">
    <h2>Total Price: {totalPrice}</h2>
    <Button className="btn-main" onClick={handleCheckout}>
      <FontAwesomeIcon icon={faArrowRight} /> Proceed to Checkout
    </Button>
  </div>
</Container>
        




    </>
  )
}
