import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { api } from '../../../../utils/api';
import toast from 'react-hot-toast';

import useCartCount from '../../../../Hooks/useCartCount';

export default function CartButton({
    product,
    getProductQuantity,
    getCart,
    getProducts
}) {
    const { getCartCount } = useCartCount()
    const editQuantity = async (id, operation) => {
        if (operation === "#") {
            await api.post(`${import.meta.env.VITE_CARTPRODUCT}/${id}`, { quantity: 1 });


        } else {
            let count = getProductQuantity(id);
            operation === "+" ? count++ : count--;
            await api.put(`${import.meta.env.VITE_CARTPRODUCT}/${id}`, { quantity: count });
        }
        toast.success("Cart updated")
        getCartCount()
        getProducts();
        getCart();
    };

    return (
        <>
            {getProductQuantity(product.id) > 0 ? (
                <div className="bg-dark-subtle d-flex align-items-center p-2 w-50 justify-content-between mb-3 h-75 ">
                    <FontAwesomeIcon
                        icon={faMinus}
                        onClick={() => editQuantity(product.id, "-")}
                        className="custom-icon"

                    />
                    {getProductQuantity(product.id)}
                    <FontAwesomeIcon
                        icon={faPlus}
                        onClick={() => editQuantity(product.id, "+")}
                        className=" custom-icon"
                    />
                </div>
            ) : (
                <Button
                    onClick={() => editQuantity(product.id, "#")}
                    variant="primary"
                    className=" mb-2"
                >
                    Add to Cart
                </Button>
            )}
        </>
    );
}
