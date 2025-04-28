      import React, { useEffect, useState } from 'react'
      import Table from 'react-bootstrap/Table';
      import './List.css'
      import {  Overlay, Tooltip } from 'react-bootstrap';
      import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
      import { faPen, faPenNib, faTrash } from '@fortawesome/free-solid-svg-icons';
      import { Link } from 'react-router-dom';

import { api } from '../../../utils/api';

      export default function List() {

        const [products, setProducts] = useState([]);

        const getData = async ()=>{
          const data = await api.get(`${import.meta.env.VITE_PRODUCTS_LIST}`)
          console.log(data.data.items)
          setProducts( data.data.items)
        };

        const deleteData = async (id)=>{
          await api.delete(`${import.meta.env.VITE_PRODUCTS_LIST}/${id}`);
          getData();
        }


        useEffect(()=>{
          getData()
        }
        ,[])


        const [tooltipShow, setTooltipShow] = useState(false);
        const [tooltipData, setTooltipData] = useState({});
        const [tooltipTarget, setTooltipTarget] = useState(null);
        
        const handleMouseEnter = (event, product) => {
          setTooltipData(product);
          setTooltipTarget(event.currentTarget);
          setTooltipShow(true);
        };

        const handleMouseLeave = () => {
          setTooltipShow(false);
        };
        return (
          <>

            <Table>
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>#</th>
                  <th style={{ width: "15%" }}>Image</th>
                  <th style={{ width: "30%" }}>Name</th>
                  <th style={{ width: "15%" }}>Category</th>
                  <th style={{ width: "5%" }}>Price</th>
                  <th style={{ width: "5%" }}>Stock</th>
                  <th style={{ width: "5%" }}>Edit</th>
                  <th style={{ width: "5%" }}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) =>
                  <tr key={product.id} /*onMouseEnter={() => setIsHoverInfo(true)} 
              onMouseLeave={() => setIsHoverInfo(false)}*/
                    onMouseEnter={(e) => handleMouseEnter(e, product)}
                    onMouseLeave={handleMouseLeave}>
                    <td>{product.id}</td>
                    <td><img src={product.image} className='imageTable' /></td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    {/* <td><Button className='iconButton' onClick={()=>alert("mm")}><FontAwesomeIcon icon={faTrash} className="custom-icon"/></Button></td>
                <td><Button className='iconButton' onClick={()=>fnEdit}><FontAwesomeIcon icon={faPen} className="custom-icon"/></Button></td> */}
                    <td><Link onClick={() => deleteData(product.id)}><FontAwesomeIcon icon={faTrash} className="custom-icon" /></Link></td>
                    <td><Link to="../edit" state={{ productId: product.id }}><FontAwesomeIcon icon={faPen} className="custom-icon" /></Link></td>
                    {/* {isHoverInfo && (<tr><ProductCard product={product}/></tr>)} */}

                  </tr>
                )}


              </tbody>
            </Table>

            <Overlay target={tooltipTarget} show={tooltipShow} placement="bottom-end" >
              {(props) => (
                <Tooltip id="overlay-tooltip"  {...props} className='mytooltip' >
                  <div className="toolTipDivStyle">
                    <div ><strong>Product ID:</strong><br />{tooltipData.id}</div>
                    <div ><img src={tooltipData.image} className='imageTooltip' alt={tooltipData.name} /></div>
                    <div><strong>Name:</strong><br />{tooltipData.name}</div>
                    <div><strong>Category:</strong><br />{tooltipData.category}</div>
                    <div><strong>Price:</strong><br />${tooltipData.price}</div>
                    <div><strong>Stock:</strong><br />{tooltipData.stock}</div>
                    <div><strong>Description:</strong><br />{tooltipData.description}</div>
                  </div>

                </Tooltip>
              )}
            </Overlay>



          </>
        );


      }
