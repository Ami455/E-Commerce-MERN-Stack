import "./Home.css";
import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Logo from "./images/1.jpg";

export default function Home() {
    const [categoryData, setCategoryData] = useState([]);

    const getCategory = async () => {
        const data = await api.get(`${import.meta.env.VITE_CATEGORY_LIST}`);
        setCategoryData(data.data.categories);
    };

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section className="container py-5">
                <div className="row align-items-center text-center text-md-start g-5">
                    <div className="col-md-6">
                        <img src={Logo} alt="Home Banner" className="img-fluid rounded-4 shadow-sm mb-4" />
                        <h1 className="fw-bold mb-3">Luxury Home Furniture</h1>
                        <p className="lead text-muted mb-4">
                            Create spaces that reflect your style with Xtra's timeless and sophisticated furniture collection.
                        </p>
                        <Button
                            as={Link}
                            to="/category/products"
                            variant="dark"
                            size="lg"
                            className="rounded-pill px-5"
                        >
                            Shop Now
                        </Button>
                    </div>
                    <div className="col-md-6">
                        <img
                            src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/photo1.png"
                            alt="Furniture Hero"
                            className="img-fluid rounded-5 shadow-lg"
                        />
                    </div>
                </div>
            </section>


            {/* Categories Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">
                            Explore Our <span className="text-primary">Furniture</span> Range
                        </h2>
                        <p className="text-muted">Find the perfect piece for every room in your home.</p>
                    </div>

                    <div className="row justify-content-center g-4">
                        {categoryData.map((cat, index) => (
                            <React.Fragment key={cat.id}>
                                <div className="col-6 col-sm-4 col-md-2">
                                    <Link
                                        to={`/category/products?category=${cat.name}`}
                                        className="text-decoration-none text-dark text-center d-block"
                                    >
                                        <div className="card border-0 shadow-sm h-100 p-3 rounded-4 hover-shadow">
                                            <div
                                                className="d-flex justify-content-center align-items-center mb-2"
                                                style={{ height: "100px" }}
                                            >
                                                <img
                                                    src={cat.image}
                                                    alt={cat.name}
                                                    style={{
                                                        maxHeight: "80px",
                                                        width: "auto",
                                                        objectFit: "contain",
                                                    }}
                                                    className="img-fluid"
                                                />
                                            </div>
                                            <h6 className="fw-bold">{cat.name}</h6>
                                        </div>
                                    </Link>
                                </div>

                                {/* Fill empty column after every 5th card to push layout nicely */}
                                {(index + 1) % 5 === 0 && <div className="w-100 d-none d-md-block"></div>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>


            {/* Featured Banner */}
            <section className="container py-5">
                <div className="row g-5 align-items-center">
                    <div className="col-md-6">
                        <img
                            src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/photo2.jpg"
                            alt="Collection"
                            className="img-fluid rounded-5 shadow-lg"
                        />
                    </div>
                    <div className="col-md-6">
                        <h2 className="fw-bold mb-4">Discover Our Exclusive Collection</h2>
                        <p className="text-muted mb-4">
                            Handcrafted furniture pieces curated for elegance and comfort. Redefine your living spaces today.
                        </p>
                        <Button variant="outline-dark" size="lg" className="rounded-pill px-5">
                            Explore Collection
                        </Button>
                    </div>
                </div>
            </section>

            {/* New Arrivals */}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center fw-bold mb-5">New Arrivals</h2>
                    <div className="row g-4">
                        {[
                            { img: "p20-600x600.jpg", label: "Flower Lamp" },
                            { img: "p22-600x600.jpg", label: "Triangle Stool" },
                            { img: "p23-600x600.jpg", label: "Simple Gray Sofa" },
                            { img: "p26i-600x600.jpg", label: "Modern Lounge" },
                        ].map((item, i) => (
                            <div key={i} className="col-6 col-md-3">
                                <div className="card border-0 h-100 shadow-sm hover-shadow">
                                    <img
                                        src={`https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2019/09/${item.img}`}
                                        alt={item.label}
                                        className="card-img-top rounded-top"
                                    />
                                    <div className="card-body text-center">
                                        <h6 className="fw-bold">{item.label}</h6>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="container py-5 text-center">
                <div className="row row-cols-1 row-cols-md-3 g-5">
                    {[
                        {
                            img: "icon11.png",
                            title: "Free Shipping",
                            desc: "Enjoy free shipping worldwide on orders over $200.",
                        },
                        {
                            img: "icon12.png",
                            title: "Money Back Guarantee",
                            desc: "Satisfaction guaranteed or your money back.",
                        },
                        {
                            img: "icon13.png",
                            title: "24/7 Support",
                            desc: "Friendly customer support available any time.",
                        },
                    ].map((service, index) => (
                        <div key={index} className="col">
                            <div className="p-4 border rounded-5 shadow-sm hover-shadow h-100">
                                <img
                                    src={`https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/${service.img}`}
                                    alt={service.title}
                                    width="60"
                                    className="mb-4"
                                />
                                <h5 className="fw-bold">{service.title}</h5>
                                <p className="text-muted">{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="container py-5">
                <div className="row align-items-center g-5">
                    <div className="col-md-6 order-2 order-md-1">
                        <h2 className="fw-bold mb-4">Solutions for All Your Wooden Furniture Needs</h2>
                        <Button variant="dark" size="lg" className="rounded-pill px-5">
                            Browse Collection
                        </Button>
                    </div>
                    <div className="col-md-6 order-1 order-md-2">
                        <img
                            src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/photo3.jpg"
                            alt="Final Banner"
                            className="img-fluid rounded-5 shadow-lg"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
