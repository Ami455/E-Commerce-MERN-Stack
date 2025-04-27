import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';


export default function FindByCategory() {

    const { categoryId } = useParams();

    const [products, setProducts] = useState([]);

    // Fetch data based on categoryId
    const getData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_CATEGORY_LIST}/${categoryId}/products`);
            console.log(response.data.category);
            
            setProducts(response.data.category.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        if (categoryId) {
            getData();
        }
    }, [categoryId]);


    return (
        <Container>
            <Row className='product-list'>
                {products.length > 0 ? (
                    products.map(product => (
                        <Col key={product.id}>
                            <Card style={{ width: 'fit-content', textAlign: 'center', alignItems: 'center' }}>
                                <Link to={`../details`} state={{ productId: product.id }}>
                                    <Card.Img variant="top" src={product.image} className='productImage' />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>
                                            {product.description || "No description available"}
                                        </Card.Text>
                                    </Card.Body>
                                </Link>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No products found in this category.</p>
                )}
            </Row>
        </Container>
    );
}
