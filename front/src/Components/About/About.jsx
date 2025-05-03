import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../../images/navLogo.png';

export default function About() {
    return (
        <div className="text-dark">
            {/* Mission Section */}
            <section className="py-5">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h2 className="mb-4">Our Mission</h2>
                            <p className="mb-4">
                                At ComfyHome, we believe that furniture should be more than just functional—it should inspire and elevate your daily living experience. 
                                Our mission is to provide high-quality, thoughtfully designed furniture that brings comfort, style, and harmony to your home.
                            </p>
                            <p>
                                We're committed to sustainable practices, exceptional craftsmanship, and customer satisfaction. Every piece is carefully selected to ensure durability, beauty, and value.
                            </p>
                        </Col>
                        <Col md={6} className="text-center position-relative">
                            <div className="bg-light rounded overflow-hidden">
                                <Image 
                                    src={logo}
                                    alt="Craftsman working on furniture" 
                                    fluid 
                                />
                            </div>
                            
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Core Values Section */}
            <section className="py-5">
                <Container>
                    <h2 className="text-center text-warning mb-5">Our Core Values</h2>
                    <Row className="g-4">
                        {[
                            { title: "Quality Craftsmanship", text: "Exceptional materials and skilled craftsmanship in every piece." },
                            { title: "Sustainable Practices", text: "Environmentally responsible sourcing and manufacturing." },
                            { title: "Customer Satisfaction", text: "Outstanding service and lasting customer relationships." },
                            { title: "Innovative Design", text: "Functional and contemporary designs for modern living." }
                        ].map((value, idx) => (
                            <Col xs={12} sm={6} lg={3} key={idx}>
                                <Card bg="light" text="dark" className="h-100 border-0 shadow-sm">
                                    <Card.Body className="text-center">
                                        <div className="mb-3">
                                            <FontAwesomeIcon icon={faCheckCircle} size="2x" className="text-warning" />
                                        </div>
                                        <Card.Title className="mb-3">{value.title}</Card.Title>
                                        <Card.Text>{value.text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </div>
    );
}
