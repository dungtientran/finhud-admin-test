import React, { useEffect } from 'react';
import style from './style.module.css';





const InputEditCost = ({ iconleft, iconright, value, percent, hidden, icon, placeholder, placeholder_percent }) => {
  
    return (
        <>
            <div className={`${style.input_edit_cost}`}>
                <span style={{
                    position: 'relative'

                }}>
                    {iconleft}
                    {iconright}
                    <span style={{
                        position: 'absolute',
                        top: '50%',
                        left: '-100%',
                        transform: 'translateY(-50%)',
                        zIndex: '20',
                        border: 'none'
                    }}>
                        {icon}
                    </span>
                </span>
                <div className=''>
                    <input
                        type="text"
                        value={`${value ? value + ' VND' : ''}`}
                        style={{
                            display: `${hidden ? 'none' : 'block'}`
                        }}
                        placeholder={placeholder}
                    />

                </div>
                <input
                    type='text'
                    style={{
                        display: `${hidden ? 'none' : 'flex'}`
                    }}
                    value={percent ? percent + ' %' : ''}
                    placeholder={placeholder_percent}
                    />
            </div>
        </>

    )
}

export default InputEditCost
