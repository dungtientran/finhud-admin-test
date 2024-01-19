import React from 'react';
import Image from 'next/image';

import styles from "./style.module.css";

import SortComponents from './SortComponents';
import { BsSliders } from 'react-icons/bs';
import { useRouter } from 'next/router';



const FilterComponent = ({ sortList, children }) => {
    const router = useRouter();

    const resetFilter = () => {
        const { pathname } = router;
        router.push({ pathname })
    }
    return (
        <div className={`${styles['sort']}`}>
            <SortComponents
                sortList={sortList}
            />
            <div className={`${styles["select-box"]}`}>
                <div className={styles["bs-sliders-parent"]}>
                    <Image
                        src='/icons/menu_filter.svg'
                        width={24}
                        height={24}
                        alt='menuFilter'
                    />
                </div>
                {children}
                <div
                    className={`${styles["delete"]}`}
                    onClick={resetFilter}
                >
                    <p style={{ margin: 0 }}>Xóa</p>
                </div>
            </div>
        </div>
    )
}

export default FilterComponent
