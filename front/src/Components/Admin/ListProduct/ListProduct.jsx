import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { Overlay, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { api } from '../../../utils/api';
import './List.css';

export default function List() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [tooltipShow, setTooltipShow] = useState(false);
  const [tooltipData, setTooltipData] = useState({});
  const [tooltipTarget, setTooltipTarget] = useState(null);

  const getData = async (page = 1) => {
    const data = await api.get(`${import.meta.env.VITE_PRODUCTS_LIST}?page=${page}&limit=16`);
    console.log(data.data);
    setProducts(data.data.items);
    setCurrentPage(data.data.currentPage);
    setTotalPages(data.data.totalPages);
  };

  const deleteData = async (id) => {
    await api.delete(`${import.meta.env.VITE_PRODUCTS_LIST}/${id}`);
    getData(currentPage); // Stay on the same page after deleting
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const handleMouseEnter = (event, product) => {
    setTooltipData(product);
    setTooltipTarget(event.currentTarget);
    setTooltipShow(true);
  };

  const handleMouseLeave = () => {
    setTooltipShow(false);
  };

  // Generate page numbers dynamically
  const renderPagination = () => {
    let items = [];

    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item 
          key={number} 
          active={number === currentPage} 
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev 
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} 
          disabled={currentPage === 1}
        />
        {items}
        <Pagination.Next 
          onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} 
          disabled={currentPage === totalPages}
        />
      </Pagination>
    );
  };

  return (
    <>
      <Table className='bg-light'>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>#</th>
            <th style={{ width: "15%" }}>Image</th>
            <th style={{ width: "30%" }}>Name</th>
            <th style={{ width: "15%" }}>Category</th>
            <th style={{ width: "10%" }}>Price</th>
            <th style={{ width: "10%" }}>Stock</th>
            <th style={{ width: "5%" }}>Delete</th>
            <th style={{ width: "5%" }}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}
              onMouseEnter={(e) => handleMouseEnter(e, product)}
              onMouseLeave={handleMouseLeave}
            >
              <td>{product.id}</td>
              <td>
                <img 
                  src={`${import.meta.env.VITE_LOCAL_HOST}/uploads/${product.image}`} 
                  className='imageTable' 
                  alt={product.name}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.categoryId}</td>
              <td>${parseFloat(product.price).toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>
                <Link onClick={() => deleteData(product.id)}>
                  <FontAwesomeIcon icon={faTrash} className="custom-icon" />
                </Link>
              </td>
              <td>
                <Link to="../product/edit" state={{ productId: product.id }}>
                  <FontAwesomeIcon icon={faPen} className="custom-icon" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Tooltip for hovering */}
      <Overlay target={tooltipTarget} show={tooltipShow} placement="bottom-end">
        {(props) => (
          <Tooltip id="overlay-tooltip" {...props} className='mytooltip'>
            <div className="toolTipDivStyle">
              <div><strong>Product ID:</strong><br />{tooltipData.id}</div>
              <div><img src={`${import.meta.env.VITE_LOCAL_HOST}/uploads/${tooltipData.image}`} className='imageTooltip' alt={tooltipData.name} /></div>
              <div><strong>Name:</strong><br />{tooltipData.name}</div>
              <div><strong>Category:</strong><br />{tooltipData.categoryId}</div>
              <div><strong>Price:</strong><br />${parseFloat(tooltipData.price || 0).toFixed(2)}</div>
              <div><strong>Stock:</strong><br />{tooltipData.stock}</div>
              <div><strong>Description:</strong><br />{tooltipData.description}</div>
            </div>
          </Tooltip>
        )}
      </Overlay>

      {/* Pagination */}
      {renderPagination()}
    </>
  );
}
