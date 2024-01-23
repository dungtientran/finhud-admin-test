import React from 'react';
import styles from './style.module.css';
import { FiMoreHorizontal } from 'react-icons/fi';
import Link from 'next/link';
import moment from 'moment';

const data = [
    {
        idCCQ: 'TCBF',
        nameCCQ: 'Quỹ trái phiếu Techcombank',
        companyQLQ: 'Công Ty Cổ Phần Quản Lý Quỹ Kỹ Thương',
        typeCCQ: 'Quỹ trái phiếu',
        status_id: '1',
        status: 'Đang hoạt đông'
    },
    {
        idCCQ: 'TCBF',
        nameCCQ: 'Quỹ trái phiếu Techcombank',
        companyQLQ: 'Công Ty Cổ Phần Quản Lý Quỹ Kỹ Thương',
        typeCCQ: 'Quỹ tiền tệ',
        status_id: '1',
        status: 'Đang hoạt đông'
    },
    {
        idCCQ: 'TCBF',
        nameCCQ: 'Quỹ trái phiếu Techcombank',
        companyQLQ: 'Công Ty Cổ Phần Quản Lý Quỹ Kỹ Thương',
        typeCCQ: 'Quỹ cổ phiếu',
        status_id: '1',
        status: 'Đang hoạt đông'
    },
    {
        idCCQ: 'TCBF',
        nameCCQ: 'Quỹ trái phiếu Techcombank',
        companyQLQ: 'Công Ty Cổ Phần Quản Lý Quỹ Kỹ Thương',
        typeCCQ: 'Quỹ cân bằng',
        status_id: '2',
        status: 'Khóa'
    },
    {
        idCCQ: 'TCBF',
        nameCCQ: 'Quỹ trái phiếu Techcombank',
        companyQLQ: 'Công Ty Cổ Phần Quản Lý Quỹ Kỹ Thương',
        typeCCQ: 'Quỹ cân bằng',
        status_id: '2',
        status: 'Khóa'
    },
    {
        idCCQ: 'TCBF',
        nameCCQ: 'Quỹ trái phiếu Techcombank',
        companyQLQ: 'Công Ty Cổ Phần Quản Lý Quỹ Kỹ Thương',
        typeCCQ: 'Quỹ cân bằng',
        status_id: '2',
        status: 'Khóa'
    },
]

function ProductCcqTable({dataProductCcq}) {
    if (dataProductCcq?.length === 0) return (
        <div style={{ width: '100%', minHeight: '100vh' }}>
            <h1>Không có dữ liệu phù hợp tìm kiếm</h1>
        </div>
    )
        // console.log("dataProductCcq", dataProductCcq);
    return (
        <div className={`${styles['table-wr']}`} >
            <table className={`${styles['table']}`}>
                <thead>
                    <tr className={`${styles['table-tr']}`}>
                        <th className={`${styles['table-th']}`} >Mã CCQ</th>
                        <th className={`${styles['table-th']}`} >Tên CCQ</th>
                        <th className={`${styles['table-th']}`}>Công ty QLQ</th>
                        <th className={`${styles['table-th']}`}>Loại quỹ</th>
                        <th className={`${styles['table-th']}`}>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {dataProductCcq?.map((item, index) => (
                        <tr className={`${styles['table-tr']}`} key={index}>
                            <td className={`${styles['table-td']}`}>{item?.name}</td>
                            <td className={`${styles['table-td']}`}>{item?.name_fund}</td>
                            <td className={`${styles['table-td']}`}>{item?.company}</td>
                            <td className={`${styles['table-td']}`}>
                                {/* {item?.type_id === "1" && 'Quỹ trái phiếu'}
                                {item?.type_id === "2" && 'Quỹ cân bằng'}
                                {item?.type_id === "3" && 'Quỹ đầu tư'}
                                {!item?.type_id && 'Quỹ trái phiếu'} */}
                                {item?.type?.name}
                               
                            </td>
                            {/* <td
                                className={`${styles["table-td"]} ${item?.status_id == 0
                                        ? styles["pending"]
                                        : item.status_id == 1
                                            ? styles["done"]
                                            : styles["reject"]
                                    }`}
                            >
                                Đang hoạt động
                            </td> */}
                            <td
                                className={`${styles["table-td"]} ${styles.done}`}
                            >
                                Đang hoạt động
                            </td>
                            <td className={`${styles['table-td']}`}>
                                <Link href={`/product/ccq/${item?.id}`}>
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

export default ProductCcqTable