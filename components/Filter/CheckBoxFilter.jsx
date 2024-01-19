import React, { useEffect, useRef, useState } from 'react';
import styles from "./style.module.css";
import { FiChevronDown } from 'react-icons/fi';
import Checkbox from '../Checkbox/Checkbox';
import { useRouter } from 'next/router';

const CheckBoxFilter = ({ title, listCheck, queryString }) => {
  const [showSelect, setShowSelect] = useState(false);
  const [statusValue, setStatusValue] = useState(listCheck?.map(x => x.value));
  const [query, setQuery] = useState('');
  const statusRef = useRef();
  const router = useRouter();
  useEffect(() => {
    let handleClickOutSide = (e) => {
      if (!statusRef?.current?.contains(e.target)) {
        setShowSelect(false)
      };
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    }
  }, []);
  useEffect(() => {
    if (query) {
      if (queryString === 'request_type_id') {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, request_type_id: `${query}` },
        })
      }
      if (queryString === 'request_status_id') {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, request_status_id: `${query}` },
        })
      }
      if (queryString === 'type_id') {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, type_id: `${query}` },
        })
      }
      if (queryString === 'status_id') {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, status_id: `${query}` },
        })
      }
      if (queryString === 'role_id') {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, role_id: `${query}` },
        })
      }
      if (queryString === 'admin_user_status_id') {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, admin_user_status_id: `${query}` },
        })
      }
    }
  }, [query, query?.length]);


  return (
    <div
      ref={statusRef}
    >
      <div
        className={`${styles["select"]}`}
        onClick={() => setShowSelect(true)}
      >
        <p className={`text ${statusValue?.length !== listCheck?.length && router.query[queryString] ? styles['changed'] : ''}`}>{title}</p>
        <FiChevronDown className={`${styles["chevron-down"]} ${statusValue?.length != listCheck?.length && router.query[queryString] ? styles['changed'] : ''}`} />
        {showSelect && (
          <ul className={`${styles["select-list"]}`}>
            {listCheck?.map((item, index) => (
              <li
                className={`${styles["select-option"]}`}
                key={`status_${index}`}
              >
                <Checkbox
                  title={item?.label}
                  value={item?.value}
                  checked={statusValue?.includes(item.value)}
                  currentValue={statusValue}
                  onChange={(value) => {
                    setShowSelect(false)
                    setStatusValue(value);
                    setQuery(value)
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

export default CheckBoxFilter
