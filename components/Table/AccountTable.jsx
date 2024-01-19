import React from 'react';
import styles from './style.module.css';
import { FiMoreHorizontal } from 'react-icons/fi';
import Link from 'next/link';
import moment from 'moment';

function AccountTable({data}) {
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
                    <th className={`${styles['table-th']}`} >Tài khoản</th>
                    <th className={`${styles['table-th']}`}>Tên</th>
                    <th className={`${styles['table-th']}`}>Vai trò</th>
                    <th className={`${styles['table-th']}`}>Thời gian tạo</th>
                    <th className={`${styles['table-th']}`}>Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item, index) =>(
                    <tr className={`${styles['table-tr']}`} key={index}>
                        <td className={`${styles['table-td']}`}>#{item?.id}</td>
                        <td className={`${styles['table-td']}`}>{item?.email}</td>
                        <td className={`${styles['table-td']} ${styles['name']}`}>{item?.name}</td>
                        <td className={`${styles['table-td']}`}>{item?.role?.name}</td>
                        <td className={`${styles['table-td']}`}>{moment(item?.created_at).format("DD/MM/YYYY, HH:mm:ss")}</td>
                        <td className={`${styles['table-td']}`}>{item?.admin_user_status?.name}</td>
                        <td className={`${styles['table-td']}`}>
                            <Link href={`/system/account/${item?.id}`}>
                                <FiMoreHorizontal className={`${styles['table-more-option']}`}/>
                            </Link>
                        </td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    </div>

  )
}

export default AccountTable