import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { api } from '../../../../utils/api';

export default function CartButton({
    product,
    getProductQuantity,
    getCart,
    getProducts
}) {

    const editQuantity = async (id, operation) => {
        if (operation === "#") {
            await api.post(`${import.meta.env.VITE_CARTPRODUCT}/${id}`, { quantity: 1 });
        } else {
            let count = getProductQuantity(id);
            operation === "+" ? count++ : count--;
            await api.put(`${import.meta.env.VITE_CARTPRODUCT}/${id}`, { quantity: count });
        }
        getProducts();
        getCart();
    };

    return (
        <>
            {getProductQuantity(product.id) > 0 ? (
                <div className="w-100 bg-info-subtle d-flex justify-content-between">
                    <FontAwesomeIcon
                        icon={faMinus}
                        onClick={() => editQuantity(product.id, "-")}
                        className="custom-icon"
                    />
                    {getProductQuantity(product.id)}
                    <FontAwesomeIcon
                        icon={faPlus}
                        onClick={() => editQuantity(product.id, "+")}
                        className="custom-icon"
                    />
                </div>
            ) : (
                <Button
                    onClick={() => editQuantity(product.id, "#")}
                    variant="primary"
                    className="w-100  mb-3"
                >
                    Add to Cart
                </Button>
            )}
        </>
    );
}
