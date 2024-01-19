import React, { useEffect, useRef, useState } from 'react'
import styles from './style.module.css'
import { FiChevronDown } from 'react-icons/fi'

const selectItems = [
    {
        value: 'id',
        Label: 'ID'
    },
    {
        value: 'name',
        Label: 'Tên'
    },
    {
        value: 'created_at',
        Label: 'Thời gian tạo'
    },
    {
        value: 'status',
        Label: 'Trạng thái'
    },
]

function SortSelect({
    options, 
    handleSelected = () =>{}, 
}) {
    const [value, setValue] = useState(selectItems[0])
    const [showSelect, setShowSelect] = useState(false)
    const [items, setItems] = useState(options || selectItems)
    const menuRef = useRef()

    useEffect(()=>{
        if(options) {
            setValue(options[0])
        }
    },[options])

    useEffect(()=>{
        window.addEventListener('click', event => {
            if (
                menuRef.current && !menuRef.current.contains(event.target)
            ){
                setShowSelect(false)
            }
        })
    },[])

    return (
    <div className={`${styles['select-box']}`}>
        <div className={`${styles['select']}`} onClick={() => setShowSelect(!showSelect)} ref={menuRef}>
            <p className='text'>{value.Label}</p>
            <FiChevronDown className={`${styles['chevron-down']}`}/>
            {showSelect && (
                <ul className={`${styles['select-list']}`} >
                    {items?.map((item, index) => (
                        <li 
                            className={`${styles['select-option']} ${item.value === value.value ? styles['selected'] : ''}`}
                            key={index}
                            onClick={()=>{
                                setValue(item)
                                handleSelected(item.value)
                                setShowSelect(false)
                            }}
                        >
                            {item.Label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
        
    </div>
  )
}

export default SortSelect