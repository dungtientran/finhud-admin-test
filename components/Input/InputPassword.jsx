import React, { useState } from 'react'
import style from './style.module.css'
import Image from 'next/image'

import closeEye from '../../asset/image/close-eye.png'
import openEye from '../../asset/image/open-eye.png'
function InputPassword({ value, label, onChange, styleWr, placeholder }) {
  const [show, setShow] = useState(false)
  return (
    <div style={styleWr ? styleWr : {}}>
      {label && <label className={`${style['label']}`}>{label}</label>}
      <div className={`${style['password']}`}>
        <input
          className={`${style['input']}`}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <div className={`${style['password-control']}`}>
          <Image
            src={show ? openEye : closeEye}
            width={18}
            height={show ? 12 : 15}
            onClick={() => setShow(!show)}
            alt=''
          />
        </div>
      </div>

    </div>
  )
}

export default InputPassword