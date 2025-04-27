import "./Home.css"
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Home() {

    const [categoryData, setCategoryData] = useState([]);

    const getCategory = async () => {
        const data = await axios.get(
            `${import.meta.env.VITE_LOCAL_HOST}/${import.meta.env.VITE_CATEGORY_LIST}`
        );
        setCategoryData(data.data.categories);
    };

    useEffect(() => {
        getCategory();
    }, []);
    return (
        <>

        <section className="first container  my-5 ">
            <div className="row justify-content-center align-items-center">
                <div className="col-6 ">
                    <div className="inner ">
                        <div className="fir-left">
                            <h3 className="slogen mt-5">Wide Collection <br />Of Home</h3>
                            <h2 className="main-word">Furniture</h2>
                            <p>Embrace a life of luxury and comfort with Xtra. Our exclusive furniture collection brings sophistication and timeless elegance to your home, creating spaces that resonate with your style.</p>
                            <div className="row">
                                <div className="col-2 ">
                                    <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/thmb1.jpg" className="rounded-4" alt="" />
                                </div>
                                <div className="col-2 ">
                                    <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/thmb2.jpg" className="rounded-4" alt="" />
                                </div>
                                <div className="col-2 ">
                                    <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/thmb3.jpg" className="rounded-4" alt="" />
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 ">
                        <div className="inner">
                            <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/photo1.png" className="w-100 " alt="" />
                        </div>
                    </div>
                </div>
            </section>


        <section className="explore">
            <div className="container">
                <div className="row  align-items-center justify-content-center g-4 mb-4">
                    <div className="col-12 justify-content-start ">
                        <div className="explore-title">
                        <h3>Explore Our<br/><span >Furniture</span> Range:</h3>
                        </div>
                    </div>
                    <div className="col-2 ">
                        <div className="categ ">
                            <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon1.png"  className="w-100 object-fit-contain " alt="" />
                            <h5 className="sofa-text"> sofa</h5>
                        </div>
                    </div>
                    <div className="col-2 ">
                        <div className="categ ">
                            <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon2.png"  className="w-100 object-fit-contain " alt="" />
                            <h5 className=""> sofa</h5>
                        </div>
                    </div>
                    <div className="col-2 ">
                        <div className="categ ">
                            <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon3.png"  className="w-100 object-fit-contain " alt="" />
                            <h5 className=""> sofa</h5>
                        </div>
                    </div>
                    <div className="col-2 ">
                        <div className="categ ">
                            <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon4.png"  className="w-100 object-fit-contain " alt="" />
                            <h5 className=""> sofa</h5>
                        </div>
                    </div>
                    
                    <div className="col-2   ">
                        <div className="categ ">
                            <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon5.png"  className="w-100 object-fit-contain " alt="" />
                            <h5 className=" "> sofa</h5>

                         </div>

                        </div>
                        {categoryData.map((cat, index) => (
                            <React.Fragment key={cat.id}>
                                <div className="col-2">
                                    <div className="categ py-3">
                                        <a href="/home" className="text-decoration-none">
                                        <img src={cat.image} className="w-100 object-fit-contain" alt="" />
                                        <h5 className="sofa-text">{cat.name}</h5>
                                        </a>
                                        </div>
                                </div>

                                {index === 4 && (   // <== notice: after index 4 (the 5th element)
                                    <div className="col-1" key={`empty-${cat.id}`}></div>
                                )}
                            </React.Fragment>
                        ))}
                        <div className="col-1 ">

                        </div>
                    </div>
                </div>

            </section>
            <section>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-6">
                            <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/photo2.jpg" alt="" />

                        </div>
                        <div className="col-6 ">
                            <div className="contain">
                                <h2 className="mt-5">Explore<br />Xtra <span >Furniture</span><br /> <span >Stores</span> for<br />latest collection</h2>
                                <p className="my-3">Sofa, bed, desk, chairs, tables, there’s something so enjoyable about slowly meandering through furniture stores.</p>
                                <button>See collection</button>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-6 ">
                            <div className="contain">
                                <h2 className="mt-5">Explore<br />Xtra <span >Furniture</span><br /> <span >Stores</span> for<br />latest collection</h2>
                                <p className="my-3">Sofa, bed, desk, chairs, tables, there’s something so enjoyable about slowly meandering through furniture stores.</p>
                                <button>See collection</button>
                            </div>

                        </div>
                        <div className="col-6 ">
                            <div className="row">
                                <div className="col-6 ">
                                    <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2019/09/p20-600x600.jpg" alt="" />
                                    <button className="btn card-button w-50">Flower Lamp</button>
                                </div>
                                <div className="col-6">
                                    <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2019/09/p22-600x600.jpg" alt="" />
                                    <button className="btn card-button w-50">Triangle Stool</button>
                                </div>
                                <div className="col-6">
                                    <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2019/09/p23-600x600.jpg" alt="" />
                                    <button className="btn card-button w-50">Gray Simple Sofa</button>
                                </div>
                                <div className="col-6">
                                    <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2019/09/p26i-600x600.jpg" alt="" />
                                    <button className="btn card-button w-50">Modern Lounge</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            
        </section>
        <section>
        <div className="container my-5">
            <div className="row">
                <div className="col-6">
                    <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/photo2.jpg" alt="" />
                    
                </div>
                <div className="col-6 ">
                    <div className="contain">
                        <h2 className="mt-5">Explore<br/>Xtra <span >Furniture</span><br/> <span >Stores</span> for<br/>latest collection</h2>
                        <p className="my-3">Sofa, bed, desk, chairs, tables, there’s something so enjoyable about slowly meandering through furniture stores.</p>
                        <button>See collection</button>
                    </div>
                    
                </div>
                
            </div>
        </div>
        </section>
        <section>
            <div className="container">
                <div className="row">
                <div className="col-6 ">
                    <div className="contain">
                        <h2 className="mt-5">Explore<br/>Xtra <span >Furniture</span><br/> <span >Stores</span> for<br/>latest collection</h2>
                        <p className="my-3">Sofa, bed, desk, chairs, tables, there’s something so enjoyable about slowly meandering through furniture stores.</p>
                        <button>See collection</button>
                    </div>
                    
                </div>
                <div className="col-6 ">
                    <div className="row">
                        <div className="col-6">
                            <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2019/09/p20-600x600.jpg" alt="" />
                            <button className="btn card-button ">Flower Lamp</button>
                        </div>
                        <div className="col-6">
                            <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2019/09/p22-600x600.jpg" alt="" />
                            <button className="btn card-button ">Flower Lamp</button>
                        </div>
                        <div className="col-6">
                            <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2019/09/p22i-600x600.jpg" alt="" />
                            <button className="btn card-button ">Flower Lamp</button>
                        </div>
                        <div className="col-6">
                            <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2019/09/p26i-600x600.jpg" alt="" />
                            <button className="btn card-button ">Flower Lamp</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </section>

        
        <section>

                <div className="row align-items-center justify-content-center my-4 ">
                    <div className="col-4 the-f ">
                        <div className="feature">
                            <div>
                                <h2>Lorem ipsum dolor sit.</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, quas!</p>
                            </div>
                            
                        </div>

                    </div>
                    <div className="col-4 the-f ">
                        <div className="feature">
                            <div>
                                <h2>Lorem ipsum dolor sit.</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, quas!</p>
                            </div>
                            
                        </div>

                    </div>
                    <div className="col-4 the-f ">
                        <div className="feature">
                            <div>
                                <h2>Lorem ipsum dolor sit.</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, quas!</p>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div> */}



<div className="container my-5">
      <div className="row text-center justify-content-center gap-3">

        {/* Card 1 */}
        <div className="col-md-3 card-box p-4 rounded-4">
        <div className="icon-circle mb-3 mx-auto">
            <img
              src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon11.png"
              className="img-fluid"
              width="40"
              alt="shipping"
            />
          </div>
          <h5 className="fw-bold">FREE SHIPPING WORLDWIDE</h5>
          <p className="text-muted">
            We offer free shipping via Standard Shipping on orders over $200.00
          </p>
        </div>

        {/* Card 2 */}
        <div className="col-md-3 card-box p-4 rounded-4">
          <div className="icon-circle mb-3 mx-auto">
            <img
              src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon12.png"
              className="img-fluid"
              width="40"
              alt="money-back"
            />
          </div>
          <h5 className="fw-bold">MONEY BACK GUARANTEE</h5>
          <p className="text-muted">
            If you're not satisfied with our product, we’ll refund the purchase price.
          </p>
        </div>

        {/* Card 3 */}
        <div className="col-md-3 card-box p-4 rounded-4">
          <div className="icon-circle mb-3 mx-auto">
            <img
            src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/icon13.png"
            className="img-fluid"
            width="40"
            alt="support"
            />
          </div>
          <h5 className="fw-bold">ONLINE FRIENDLY SUPPORT 24/7</h5>
          <p className="text-muted">
            Our friendly support team is available to help you 24 hours a day in whole week.
          </p>
        </div>

      </div>
    </div>
        </section>
        <section>
        <div className="container my-5">
            <div className="row">
                <div className="col-6">
                    <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/photo3.jpg" alt="" />
                    
                </div>
                <div className="col-6 ">
                    <div className="contain">
                        <h2 className="mt-5">Solution for<br /> all  your <br /> Wooden <span> <br />Furniture</span> <br /> needs <br />collection</h2>
                        <button>See collection</button>
                    </div>
                    
                </div>
                
            </div>
        </div>

        </section>
        

        </>
    )
}



