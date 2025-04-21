import React from 'react'
import "./ProductCard.css"
export default function ProductCard({product}) {
  return (
    <>
      <div className='productInfo'>
        <div>{product.id} heelo</div>
           <div><img src={product.image}/></div>
           <div>{product.name}</div>
           <div>{product.category}</div>
           <div>{product.price}</div>
           <div>{product.quantity}</div>
           </div>   
    </>
  )
}
