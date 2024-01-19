import React from 'react'

import styles from './style.module.css'
import { FiMoreHorizontal } from 'react-icons/fi'
import Link from 'next/link'

import moment from 'moment'

function CustomerAccountTable({ data }) {
    if (data?.length === 0) return (
        <div style={{ width: '100%', minHeight: '100vh' }}>
            <h1>Không có dữ liệu phù hợp tìm kiếm</h1>
        </div>
    )


    // console.log("data___________________________", data);
    return (
        <div className={`${styles['table-wr']}`}>
            <table className={`${styles['table']}`}>
                <thead>
                    <tr className={`${styles['table-tr']}`}>
                        <th className={`${styles['table-th']}`} >MÃ KH</th>
                        <th className={`${styles['table-th']}`} >EMAIL</th>
                        <th className={`${styles['table-th']}`}>TÊN</th>
                        <th className={`${styles['table-th']}`}>ĐIỆN THOẠI</th>
                        <th className={`${styles['table-th']}`}>THỜI GIAN TẠO</th>
                        <th className={`${styles['table-th']}`}>TRẠNG THÁI</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr className={`${styles['table-tr']}`} key={index}>
                            <td className={`${styles['table-td']}`}>#{item.id}</td>
                            <td className={`${styles['table-td']}`}>{item.email}</td>
                            <td className={`${styles['table-td']}`}>{item.name}</td>
                            <td className={`${styles['table-td']}`}>{item.phone_number}</td>
                            <td className={`${styles['table-td']}`}>{item.created_date && moment(item.created_date).format("DD-MM-YYYY, HH:MM:SS")}</td>
                            <td className={`${styles['table-td']} ${item.login_fail < 6 ? 'text-green' : 'text-red'}`}>
                                {item.login_fail < 6 ? 'Đang sử dụng' : 'Đóng'}
                            </td>
                            <td className={`${styles['table-td']}`}>
                                <Link href={`/customer/account/${item.id}`}>
                                    <FiMoreHorizontal className={`${styles['table-more-option']}`} />
                                </Link>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>

    )
}

export default CustomerAccountTable