import React from 'react'
import styles from './style.module.css'
function Button({
    onClick, 
    disabled, 
    title,
    style = {}  
}) {
    return (
        <button
         onClick={onClick} 
         style={style}
         className={`${styles['button']}`}
         disabled={disabled}
        >
            {title}
        </button>
    )
}

export default Button