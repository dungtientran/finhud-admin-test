import React, { useEffect, useRef, useState } from 'react';
import styles from "./style.module.css";
import { useRouter } from 'next/router';
import { FiChevronDown } from 'react-icons/fi';
import { InputNumber } from 'antd';


const SelectNumberFilter = ({ selecNumberList, title, labelText1, labelText2, queryString, isPercent }) => {
    const [showSelect, setShowSelect] = useState(false);
    const [minNumber, setMinNumber] = useState(undefined);
    const [maxNumber, setMaxNumber] = useState(undefined);
    const [validateNumber, setValidateNumber] = useState(false);
    const [isTextBlue, setIsTextBlue] = useState(false);
    const menuRef = useRef();
    const router = useRouter();

    useEffect(() => {
        let handleClickOutSide = (e) => {
            if (!menuRef?.current?.contains(e.target)) {
                setShowSelect(false);
            };
        };
        document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        }
    }, []);

    useEffect(() => {
        if (minNumber !== undefined && maxNumber !== undefined) {
            if (Number(minNumber) > Number(maxNumber)) {
                setValidateNumber(true)
            } else {
                setValidateNumber(false)
                if (queryString === 'asset') {
                    router.push({
                        pathname: router.pathname,
                        query: { ...router.query, total_asset_min: `${minNumber}`, total_asset_max: `${maxNumber}` },
                    })
                }
                if (queryString === 'percent') {
                    router.push({
                        pathname: router.pathname,
                        query: { ...router.query, profit_percent_min: `${minNumber}`, profit_percent_max: `${maxNumber}` },
                    })
                }
            }
        }
    }, [minNumber, maxNumber]);

    useEffect(() => {
        if (!router.query.total_asset_min && !router.query.profit_percent_min) {
            setMinNumber(undefined)
            setMaxNumber(undefined)
        }
    }, [router.query])

    return (
        <div ref={menuRef}>
            <div className={`${styles['select']}`} onClick={() => setShowSelect(true)} >
                {queryString === 'asset' ?
                    <p className={router.query.total_asset_min ? "text-blue" : "text"}>{title}</p>
                    :
                    <p className={router.query.profit_percent_min ? "text-blue" : "text"}>{title}</p>

                }
                <FiChevronDown className={`${styles['chevron-down']}`} />
                {showSelect && (
                    <ul style={{ width: '260px' }} className={`${styles['select-list-number']}`} >

                        <li
                            className={`${styles["select-option-number"]} `}
                            style={{ margin: '5px 0' }}
                        >
                            <div
                                className={`${styles["select-option-number-item"]}`}>
                                <label
                                    htmlFor='min'
                                >
                                    {labelText1}
                                </label>
                                <InputNumber
                                    className={styles.input_number}
                                    formatter={(value) => `${value}${isPercent ? '%' : ''}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    value={minNumber}
                                    onChange={(value) => setMinNumber(value)}

                                />
                            </div>
                        </li>
                        <li
                            className={`${styles["select-option-number"]} `}
                            style={{ margin: '5px 0' }}
                        >
                            <div
                                className={`${styles["select-option-number-item"]}`}
                            >
                                {/* {item?.label} */}
                                <label
                                    htmlFor='max'
                                >
                                    {labelText2}
                                </label>
                                <InputNumber
                                    className={styles.input_number}
                                    formatter={(value) => `${value}${isPercent ? '%' : ''}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    value={maxNumber}
                                    onChange={(value) => setMaxNumber(value)}

                                />
                            </div>
                        </li>

                        {validateNumber && (
                            <li style={{ padding: '3px' }}>
                                <p style={{ fontSize: '10px', textAlign: 'right', color: 'red' }}>*Giá trị bên dưới không thể nhỏ hơn bên trên</p>
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default SelectNumberFilter
