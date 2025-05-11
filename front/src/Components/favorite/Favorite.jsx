import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import FavoriteButton from './favoriteButton';
import { useSelector } from 'react-redux';

export default function Favorite() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { favoriteCount } = useSelector((state) => state.favorites);

  const getData = async () => {
    try {
      const favorite = await api.get(`${import.meta.env.VITE_FAVORITE_PRODUCTS}`);
      setProducts(favorite.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [favoriteCount]);

  return (
    <>
      <Container className="mt-5 mb-5">
        <Link to="/category/products">
          <Button>
            <FontAwesomeIcon icon={faArrowLeft} /> Continue shopping
          </Button>
        </Link>

        {!products.length ? (
          <h1 className="text-center mt-5">No Favorites</h1>
        ) : (
          <Table striped bordered hover responsive className="mt-4">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Favorite</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`${import.meta.env.VITE_LOCAL_HOST}/uploads/${product.image}`}
                      alt={product.name}
                      className="img-fluid rounded"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>
                    <Link
                      to="/category/details"
                      state={{ productId: product.id }}
                      className="text-decoration-none text-dark"
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td>{product.categoryId}</td>
                  <td>${product.price}</td>
                  <td>
                    <FavoriteButton favorite={true} productId={product.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}
