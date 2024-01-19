import React, { useEffect, useState } from 'react';
import styles from '../../style.module.css';
import GoBackButton from '@/components/Button/GoBackButton';
import { Button, Spin, Tabs, message } from 'antd';
import { useRouter } from 'next/router';
import ChangeButton from '@/components/Button/ChangeButton';
import InfoProductCcq from '@/pages/product/_components/product/InfoProductCcq';
import CostProduct from '@/pages/product/_components/product/CostProduct';
import TradingSchedule from '@/pages/product/_components/product/TradingSchedule';
import ChartProduct from '@/pages/product/_components/product/ChartProduct';
import axiosInstance from '@/utils/axiosIntance';
import CustomSkeletion from '@/components/Skeleton/CustomSkeletion';
import ModelDeleteCcq from '@/components/Modal/ModelDeleteCcq';
import axios from 'axios';
import moment from 'moment';
import { splitArray } from '@/utils/splitArray';

const onChange = (key) => {
  console.log(key);
};


const ProductCcqDetal = () => {
  const [data, setData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fundForm, setFundForm] = useState({});
  const [openModel, setOpenModle] = useState(false);
  const [loadingCrawl, setLoadingCrawl] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const fetchProductCcqDetal = async (id) => {
    setLoading(true);
    const res = await axiosInstance.get(`admin/product-ccq/${id}`);
    if (res.data?.code === 200) {
      setData(res?.data?.data);
      setFundForm(res?.data?.data);

    }
    setLoading(false);
  }

  const editProductCcq = (form) => setFundForm(form);

  const items = [
    {
      key: '1',
      label: `Thông tin`,
      children: <InfoProductCcq
        dataProductCcq={data}
        isEdit={isEdit}
        edit={editProductCcq}
        fundForm={fundForm}
        setIsEdit={setIsEdit}
        setFundForm={setFundForm}
      />,
    },
    {
      key: '2',
      label: `Biểu phí`,
      children: <CostProduct
        dataProductCcq={data}
        isEdit={isEdit}
        edit={setFundForm}
        fundForm={fundForm}
      />,
    },
    {
      key: '3',
      label: `Lịch giao dịch`,
      children: <TradingSchedule
        dataProductCcq={data}
        isEdit={isEdit}
        edit={editProductCcq}
        fundForm={fundForm}
      />,
    },
    {
      key: '4',
      label: `Biểu đồ`,
      children: <ChartProduct />,
    },
  ];

  useEffect(() => {
    if (id !== 'create' || isEdit) {
      fetchProductCcqDetal(id);
    }
  }, [id, isEdit]);


  const handelOpenDelete = () => {
    setOpenModle(true);
  };

  const handleCrawlDataChart = async () => {
    setLoadingCrawl(true);
    try {
      const toDate = moment(new Date()).format('YYYYMMYY');

      const idCrawlResponse = await axiosInstance.get(`/admin/get-fm-id?fund_name=${data?.name}`);

      const productId = idCrawlResponse.data?.data?.idFm;

      if (!productId) {
        console.log("CCQ này k có id của Fm !");
        return false;
      };

      const payload = {
        isAllData: 1,
        productId,
        fromDate: null,
        toDate
      };

      const dataCrawlFm = await axios.post('https://api.fmarket.vn/res/product/get-nav-history', payload);
      const dataFmResponse = dataCrawlFm.data?.data;

      if (dataCrawlFm.data?.code !== 200) {
        console.log("Lỗi khi lấy data chart");
        return false;
      };

      const latestPrice = dataFmResponse[dataFmResponse.length - 1].nav;

      await axiosInstance.put(`/admin/edit-product-ccq/${id}`, { current_price: latestPrice });

      const dataSaveDb = dataFmResponse?.map((item) => {
        return {
          date_yaxis: item?.navDate,
          value_xaxis: item?.nav,
          id_chart: item?.id,
        }
      });
      const splitDataSaveDb = splitArray(dataSaveDb);
      for (const dataChart of splitDataSaveDb) {
        try {
          const updateChart = await axiosInstance.post(`/admin/create-chart`, {
            fundName: data?.name,
            dataChart: dataChart,
          });
          message.success(updateChart?.data?.message);
        } catch (error) {
          message.error(error);

          console.error('Error saving data to the database:', error);
        }
      };


    } catch (error) {
      console.log('error______________________', error)
    }
    setLoadingCrawl(false);
  }

  return (
    <div className='main-content'>
      <div className={styles.box_nav_header}>
        <GoBackButton />
        {!isEdit && router.query.id !== 'create' && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <ChangeButton
              currentValue={isEdit}
              onClick={setIsEdit}
              title='Thay đổi'

            />
            <ChangeButton
              currentValue={isEdit}
              onClick={handelOpenDelete}
              title='Xóa'
            />
          </div>
        )}
      </div>
      {loading ? (
        <CustomSkeletion style={{ marginTop: '52px' }} />
      ) : (
        <div className={`${styles['account']}`} >
          <div style={{ margin: '30px 12px' }}>
            <Button onClick={handleCrawlDataChart}>
              <Spin spinning={loadingCrawl}>
                Crawl data chart
              </Spin>
            </Button>
          </div>
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
        </div>
      )}
      <ModelDeleteCcq
        open={openModel}
        setOpen={setOpenModle}
        id={id}
        name={data?.name}
      />
    </div>
  )
}

export default ProductCcqDetal