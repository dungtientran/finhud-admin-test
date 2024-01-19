import React from 'react'
import style from './style.module.css'
function InputSelect({value, label, onChange, styleWr, options, optionDefaultLabel}) {
  return (
    <div style={styleWr ? styleWr : {}}>  
        {label && <label className={`${style['label']}`}>{label}</label>}
        {options ? (
          <>
            <select className={`${style['input']} ${style['input-select']}`} onChange={onChange}>
              <option value="" >{optionDefaultLabel || 'Chọn loại hành động'}</option>
              {options?.map((item, index) => (
                <option value={item.value} key={index}>{item.label}</option>
                )) }
            </select>
          </>
        ) : (
          <select className={`${style['input']} ${style['input-select']}`} onChange={onChange}>
            <option value="NV giao dịch">NV giao dịch</option>
            <option value="NV giao dịch">NV kiểm sát</option>
            <option value="NV báo cáo">NV báo cáo</option>
            <option value="NV hệ thống">NV hệ thống</option>
            <option value="NV quản trị">NV quản trị</option>
          </select>
        )}
    </div>
  )
}

export default InputSelect