import React from 'react'

import styles from './style.module.css'
import { FiMoreHorizontal } from 'react-icons/fi'
import Link from 'next/link'
import moment from 'moment'
function CustomerRequestTable({ data }) {
    if (data?.length === 0) return (
        <div style={{ width: '100%', minHeight: '100vh' }}>
            <h1>Không có dữ liệu phù hợp tìm kiếm</h1>
        </div>
    )
    return (
        <div className={`${styles['table-wr']}`}>
            <table className={`${styles['table']}`}>
                <thead>
                    <tr className={`${styles['table-tr']}`}>
                        <th className={`${styles['table-th']}`} >ID</th>
                        <th className={`${styles['table-th']}`} >MÃ KHÁCH HÀNG</th>
                        <th className={`${styles['table-th']}`}>TÊN KHÁCH HÀNG</th>
                        <th className={`${styles['table-th']}`}>LOẠI YÊU CẦU</th>
                        <th className={`${styles['table-th']}`}>THỜI GIAN YÊU CẦU</th>
                        <th className={`${styles['table-th']}`}>TRẠNG THÁI KS</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr className={`${styles['table-tr']}`} key={index}>
                            <td className={`${styles['table-td']}`}>#{item?.id}</td>
                            <td className={`${styles['table-td']}`}>Cxxxxxx</td>
                            <td className={`${styles['table-td']} ${styles['name']}`}>{item?.user?.name}</td>
                            <td className={`${styles['table-td']}`}>{item?.request_type?.name}</td>
                            <td className={`${styles['table-td']}`}>{moment(item?.created_at).format("DD/MM/YYYY, HH:mm:ss")}</td>
                            <td className={`${styles['table-td']} ${item?.request_status?.id === 0 ? styles['pending'] : item?.request_status?.id === 1 ? styles['done'] : styles['reject']}`}>
                                {item?.request_status?.name}
                            </td>
                            <td className={`${styles['table-td']}`}>
                                <Link href={`/customer/request/${item.id}?type=${item.request_type_id}`}>
                                    <FiMoreHorizontal className={`${styles['table-more-option']}`} />
                                </Link>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div >

    )
}

export default CustomerRequestTable
