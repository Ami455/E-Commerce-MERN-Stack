import "./Home.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [categoryData, setCategoryData] = useState([]);

    const getCategory = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_CATEGORY_LIST}`
            );
            setCategoryData(data.categories || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section className="first container my-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-6">
                        <div className="inner">
                            <div className="fir-left">
                                <h3 className="slogen mt-5">
                                    Wide Collection <br /> Of Home
                                </h3>
                                <h2 className="main-word">Furniture</h2>
                                <p>
                                    Embrace a life of luxury and comfort with Xtra. Our exclusive
                                    furniture collection brings sophistication and timeless
                                    elegance to your home, creating spaces that resonate with your
                                    style.
                                </p>
                                <div className="row">
                                    {["thmb1.jpg", "thmb2.jpg", "thmb3.jpg"].map((img, i) => (
                                        <div className="col-2" key={i}>
                                            <img
                                                src={`https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/${img}`}
                                                className="rounded-4 w-100"
                                                alt="thumbnail"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="inner">
                            <img
                                src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/photo1.png"
                                className="w-100"
                                alt="Main furniture"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Explore Furniture Section */}
            <section className="explore">
                <div className="container">
                    <div className="row align-items-center justify-content-center g-4 mb-4">
                        <div className="col-12">
                            <div className="explore-title">
                                <h3>
                                    Explore Our <br />
                                    <span>Furniture</span> Range:
                                </h3>
                            </div>
                        </div>

                        {/* Static categories
                        {["icon1.png", "icon2.png", "icon3.png", "icon4.png", "icon5.png"].map((icon, i) => (
                            <div className="col-2" key={i}>
                                <div className="categ">
                                    <img
                                        src={`https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/${icon}`}
                                        className="w-100 object-fit-contain"
                                        alt="Category"
                                    />
                                    <h5 className="sofa-text">Sofa</h5>
                                </div>
                            </div>
                        ))} */}

                        {/* Dynamic categories from API */}
                        {categoryData.map((cat, index) => (
                            <React.Fragment key={cat.id}>
                                <div className="col-2">
                                    <div className="categ py-3">
                                        <a href={`/category/${cat.id}`} className="text-decoration-none">
                                            <img
                                                src= {cat.image}
                                                className="w-100 object-fit-contain"
                                                alt={cat.name}
                                            />
                                            <h5 className="sofa-text">{cat.name}</h5>
                                        </a>
                                    </div>
                                </div>

                                {index === 4 && <div className="col-1"></div>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>

            {/* Two Section Blocks */}
            
                <section >
                    <div className="container my-5">
                        <div className="row">
                            <div className="col-6">
                                <img
                                    src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/photo2.jpg"
                                    className="w-100"
                                    alt="Explore store"
                                />
                            </div>
                            <div className="col-6">
                                <div className="contain">
                                    <h2 className="mt-5">
                                        Explore
                                        <br />Xtra <span>Furniture</span>
                                        <br />
                                        <span>Stores</span> for
                                        <br />
                                        latest collection
                                    </h2>
                                    <p className="my-3">
                                        Sofa, bed, desk, chairs, tables, there’s something so
                                        enjoyable about slowly meandering through furniture stores.
                                    </p>
                                    <button>See collection</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            

            {/* Product Grid Section */}
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="contain">
                                <h2 className="mt-5">
                                    Explore
                                    <br />Xtra <span>Furniture</span>
                                    <br />
                                    <span>Stores</span> for
                                    <br />
                                    latest collection
                                </h2>
                                <p className="my-3">
                                    Sofa, bed, desk, chairs, tables, there’s something so enjoyable about slowly meandering through furniture stores.
                                </p>
                                <button>See collection</button>
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="row">
                                {[
                                    { img: "p20-600x600.jpg", name: "Flower Lamp" },
                                    { img: "p22-600x600.jpg", name: "Triangle Stool" },
                                    { img: "p23-600x600.jpg", name: "Gray Simple Sofa" },
                                    { img: "p26i-600x600.jpg", name: "Modern Lounge" },
                                ].map((product, i) => (
                                    <div className="col-6" key={i}>
                                        <img
                                            src={`https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2019/09/${product.img}`}
                                            alt={product.name}
                                            className="w-100"
                                        />
                                        <button className="btn card-button w-50">{product.name}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            {/* <section>
                <div className="container my-5">
                    <div className="row align-items-center justify-content-center">
                        {[1, 2, 3].map((f) => (
                            <div className="col-4 the-f" key={f}>
                                <div className="feature text-center">
                                    <h2>Lorem ipsum dolor sit.</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, quas!</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Info Cards Section */}
            <section>
                <div className="container my-5">
                    <div className="row text-center justify-content-center gap-3">
                        {[
                            {
                                img: "icon11.png",
                                title: "FREE SHIPPING WORLDWIDE",
                                desc: "We offer free shipping via Standard Shipping on orders over $200.00",
                            },
                            {
                                img: "icon12.png",
                                title: "MONEY BACK GUARANTEE",
                                desc: "If you're not satisfied with our product, we’ll refund the purchase price.",
                            },
                            {
                                img: "icon13.png",
                                title: "ONLINE FRIENDLY SUPPORT 24/7",
                                desc: "Our friendly support team is available to help you 24 hours a day in whole week.",
                            },
                        ].map((card, i) => (
                            <div className="col-md-3 card-box p-4 rounded-4" key={i}>
                                <div className="icon-circle mb-3 mx-auto">
                                    <img
                                        src={`https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/${card.img}`}
                                        width="40"
                                        alt={card.title}
                                    />
                                </div>
                                <h5 className="fw-bold">{card.title}</h5>
                                <p className="text-muted">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Last Section */}
            <section>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-6">
                            <img
                                src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/photo3.jpg"
                                alt="Wooden Furniture"
                                className="w-100"
                            />
                        </div>
                        <div className="col-6">
                            <div className="contain">
                                <h2 className="mt-5">
                                    Solution for
                                    <br /> all your
                                    <br /> Wooden <span>Furniture</span>
                                    <br /> needs
                                    <br /> collection
                                </h2>
                                <button>See collection</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
