import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function About() {
    return (
    <div className="container py-5">
        <div className="row justify-content-around">
            <div className="col-6  ">
                <div className="inner p-0">
                    <h2> <span>About</span>  Us </h2>
                    {/* <p>Furniture can be a product of design and is considered a form of decorative art. In addition to furniture's functional role, it can serve a symbolic or religious purpose. It can be made from many materials, including metal, plastic, and wood. Furniture can be made using a variety of woodworking joints which often reflect the local culture.</p>
                    <p>Early furniture from this period is known from artwork such as a Venus figurine found in Russia, depicting the goddess on a throne. The first surviving extant furniture is in the homes of Skara Brae in Scotland, and includes cupboards, dressers and beds all constructed from stone. Complex construction techniques such as joinery began in the early dynastic period of ancient Egypt. This era saw constructed wooden pieces, including stools and tables, sometimes decorated with valuable metals or ivory.</p> */}
                    <h3 >At <span>Dwella</span> , we believe luxury should be effortless.</h3>
                    <p>We are a premium e-commerce platform dedicated to offering an unparalleled shopping experience for A-Class customers. With a seamless blend of elegant design, smart technology, and exceptional service, Dwella transforms online shopping into a refined lifestyle.</p>
                    <p>Our team is committed to curating the finest products, delivering outstanding customer support, and creating a user experience that is intuitive, fast, and truly premium.</p>
                    <p>Welcome to <span>Dwella</span>  — where luxury meets innovation.</p>
            </div>
            <ul class="fa-ul">
                <li><span class="fa-li"><i class="fa-solid fa-check-square"></i></span>List icons can</li>
                <li><span class="fa-li"><i class="fa-solid fa-check-square"></i></span>be used to</li>
                <li><span class="fa-li"><i class="fa-solid fa-spinner fa-pulse"></i></span>replace bullets</li>
                <li><span class="fa-li"><i class="fa-regular fa-square"></i></span>in lists</li>
            </ul>
            </div>
            <div className="col-5">
                <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2019/09/img5.jpg" alt="" />
            </div>
        </div>
    </div>
    )
}
