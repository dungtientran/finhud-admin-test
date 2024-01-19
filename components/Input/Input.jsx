import React from 'react'
import style from './style.module.css'
function Input({value, label, onChange, styleWr, placeholder, type}) {
  return (
    <div style={styleWr ? styleWr : {}}>  
        {label && <label className={`${style['label']}`}>{label}</label>}
        <input
            className={`${style['input']}`}
            type={`${type ? type : 'text'}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    </div>
  )
}

export default Input