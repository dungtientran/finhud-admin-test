import React from 'react';
import styles from "./style.module.css";
import Link from 'next/link';

const CreateButton = ({ onClick, currentValue }) => {
    
    return (
        <Link href={'/product/ccq/create'}>
        <button
            // onClick={() => onClick(!currentValue)}
            className={styles.create_btn}
        >
             Tạo mới
        </button>
        </Link>
    )
}

export default CreateButton
