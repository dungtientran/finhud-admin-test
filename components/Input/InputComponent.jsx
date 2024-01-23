import React from 'react';
import style from './style.module.css';

function InputComponent({ value, label, onChange, subValue, placeholder, name, invalidFields }) {

    return (
        <div className='input_customer flex-1'>
            <input
                className={style.input_component}
                type='text'
                value={`${value ? value : ''}`}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default InputComponent