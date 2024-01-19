import React from 'react';
import styles from './style.module.css';
import { FiMoreHorizontal } from 'react-icons/fi';
import Link from 'next/link';
import moment from 'moment';

function TransactionTable({data}) {
    if (data?.length === 0) return (
        <div style={{width: '100%', minHeight: '100vh'}}>
          <h1>Không có dữ liệu phù hợp tìm kiếm</h1>
        </div>
      )
  return (
    <div className={`${styles['table-wr']}`}>
        <table className={`${styles['table']}`}>
            <thead>
                <tr className={`${styles['table-tr']}`}>
                    <th className={`${styles['table-th']}`}>MÃ LỆNH</th>
                    <th className={`${styles['table-th']}`}>LOẠI LỆNH</th>
                    <th className={`${styles['table-th']}`} >MÃ KH</th>
                    <th className={`${styles['table-th']}`}>TÊN</th>
                    <th className={`${styles['table-th']}`}>THỜI GIAN TẠO</th>
                    {/* <th className={`${styles['table-th']}`}>GIÁ TRỊ (VND)</th> */}
                    <th className={`${styles['table-th']}`}>TRẠNG THÁI</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item, index) =>(
                    <tr className={`${styles['table-tr']}`} key={index}>
                        <td className={`${styles['table-td']}`}>{item?.id}</td>
                        <td className={`${styles['table-td']}`}>
                            {item?.type?.id == 2 ? 'Mua' : 'Bán'}
                        </td>
                        <td className={`${styles['table-td']}`}>{item?.user_id}</td>
                        <td className={`${styles['table-td']} `}>{item?.user?.name}</td>
                        <td className={`${styles['table-td']}`}>
                        {moment(item?.created_date).format("DD/MM/YYYY HH:MM:SS")}
                        </td>
                        <td className={`${styles['table-td']}`}>{item?.status?.name}</td>
                        <td className={`${styles['table-td']}`}>
                            <Link href={`/transaction/order/${item?.id}`}>
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

export default TransactionTable
