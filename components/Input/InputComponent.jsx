import React, { useState } from 'react';
import style from './style.module.css';

function InputComponent({ value, label, onChange, subValue, placeholder, name, invalidFields, number }) {
    const [inputValue, setInputValue] = useState(value || 0);

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US', {
            style: 'decimal',
        }).format(num);
    };
    const handleInputChange = (event) => {
        const newValue = event.target.value.replace(/\D/g, '');

        setInputValue(parseInt(newValue, 10) || 0);
        // onChange()
    };

    return (
        <div className='input_customer flex-1'>
            <input
                className={style.input_component}
                type='text'
                value={number ? formatNumber(inputValue) : `${value ? value : ''}`}
                // value={`${value ? value : ''}`}
                onChange={handleInputChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default InputComponent