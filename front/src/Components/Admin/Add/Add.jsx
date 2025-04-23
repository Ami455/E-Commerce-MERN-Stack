import React from 'react'
import './Add.css';
import Tab from 'react-bootstrap/Tab';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';


export default function Add() {

    const { register , handleSubmit, reset } = useForm();
    const nav = useNavigate();
    const sendLoginData=(formdata)=>{
        console.log("submit")
        console.log(formdata)
        console.log(formdata.name, formdata.description, formdata.category,formdata.subCategory,formdata.price,"didnt nav")
        nav("/create", { state: {
            name: formdata.name,
            description :formdata.description,
            category : formdata.category,
            subCategory : formdata.subCategory,
            price : formdata.price,
            // color : formdata.availableColors,
            // image : formdata.image,
            action: 'create' } })
    }


    return (
        <>
                <div className="admin-panel">
                    <div className="content ms-5 mt-3">
                    <Form onSubmit={handleSubmit(sendLoginData)}>
                        <p >Upload Image</p>
                        <div className="upload-images mb-4 ">
                        <Form.Label htmlFor="file-upload"><FontAwesomeIcon icon={faUpload}  size="6x"/></Form.Label>
                            <Form.Control id="file-upload" type='file'  className='d-none '  />
                            {/* <label  className="custom-file-upload me-5  d-inline align-content-center">
                                <FontAwesomeIcon icon={faUpload}  size="6x"/>
                            </label>
                            <input id="file-upload" type="file" className='d-none ' />
                            <label htmlFor="file-upload" className="custom-file-upload me-5  d-inline align-content-center">
                                <FontAwesomeIcon icon={faUpload}  size="6x"/>
                            </label>
                            <input id="file-upload" type="file" className='d-none ' />
                            <label htmlFor="file-upload" className="custom-file-upload  d-inline align-content-center">
                                <FontAwesomeIcon icon={faUpload}  size="6x"/>
                            </label>
                            <input id="file-upload" type="file" className='d-none ' /> */}
                        </div>
                        <article >
                            <Form.Label><p>Product name</p></Form.Label>
                            <Form.Control size="text" type="text" className='w-50' placeholder="Type here" {...register("name")} />
                            <br />
                            <Form.Label><p>Product description</p></Form.Label>
                            <Form.Control as="textarea" className='w-50' rows={3} {...register("description")} />



                            <div className=' d-flex d-inline mt-3'>
                                <section className='me-5'>
                                    <label><p>product Category</p></label>
                                    <Form.Select id="product-category" className=' d-block mt-2 w-100 '{...register("category")}>
                                        <option>Bed Room</option>
                                        <option>Office</option>
                                        <option>Dining Room</option>
                                        <option>Living Room</option>
                                    </Form.Select>
                                </section>
                                <section className='me-5'>
                                    <label><p>Sub category</p></label>
                                    <Form.Select id="Sub category" className=' d-block mt-2 w-100'{...register("subCategory")}>
                                        <option>Tables</option>
                                        <option>Desks</option>
                                        <option>Storage</option>
                                        <option>Chair</option>
                                        <option>Bed</option>
                                    </Form.Select>
                                </section>
                                <section>
                                    <Form.Label><p>Product Price</p></Form.Label>
                                    <Form.Control type="number" className='d-block w-75 text-center' {...register("price")} />
                                </section>

                            </div>

                            <Form className='mt-4'>
                                <p> Product Colors</p>
                                <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="mb-2" >
                                    <ToggleButton id="tbg-check-1" value={1} className='me-2 rounded-bottom-0 bg-white'>
                                        White
                                    </ToggleButton>
                                    <ToggleButton id="tbg-check-2" value={2} className='me-2 bg-black' >
                                        Black
                                    </ToggleButton>
                                    <ToggleButton id="tbg-check-3" value={3} className='me-2 bg-light text-dark'>
                                        Gray
                                    </ToggleButton>
                                    <ToggleButton id="tbg-check-4" value={4} className='me-2'>
                                        Brown
                                    </ToggleButton>
                                    <ToggleButton id="tbg-check-5" value={5} className='me-2 '>
                                    Walnut
                                    </ToggleButton>
                                    <ToggleButton id="tbg-check-5" value={5} className='me-2 '>
                                    Mahogany
                                    </ToggleButton>
                                    <ToggleButton id="tbg-check-5" value={5} className='me-2 rounded-bottom-0'>
                                    Cherry
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Form>




                            <label>
                                <input type="checkbox" className='mt-3' /> Add to bestseller
                            </label>

                            <Button type="submit" variant="primary" size="lg" className='d-block mt-3'>
                                Add Product
                            </Button>
                        </article>

                        </Form>
                    </div>
                </div>


        </>
    )
}
