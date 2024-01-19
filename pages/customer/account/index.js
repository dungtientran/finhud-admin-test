import React, { useContext, useEffect, useState } from 'react';
import styles from '../style.module.css';
import Pagination from '@/components/Pagination/Pagination';
import CustomerAccountTable from '@/components/Table/CustomerAccountTable';
import CustomSkeletion from '@/components/Skeleton/CustomSkeletion';
import FilterComponent from '@/components/Filter/FilterComponent';
import { getCustomerAccount } from '@/apiClient/customerAccount';
import { useRouter } from 'next/router';
import { sortCustomerAccount } from '@/utils/filter/sortList';
import DateFilter from '@/components/Filter/DateFilter';
import SelectFilter from '@/components/Filter/SelectFilter';
import { statusFilter } from '@/utils/filter/filterList';
import getQueryUrl from '@/utils/getQueryUrl';

function CustomerAccount() {
  // context
  // 
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1);

  const { query } = useRouter();
  const { page, size, order, search, status, start_date, end_date } = getQueryUrl();
  const fetchCustomerAccount = async () => {
    setLoading(true)
    const res = await getCustomerAccount(
      page,
      size,
      order,
      search,
      status,
      start_date,
      end_date
    )
    setLoading(false);
    setData(res?.data?.rows);
    setTotalPage(Math.round(res?.data?.count / Number(size)))

  }
  useEffect(() => {
    fetchCustomerAccount()
  }, [query])

  return (
    <div className="main-content">
      <FilterComponent
        sortList={sortCustomerAccount}
      >
        <DateFilter
          title={"Thời gian tạo"}
        />
        <SelectFilter
          roleItems={statusFilter}
          title={"Trạng thái"}
          queryString={"status"}
        />
      </FilterComponent>
      {loading ? (
        <CustomSkeletion
          style={{ marginTop: '52px' }}
        />
      ) : (
        <div className={`${styles['table']}`} style={{ marginTop: '52px' }}>
          <CustomerAccountTable
            data={data}
          />
        </div>
      )}
      <div>
        <Pagination
          page={Number(page)}
          total={totalPage}
        />
      </div>
    </div>
  )
}

export default CustomerAccount
