import React, { useEffect, useState } from 'react';
import FilterComponent from '@/components/Filter/FilterComponent';
import { sortProductCcq } from '@/utils/filter/sortList';
import CheckBoxFilter from '@/components/Filter/CheckBoxFilter';
import SelectFilter from '@/components/Filter/SelectFilter';
import { statusCCQ, typeCCQ } from '@/utils/filter/filterList';
import ProductCcqTable from '@/components/Table/ProductCcqTable';
import Pagination from '@/components/Pagination/Pagination';
import CreateButton from '@/components/Button/CreateButton';
import styles from '../style.module.css';
import axiosInstance from '@/utils/axiosIntance';
import CustomSkeletion from '@/components/Skeleton/CustomSkeletion';
import getQueryUrl from '@/utils/getQueryUrl';
import { getAllProductCCQ } from '@/apiClient/product';
import { useRouter } from 'next/router';
import ModelDeleteCcq from '@/components/Modal/ModelDeleteCcq';

const ProductCcq = () => {
  const [dataProductCcq, setDataProductCcq] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const { query } = useRouter();
  const { page, size, order, search, type_id, status } = getQueryUrl();

  const fetchProductCCq = async () => {
    setLoading(true);
    const res = await getAllProductCCQ(
      page,
      size,
      order,
      search,
      type_id,
      status
    );
    if (res?.code === 200) {
      setDataProductCcq(res?.data?.rows);
      setTotalPage(Math.round(res?.data?.count / Number(size)))
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductCCq();
  }, [query]);
  return (
    <div className="main-content">
      <div className={styles.box_nav_header}>
        <FilterComponent
          sortList={sortProductCcq}
        >
          <CheckBoxFilter
            listCheck={typeCCQ}
            title={"Loại Quỹ"}
            queryString={"type_id"}
          />
          <SelectFilter
            roleItems={statusCCQ}
            title={"Trạng thái"}
            queryString={"status"}
          />
        </FilterComponent>
        <CreateButton />
      </div>

      <div style={{ marginTop: '52px' }}>
        {loading ? (
          <CustomSkeletion
            style={{ marginTop: "52px" }}
          />
        ) : (
          <ProductCcqTable dataProductCcq={dataProductCcq} />
        )}
      </div>
      <Pagination
        page={Number(page)}
        total={totalPage || 1}
      />

    </div>
  )
}

export default ProductCcq
