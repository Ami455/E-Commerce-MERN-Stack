import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


export default function FavoriteBadge({count}) {


    return (
        <div style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faHeart} size="lg" color="red" />
        <span
          style={{
            position: 'absolute',
            top: '-9px',
            right: '-10px',
            background: 'red',
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
