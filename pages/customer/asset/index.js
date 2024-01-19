import CustomSkeletion from '@/components/Skeleton/CustomSkeletion';
import React, { useEffect, useState } from 'react';
import styles from '../style.module.css';
import CustomerAssetTable from '@/components/Table/CustomerAssetTable';
import Pagination from '@/components/Pagination/Pagination';
import FilterComponent from '@/components/Filter/FilterComponent';
import { sortCustomerAsset } from '@/utils/filter/sortList';
import SelectNumberFilter from '@/components/Filter/SelectNumberFilter';
import { getCustomerAsset } from '@/apiClient/customerAccount';
import { useRouter } from 'next/router';
import getQueryUrl from '@/utils/getQueryUrl';

function Asset() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const { query } = useRouter();
  const { page, size, order, search, status, start_date, end_date } = getQueryUrl();

  const fetchCustomerAsset = async () => {
    setLoading(true);
    const res = await getCustomerAsset();
    setLoading(false);
    setData(res?.data?.rows);
    setTotalPage(Math.round(res?.data?.rows?.length / Number(size)));
  }
  useEffect(() => {
    // if (query) {
    // }
    fetchCustomerAsset();
  }, []);

  return (
    <div className="main-content">
      <FilterComponent
        sortList={sortCustomerAsset}
      >
        <SelectNumberFilter
          title={'Tài sản'}
          labelText1={'Cận dưới (VND)'}
          labelText2={'Cận trên (VND)'}
          queryString={'asset'}
        />
        <SelectNumberFilter
          title={'Lợi nhuận'}
          labelText1={'Cận dưới (%)'}
          labelText2={'Cận trên (%)'}
          queryString={'percent'}
          isPercent={true}
        />
      </FilterComponent>
      {loading ? (
        <CustomSkeletion style={{ marginTop: '52px' }} />
      ) : (
        <>
          <div className={`${styles['table']}`} style={{ marginTop: '52px' }}>
            <CustomerAssetTable data={data} />
          </div>

        </>
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

export default Asset
