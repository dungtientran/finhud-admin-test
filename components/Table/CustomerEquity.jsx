import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { FiMoreHorizontal } from 'react-icons/fi';



function CustomerEquityTable({ data, sort }) {
    const [dataCustomerEquityTable, setDataCustomerEquityTable] = useState([]);

    useEffect(() => {
        if (data?.length > 0) {
            const dataCustom = data.map((item) => {
                const newItem = {
                    ...item,
                    ...item?.source,
                    percentage_percent: Number(item?.percentage),
                    percentage: Number(item?.percentage),

                }
                return newItem
            })

            const sortByName = dataCustom.sort((a, b) => a.name > b.name ? 1 : -1)

            setDataCustomerEquityTable(sortByName)

        }
    }, [data]);

    const sortData = (sortList, sort) => {
        const sortedItems = [...sortList].sort((a, b) => a[sort] > b[sort] ? 1 : -1);
        setDataCustomerEquityTable(sortedItems)
    }

    useEffect(() => {
        sortData(dataCustomerEquityTable, sort)
    }, [sort]);

    return (
        <div className={`${styles['table-wr']}`}>
            <table className={`${styles['table']}`}>
                <thead>
                    <tr className={`${styles['table-tr']}`}>
                        <th className={`${styles['table-th']}`} style={{ textTransform: 'uppercase' }} >CCQ</th>
                        <th className={`${styles['table-th']}`} style={{ textTransform: 'uppercase' }}>Loại Quỹ</th>
                        <th className={`${styles['table-th']}`} style={{ textTransform: 'uppercase' }}>Công Ty</th>
                        <th className={`${styles['table-th']}`} style={{ textTransform: 'uppercase' }}>Số lượng CCQ</th>
                        <th className={`${styles['table-th']}`} style={{ textTransform: 'uppercase' }}>Giá Trị (VND)</th>
                        <th className={`${styles['table-th']}`} style={{ textTransform: 'uppercase' }}>% TÀI sản</th>
                        <th className={`${styles['table-th']}`} style={{ textTransform: 'uppercase' }}>LỢI NHUẬN (VND)</th>
                        <th className={`${styles['table-th']}`} style={{ textTransform: 'uppercase' }}>LỢI NHUẬN (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {dataCustomerEquityTable?.map((item, index) => (
                        <tr className={`${styles['table-tr']}`} key={index}>
                            <td className={`${styles['table-td']}`}>{item?.name} </td>
                            <td className={`${styles['table-td']}`}>{item?.type}</td>
                            <td className={`${styles['table-td']}`}>
                                {item?.company}
                            </td>
                            <td className={`${styles['table-td']}`}>
                                {item?.amount}
                            </td>
                            <td className={`${styles['table-td']}`}>
                                {item?.purchased_price?.toLocaleString()}
                            </td>
                            <td className={`${styles['table-td']}`}>
                                {item?.percentage_percent} %
                            </td>
                            <td className={`${styles['table-td']} ${Number(item?.profit) > 0 ? 'text-green' : 'text-red'}`}>
                                {Number(item?.profit.toFixed())?.toLocaleString()}
                            </td>
                            <td className={`${styles['table-td']} ${Number(item?.percentage) > 0 ? 'text-green' : 'text-red'}`}>
                                {Number(item?.percentage)?.toLocaleString()} %
                            </td>
                            <td className={`${styles['table-td']}`}>
                                <span >
                                    <FiMoreHorizontal className={`${styles['table-more-option']}`} />
                                </span>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>

    )
}

export default CustomerEquityTable
