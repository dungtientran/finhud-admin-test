import React, { useEffect, useRef, useState } from 'react';
import styles from "./style.module.css";
import { useRouter } from 'next/router';
import { FiChevronDown } from 'react-icons/fi';

const SelectFilter = ({ roleItems, title, queryString }) => {
    const [showSelect, setShowSelect] = useState(false);
    const [value, setValue] = useState(roleItems?.[0]);
    const [query, setQuery] = useState("");
    const [roleId, setRoleId] = useState('');
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
        if (query) {
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
            if (queryString === 'status') {
                router.push({
                    pathname: router.pathname,
                    query: { ...router.query, status: `${query}` },
                })
            }
            if (queryString === 'type_id') {
                router.push({
                    pathname: router.pathname,
                    query: { ...router.query, type_id: `${query}` },
                })
            }
        }
    }, [query, queryString]);

    return (
        <div onClick={() => setShowSelect(true)}>
            <div className={`${styles['select']}`} ref={menuRef}  >
                <p className={value !== roleItems?.[0] && router.query[queryString] ? "text-blue" : "text"}>{title}</p>
                <FiChevronDown className={`${styles['chevron-down']}`} />
                {showSelect && (
                    <ul className={`${styles['select-list']}`} >
                        {roleItems?.map((item, index) => (
                            <li
                                className={`${styles["select-option"]} ${item?.value === value?.value ? styles["selected"] : ""}`}
                                key={index}
                                onClick={() => {
                                    setValue(item?.value)
                                    setQuery(item?.value)
                                }}
                            >
                                {item?.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default SelectFilter
