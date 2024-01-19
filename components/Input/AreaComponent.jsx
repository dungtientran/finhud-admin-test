import React from 'react'
import style from './style.module.css';

const AreaComponent = ({ row, col, value, placeholder, onChange }) => {
    return (
        <div className='area_customer flex-1'>
            <textarea
                value={value}
                rows={5}
                className={style.area_component}
                style={{
                    outline: 'none',
                    padding: '8px',
                    border: '1px solid #D9D9D9',
                    color: '#000000',
                    fontWeight: "500",
                    width: '100%',
                    backgroundColor: 'white',
                }}
                onChange={onChange}
                placeholder={placeholder}
            />
            {/* <small style={{color:'red'}}>
                <i>* Không được để trống trường này</i>
            </small> */}
        </div>
    )
}

export default AreaComponent
