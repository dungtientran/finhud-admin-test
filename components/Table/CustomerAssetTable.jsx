import React, { useEffect, useState } from 'react'

import styles from './style.module.css'
import { FiMoreHorizontal } from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/router';

import _ from 'lodash';


function CustomerAssetTable({ data }) {

    const [dataCustomerAssetTable, setDataCustomerAssetTable] = useState([]);
    const { query } = useRouter();

    const filter = () => {
        let filterCustomerAsset = [...dataCustomerAssetTable];

        filterCustomerAsset.sort((a, b) => {
            if (a[query?.order] < b[query?.order]) return -1;
            if (a[query?.order] > b[query?.order]) return 1;
            return 0;
        });

        if (query.total_asset_min && query?.total_asset_max) {
            filterCustomerAsset = filterCustomerAsset.filter(
                (item) =>
                    parseInt(item?.total_value) >= parseInt(query?.total_asset_min) &&
                    parseInt(item?.total_value) <= parseInt(query?.total_asset_max)
            );
        }
        if (query?.profit_percent_min && query?.profit_percent_max) {
            filterCustomerAsset = filterCustomerAsset.filter(
                (item) =>
                    parseInt(item?.currentTotalProfitPercent) >= parseInt(query?.profit_percent_min) &&
                    parseInt(item?.currentTotalProfitPercent) <= parseInt(query?.profit_percent_max)
            );
        }

        filterCustomerAsset = filterCustomerAsset.filter(item =>
            _.deburr(item?.name.toLowerCase()).includes(_.deburr(query?.search?.toLowerCase()) || '') ||
            _.deburr(item?.id.toLowerCase()).includes(_.deburr(query?.search?.toLowerCase()) || '')
        );

        setDataCustomerAssetTable(filterCustomerAsset);
    }

    useEffect(() => {
        filter()
    }, [query]);

    useEffect(() => {
        const dataCustom = data?.map(item => {
            const newItem = {
                ...item,
                currentTotalProfitPercent: Number(item?.currentTotalProfitPercent),
                total_value: Number(item?.total_value)
            }
            return newItem
        })

        setDataCustomerAssetTable(dataCustom)
    }, [data]);

    if (dataCustomerAssetTable?.length === 0) return (
        <div style={{ width: '100%', minHeight: '100vh' }}>
            <h1>Không có dữ liệu phù hợp tìm kiếm</h1>
        </div>
    )
    return (
        <div className={`${styles['table-wr']}`}>
            <table className={`${styles['table']}`}>
                <thead>
                    <tr className={`${styles['table-tr']}`}>
                        <th className={`${styles['table-th']}`} >MÃ KH</th>
                        <th className={`${styles['table-th']}`}>TÊN</th>
                        <th className={`${styles['table-th']}`}>TÀI SẢN (VND)</th>
                        <th className={`${styles['table-th']}`}>LỢI NHUẬN (VND)</th>
                        <th className={`${styles['table-th']}`}>Lợi Nhuận (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {dataCustomerAssetTable?.map((item, index) => (
                        <tr className={`${styles['table-tr']}`} key={index}>
                            <td className={`${styles['table-td']}`}>#{item?.id}</td>
                            <td className={`${styles['table-td']}`}>{item?.name}</td>
                            <td className={`${styles['table-td']}`}>
                                {Number(item?.total_value).toLocaleString()}
                            </td>
                            <td className={`${styles['table-td']} ${Number(item?.currentTotalProfit) < 0 ? 'text-red' : 'text-green'}`}>
                                {Number(item?.currentTotalProfit) > 0 ? '+ ' : ''}{Number(item?.currentTotalProfit).toLocaleString()}
                            </td>
                            <td className={`${styles['table-td']} ${Number(item?.currentTotalProfitPercent) > 0 ? 'text-green' : 'text-red'}`}>
                                {Number(item?.currentTotalProfitPercent) > 0 ? '+ ' : ''} {Number(item?.currentTotalProfitPercent).toFixed()}%
                            </td>
                            <td className={`${styles['table-td']}`}>
                                <Link href={`/customer/asset/${item?.id}`}>
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

export default CustomerAssetTable
