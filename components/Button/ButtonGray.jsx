import React from 'react'
import styles from './style.module.css'

function ButtonGray({
    disabled = false,
    style = {},
    handleClick,
    title
}) {
  return (
    <button 
        className={`${styles['btn-gray']}`}
        onClick={handleClick}
        disabled={disabled}
        style={style}
    >
        {title}
    </button>
  )
}

export default ButtonGray