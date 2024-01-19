import React, { Fragment, useEffect, useRef, useState } from 'react';
import styles from "./style.module.css";
import { FiChevronDown } from 'react-icons/fi';
import { useRouter } from 'next/router';


const SortComponents = ({ sortList }) => {
  const [showSelect, setShowSelect] = useState(false);
  const [value, setValue] = useState(sortList?.[0]);
  const [order, setOrder] = useState('');
  const menuRef = useRef();
  const router = useRouter();

  useEffect(() => {
    window.addEventListener('click', event => {
      if (
        menuRef.current && !menuRef.current.contains(event.target)
      ) {
        setShowSelect(false)
      }
    })
  }, []);

  useEffect(() => {
    if (order) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, order: `${order}` },
      })
    }
  }, [order]);

  return (
    <div className={`${styles['sort']}`}>
      <p className="text-small" style={{ marginRight: '10px' }}>
        Sắp xếp :
      </p>
      <div
        className={`${styles['select-box-sort']}`}
        onClick={() => setShowSelect(!showSelect)}
      >
        <div className={`${styles['select']}`} ref={menuRef}>
          <p className='text'>{value?.label}</p>
          <FiChevronDown className={`${styles['chevron-down']}`} />
          {showSelect && (
            <ul className={`${styles['select-list']}`} >
              {sortList?.map((item, index) => (
                <li
                  className={`${styles['select-option']} ${item.value === value.value ? styles['selected'] : ''}`}
                  key={index}
                  onClick={() => {
                    setValue(item)
                    setOrder(item?.value)
                  }}
                >
                  {item?.label}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}

export default SortComponents
