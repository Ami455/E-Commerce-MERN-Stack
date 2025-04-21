import React from 'react'
import './Add.css';
import Tab from 'react-bootstrap/Tab';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Add() {
    return (
        <>
                <div className="admin-panel">
                    <div className="content ms-5 mt-3">
                        <p >Upload Image</p>
                        <div className="upload-images mb-4 ">
                            <label htmlFor="file-upload" className="custom-file-upload me-5  d-inline align-content-center">
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
                            <input id="file-upload" type="file" className='d-none ' />
                        </div>
                        <article >
                            <Form.Label><p>Product name</p></Form.Label>
                            <Form.Control size="text" type="text" className='w-50' placeholder="Type here" />
                            <br />
                            <Form.Label><p>Product description</p></Form.Label>
                            <Form.Control as="textarea" className='w-50' rows={3} />



                            <div className=' d-flex d-inline mt-3'>
                                <section className='me-5'>
                                    <label><p>product Category</p></label>
                                    <Form.Select id="product-category" className=' d-block mt-2 w-100 '>
                                        <option>Men</option>
                                        <option>Women</option>
                                        <option>Kids</option>
                                    </Form.Select>
                                </section>
                                <section className='me-5'>
                                    <label><p>Sub category</p></label>
                                    <Form.Select id="Sub category" className=' d-block mt-2 w-100'>
                                        <option>TopWear</option>
                                        <option>BottomWear</option>
                                        <option>WinterWear</option>
                                    </Form.Select>
                                </section>
                                <section className='me-5'>
                                    <label><p>product category</p></label>
                                    <div id="product-category" className=' d-block mt-2 w-75 text-center'>
                                        <input type="number" id="product-price" className='price' />
                                    </div>
                                </section>

                            </div>

                            <Form className='mt-4'>
                                <p> Product Sizes</p>
                                <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="mb-2">
                                    <ToggleButton id="tbg-check-1" value={1} className='me-2 rounded-bottom-0'>
                                        S
                                    </ToggleButton>
                                    <ToggleButton id="tbg-check-2" value={2} className='me-2' >
                                        M
                                    </ToggleButton>
                                    <ToggleButton id="tbg-check-3" value={3} className='me-2'>
                                        L
                                    </ToggleButton>
                                    <ToggleButton id="tbg-check-4" value={4} className='me-2'>
                                        XL
                                    </ToggleButton>
                                    <ToggleButton id="tbg-check-5" value={5} className='me-2 rounded-bottom-0'>
                                        XXL
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Form>




                            <label>
                                <input type="checkbox" className='mt-3' /> Add to bestseller
                            </label>

                            <Button variant="primary" size="lg" className='d-block mt-3'>
                                Large button
                            </Button>
                        </article>
                    </div>
                </div>


        </>
    )
}
