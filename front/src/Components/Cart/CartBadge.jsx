import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


export default function CartBadge({count}) {


    return (
        <div style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faShoppingCart} size="lg" color="gray" />
        <span
          style={{
            position: 'absolute',
            top: '-9px',
            right: '-10px',
            background: 'gray',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '10px',
          }}
        >
          {count}
        </span>
      </div>
    )
}
