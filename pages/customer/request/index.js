import React, { forwardRef, useContext, useEffect, useState } from 'react'
import styles from '../style.module.css'
import Pagination from '@/components/Pagination/Pagination'
import CustomerRequestTable from '@/components/Table/CustomerRequestTable'
import axiosInstance from '@/utils/axiosIntance'
import CustomSkeletion from '@/components/Skeleton/CustomSkeletion';
import { SearchContext } from '@/context/searchContext';
import FilterComponent from '@/components/Filter/FilterComponent';
import { sortCustomerRequets } from '@/utils/filter/sortList';
import { getCustomerRequets } from '@/apiClient/customerAccount';
import { useRouter } from 'next/router';
import CheckBoxFilter from '@/components/Filter/CheckBoxFilter'
import { customerRequestCheckboxFilter, statusItemCheckbox } from '@/utils/filter/filterList';
import DateFilter from '@/components/Filter/DateFilter';
import getQueryUrl from '@/utils/getQueryUrl';

function CustomerRequest() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const { query } = useRouter();
  const { page, size, order, search, request_type_id, request_status_id, start_date, end_date } = getQueryUrl();

  const fetchTransactionRequest = async () => {
    setLoading(true)
    const res = await getCustomerRequets(
      page,
      size,
      order,
      search,
      request_type_id,
      request_status_id,
      start_date,
      end_date,
    )
    setLoading(false)
    setData(res?.data?.rows)
    setTotalPage(Math.round(res?.data?.count / Number(size)))

  }
  useEffect(() => {
    fetchTransactionRequest()
  }, [query])



  return (
    <div className="main-content">
      <FilterComponent
        sortList={sortCustomerRequets}
      >
        <CheckBoxFilter
          listCheck={customerRequestCheckboxFilter}
          title={"Loại yêu cầu"}
          queryString={'request_type_id'}
        />
        <DateFilter
          title={"Thời gian tạo"}
        />
        <CheckBoxFilter
          listCheck={statusItemCheckbox}
          title={"Trạng thái KS"}
          queryString={'request_status_id'}
        />
      </FilterComponent>
      {loading ? (
        <CustomSkeletion style={{ marginTop: '52px' }} />
      ) : (
        <div className={`${styles['table']}`} style={{ marginTop: '52px' }}>
          <CustomerRequestTable data={data} />
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

export default CustomerRequest
