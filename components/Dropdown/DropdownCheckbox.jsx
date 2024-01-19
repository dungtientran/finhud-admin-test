import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import Checkbox from '../Checkbox/Checkbox';

const days = [
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
]
const DropdownCheckbox = ({ listcheck, handleSelectDay }) => {
    const [list, setList] = useState([])
    const [isShow, setIsShow] = useState(false);
    const [statusValue, setStatusValue] = useState([]);
    const dropdownCheckboxRef = useRef(null);
    useEffect(() => {
        if (listcheck?.length > 0){
            setList(listcheck);
            setStatusValue(listcheck?.map(x => x))
        } 
    }, [listcheck])
    useEffect(() => {
        let handleClickOutSide = (e) => {
            if (!dropdownCheckboxRef?.current?.contains(e.target)) {
                setIsShow(false)
            };
        };
        document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        }
    }, []);
   
    
    return (
        <div ref={dropdownCheckboxRef}>
            <div className={styles.dropdown_checkbox_container}>
                <div className={styles.dropdown_checkbox_title} onClick={() => setIsShow(!isShow)}>
                    <div>
                        {list?.sort()?.map((item, index) => (
                            <span key={index}>
                                {item}
                            </span>
                        ))}
                    </div>
                    <span>
                        <svg width="22" height="10" viewBox="0 0 22 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L10.8987 9L20.72 1" stroke="#333333" stroke-width="1.5" />
                        </svg>
                    </span>
                </div>
                {isShow && (
                    <ul className={styles.dropdown_checkbox_box}>
                        {days?.map((item, index) => (
                            <li
                                key={index}
                            >
                                <Checkbox
                                    title={item}
                                    currentValue={statusValue}
                                    value={item}
                                    checked={statusValue?.includes(item)}
                                    onChange={(value) => {
                                        setStatusValue(value);
                                        setIsShow(false);
                                        setList(value);
                                        handleSelectDay(value);
                                    }}
                                />

                            </li>
                        ))}
                    </ul>
                )}


            </div>
        </div>
    )
}

export default DropdownCheckbox
