import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Button ,Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faHeart, faHourglass1, faMinus,faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import FavoriteButton from './favoriteButton';

import { useSelector } from 'react-redux';

export default function Favorite() {
    const navigate = useNavigate();
const [products, setProducts] = useState([]);
const {favoriteCount} = useSelector((state) => state.favorites); 

        const getData = async ()=>{
            try{
                const favorite = await api.get(`${import.meta.env.VITE_FAVORITE_PRODUCTS}`)
         setProducts( favorite.data.products)
         console.log( favorite.data.products)
            }catch(error){
                console.log(error)
            }
        };

    // const toggleFavorite = async (id)=>{
            
    //             await api.post(`${import.meta.env.VITE_FAVORITE_PRODUCTS}/${id}`);

    //       getData();
    //     }
        

        useEffect(()=>{
          getData()
        }
        ,[favoriteCount])

    

  return (
    <>
    
<Container className='mt-5 mb-5'>
<Link to="/category/products">
<Button>
    <FontAwesomeIcon icon={faArrowLeft} /> Continue shopping
</Button>
</Link>
{!products.length? <h1>No Favorites</h1>:

<Table>
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>#</th>
                  <th style={{ width: "15%" }}>Image</th>
                  <th style={{ width: "30%" }}>Name</th>
                  <th style={{ width: "20%" }}>Category</th>
                  <th style={{ width: "5%" }}>Price</th>
                  <th style={{ width: "15%" }}>Favorite</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product,index) =>
                  <tr key={product.id} >
                    <td>{product.id}</td>
                    <td><img src={product.image} className='imageTable' /></td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    {/* <td><Link onClick={() => toggleFavorite(product.id)}><FontAwesomeIcon icon={faHeart} className="custom-icon" /></Link></td> */}
<td><FavoriteButton 
  favorite={true} 
  productId={product.id} 
/></td>
                  </tr>
                )}
              </tbody>
            </Table>
            
} 
</Container>
        



    </>
  )
}
