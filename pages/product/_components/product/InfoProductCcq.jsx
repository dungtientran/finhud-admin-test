import { Col, Row, Select, Space, Upload, Button as ButtonAntd, Avatar } from 'antd';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
import styles from './style.module.css';
import InputComponent from '@/components/Input/InputComponent';
import AreaComponent from '@/components/Input/AreaComponent';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import axiosInstance from '@/utils/axiosIntance';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { set } from 'lodash';
import axios from 'axios';
import { uploadImageToS3 } from '@/utils/uploadImageToS3';

const status = ['Đang hoạt động', 'Ẩn']

const InfoProductCcq = ({ dataProductCcq, isEdit, edit, fundForm, setIsEdit }) => {
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState('');
  const [urlLogo, setUrlLogo] = useState('');
  const [files, setFiles] = useState(null);

  const { query } = useRouter();

  const router = useRouter();

  const handleRequest = async (verificationConfirm) => {
    if (verificationConfirm === "update") {
      console.log('fundForm____________________________', fundForm)
      const newForm = {
        ...fundForm,
        company_logo_url: urlLogo
      }
      setLoading(true);
      const res = await axiosInstance.put(`/admin/edit-product-ccq/${query.id}`, newForm);
      if (res.data?.code === 200) {
        setIsEdit(false);
      }
    } else if (verificationConfirm === "create") {
      console.log('fundForm____________________________', fundForm)

      setLoading(true);
      const res = await axiosInstance.post('/admin/create-product-ccq', fundForm);
      if (res.data?.code === 200) {
        router.push(`/product/ccq/${res?.data?.data?.id}`);
      }


    } else {
      setIsEdit(false);
    }
    setLoading(false);
  }


  const handleUpload = async (info) => {
    try {
      // const file = info.file
      // setFiles(info.file);


      // console.log('file___________________________', file);

      // const url = uploadImageToS3('test12345', file);



      // console.log('url')
      const formData = new FormData();

      formData.append('file', info.file);
      formData.append('upload_preset', 'qfxfgji7');

      const getUrlImage = await axios.post(`https://api.cloudinary.com/v1_1/dbkgkyh4h/image/upload`, formData);
      setUrlLogo(getUrlImage?.data?.secure_url)
      console.log('getUrlImage______________________', getUrlImage?.data?.url)



    } catch (error) {
      console.log('error_____________________________')
    }

  };

  return (
    <div className={`${styles['account-info']}`} >
      <Row style={{ width: '100%' }} gutter={[0, 20]}>

        <Row style={{ width: '100%' }} gutter={[20, 0]}>
          <Col xl={12}>
            <div className='flex' style={{ alignItems: 'center' }}>
              <p className={`${styles['label']}`}>Loại quỹ:</p>
              {isEdit || query.id === 'create' ? (
                <Select
                  defaultValue="1"
                  style={{ width: 160 }}
                  onChange={val => edit({ ...fundForm, type_id: val })}
                  options={[
                    { value: '1', label: 'Quỹ cổ phiếu' },
                    { value: '2', label: 'Quỹ cân bằng' },
                    { value: '3', label: 'Quỹ trái phiếu' },
                    { value: '4', label: 'Quỹ tiền tệ' },
                    { value: '5', label: 'Quỹ IPO' },
                  ]}
                />
              ) : (
                <p className={`${styles['value']} flex-1`}>{dataProductCcq?.type?.name}</p>
              )}

            </div>
          </Col>
          <Col xl={12}>
            <div className='flex' style={{ alignItems: 'center' }}>
              <p className={`${styles['label']}`}>Logo:</p>
              {isEdit || query.id === 'create' ? (
                <Space>
                  <Avatar src={dataProductCcq?.company_logo_url} size='large' /><Upload
                    action=""
                    listType="picture"
                    maxCount={1}
                    accept="image/png, image/gif, image/jpeg"
                    onChange={handleUpload}
                    beforeUpload={_ => {
                      return false;
                    }}
                  >
                    <Space size="large">
                      <ButtonAntd icon={<UploadOutlined />}>Upload (Max: 1)</ButtonAntd>
                    </Space>
                  </Upload>
                </Space>
              ) : (
                <Avatar src={dataProductCcq?.company_logo_url} size='large' />
              )}

            </div>
          </Col>
        </Row>

        <Row style={{ width: '100%' }} gutter={[20, 0]}>
          <Col xl={12}>
            <div className='flex' style={{ alignItems: 'center' }}>
              <p className={`${styles['label']}`}>Giá:</p>
              {isEdit || query.id === 'create' ? (
                <InputComponent
                  value={fundForm?.current_price}
                  onChange={e => edit({ ...fundForm, current_price: e.target.value })}
                  placeholder={"N/A"}
                  number={true}
                />
              ) : (
                <p className={`${styles['value']} flex-1`}>{dataProductCcq?.current_price}</p>
              )}
            </div>
          </Col>
          <Col xl={12}>
            <div className='flex' style={{ alignItems: 'center' }}>
              <p className={`${styles['label']}`}>Trạng thái:</p>
              {isEdit || query.id === 'create' ? (
                <Select
                  defaultValue="1"
                  style={{ width: 200 }}
                  onChange={val => edit({ ...fundForm, status: val })}
                  options={[
                    { value: '1', label: 'Đang hoạt động' },
                    { value: '2', label: 'Ẩn' },

                  ]}
                />
              ) : (
                <p className={`${styles['value']} flex-1`}>{status?.[dataProductCcq?.status - 1]}</p>
              )}

            </div>
          </Col>
        </Row>
        <Row style={{ width: '100%' }} gutter={[20, 0]}>
          <Col xl={12}>
            <div className='flex'>
              <p className={`${styles['label']}`}>Mã CCQ :</p>
              {isEdit || query.id === 'create' ? (
                <InputComponent
                  value={fundForm?.name}
                  onChange={e => edit({ ...fundForm, name: e.target.value })}
                  placeholder={"N/A"}
                />
              ) : (
                <p className={`${styles['value']} flex-1`}>{dataProductCcq?.name}</p>
              )}
            </div>
          </Col>
          <Col xl={12}>
            <div className='flex'>
              <p className={`${styles['label']}`}>Tên CCQ:</p>
              {isEdit || query.id === 'create' ? (
                <InputComponent
                  value={fundForm?.name_fund}
                  placeholder={"N/A"}
                  onChange={e => edit({ ...fundForm, name_fund: e.target.value })}
                />
              ) : (
                <p className={`${styles['value']} flex-1`}>{dataProductCcq?.name_fund}</p>
              )}

            </div>
          </Col>
        </Row>

        <Row style={{ width: '100%' }} gutter={[20, 0]}>
          <Col xl={12}>
            <div className='flex'>
              <p className={`${styles['label']}`}>Công ty QLQ:</p>
              {isEdit || query.id === 'create' ? (
                <InputComponent
                  value={fundForm?.company}
                  placeholder={"N/A"}

                  onChange={e => edit({ ...fundForm, company: e.target.value })}
                />
              ) : (
                <p className={`${styles['value']} flex-1`}>
                  {dataProductCcq?.company}
                </p>
              )}

            </div>
          </Col>
          <Col xl={12}>
            <div className='flex'>
              <p className={`${styles['label']}`}>NH giám sát:</p>
              {isEdit || query.id === 'create' ? (
                <InputComponent
                  value={fundForm?.bank_name}
                  placeholder={"N/A"}
                  onChange={e => edit({ ...fundForm, bank_name: e.target.value })}
                />
              ) : (
                <p className={`${styles['value']} flex-1`}>
                  {dataProductCcq?.bank_name}
                </p>
              )}
            </div>
          </Col>
        </Row>

        <Row style={{ width: '100%' }} gutter={[20, 0]}>
          <Col xl={12}>
            <div className='flex'>
              <p className={`${styles['label']}`}>Giới thiệu quỹ:</p>
              {isEdit || query.id === 'create' ? (
                <AreaComponent
                  value={fundForm?.property}
                  onChange={e => edit({ ...fundForm, property: e.target.value })}
                  placeholder={"N/A"}

                />
              ) : (
                <p className={`${styles['value']} flex-1`}>
                  {dataProductCcq?.property}
                </p>
              )}
            </div>
          </Col>
          <Col xl={12}>
            <div className='flex'>
              <p className={`${styles['label']}`}>Mục tiêu quỹ:</p>
              {isEdit || query.id === 'create' ? (
                <AreaComponent
                  value={fundForm?.information}
                  onChange={e => edit({ ...fundForm, information: e.target.value })}
                  placeholder={"N/A"}

                />
              ) : (
                <p className={`${styles['value']} flex-1`}>
                  {dataProductCcq?.information}
                </p>
              )}
            </div>
          </Col>
        </Row>

        <Row style={{ width: '100%' }} gutter={[20, 0]}>
          <Col xl={12}>
            <div className='flex'>
              <p className={`${styles['label']}`}>Ban đại diện quỹ:</p>

              {isEdit || query.id === 'create' ? (
                <AreaComponent
                  value={
                    fundForm?.represent
                  }
                  onChange={e => edit({ ...fundForm, represent: e.target.value })}
                  placeholder={"N/A"}

                />
              ) : (
                <div>
                  {dataProductCcq?.represent?.split(',')?.map((item, index) => (
                    <p className={`${styles['value']}`} key={index}>
                      {item}
                    </p>
                  ))}
                </div>
              )}


            </div>
          </Col>
          <Col xl={12}>
            <div className='flex'>
              <p className={`${styles['label']}`}>Tỷ trọng:</p>
              {isEdit || query.id === 'create' ? (
                <AreaComponent
                  value={
                    fundForm?.proportion
                  }
                  placeholder={"N/A"}
                  onChange={e => edit({ ...fundForm, proportion: e.target.value })}
                />
              ) : (

                <div
                  className={`${styles['value']} flex-1`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {dataProductCcq?.proportion?.split(',')?.map((item, index) => (
                    <p key={index}>
                      {item}
                    </p>
                  ))}

                </div>
              )}

            </div>
          </Col>
        </Row>

        <Row style={{ width: '100%' }} gutter={[20, 0]}>
          <Col xl={12}>
            <div className='flex'>
              <p className={`${styles['label']}`}>Công ty kiểm toán:</p>
              {isEdit || query.id === 'create' ? (
                <InputComponent
                  value={fundForm?.audit_firm}
                  placeholder={"N/A"}
                  onChange={e => edit({ ...fundForm, audit_firm: e.target.value })}
                />
              ) : (
                <p className={`${styles['value']} flex-1`}>
                  {dataProductCcq?.audit_firm}
                </p>
              )}

            </div>
          </Col>
          <Col xl={12}>
            <div className='flex'>
              <p className={`${styles['label']}`}>Quỹ được chuyển đổi:</p>
              {isEdit || query.id === 'create' ? (
                <InputComponent
                  value={fundForm?.fund_converted}
                  placeholder={"N/A"}

                  onChange={e => edit({ ...fundForm, fund_converted: e.target.value })}
                />
              ) : (
                <p className={`${styles['value']} flex-1`}>
                  {dataProductCcq?.name}
                </p>
              )}

            </div>
          </Col>
        </Row>

        <Row style={{ width: '100%' }} gutter={[20, 0]}>
          <Col xl={12}>
            <div className='flex'>
              <p className={`${styles['label']}`}>Tiền đầu tư tối thiểu:</p>

              {isEdit || query.id === 'create' ? (
                <InputComponent
                  value={fundForm?.min_transaction}
                  // value={Number(fundForm?.min_transaction)?.toLocaleString()}
                  placeholder={"0"}
                  type='number'
                  onChange={e => edit({ ...fundForm, min_transaction: e.target.value })}
                />
              ) : (
                <p className={`${styles['value']} flex-1`}>
                  {dataProductCcq?.min_transaction?.toLocaleString()} VND
                </p>
              )}
            </div>
          </Col>
          <Col xl={12}>
            <div className='flex'>
              <p className={`${styles['label']}`}>Số CCQ bán tối thiểu:</p>
              {isEdit || query.id === 'create' ? (
                <InputComponent
                  value={fundForm?.min_amout_sell}
                  placeholder={"0"}
                  onChange={e => edit({ ...fundForm, min_amout_sell: e.target.value })}
                />
              ) : (
                <p className={`${styles['value']} flex-1`}>
                  {dataProductCcq?.min_amout_sell}
                </p>
              )}

            </div>
          </Col>
        </Row>

        <Row style={{ width: '100%' }} gutter={[20, 0]}>
          <Col xl={12}>
            <div className='flex'>
              <p className={`${styles['label']}`}>Số CCQ tối thiểu còn lại sau lệnh bán:</p>
              {isEdit || query.id === 'create' ? (
                <InputComponent
                  value={fundForm?.min_amout_after_sell}
                  placeholder={"0"}
                  onChange={e => edit({ ...fundForm, min_amout_after_sell: e.target.value })}
                />
              ) : (
                <p
                  className={`${styles['value']} flex-1`}
                  style={{
                    display: 'flex',
                    alignItems: 'end'
                  }}
                >
                  {dataProductCcq?.min_amout_after_sell}
                </p>
              )}

            </div>
          </Col>
          <Col xl={12}>
            <div className='flex'>
              <p className={`${styles['label']}`}>Tài khoản nhận tiền mua:</p>
              {isEdit || query.id === 'create' ? (
                <AreaComponent
                  value={fundForm?.purchase_account}
                  placeholder={"N/A"}
                  onChange={e => edit({ ...fundForm, purchase_account: e.target.value })}
                />
              ) : (
                <div
                  className={`${styles['value']} flex-1`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {dataProductCcq?.purchase_account?.split(',')?.map((item, index) => (
                    <p key={index}>
                      {item}
                    </p>
                  ))}

                </div>
              )}
            </div>
          </Col>
        </Row>

      </Row>
      {isEdit && (
        <div className={`${styles['confirm-box']}`}>
          <div>
            <p className={`${styles['text-note']}`}>
              Nhập ‘update’ để xác nhận thay đổi
            </p>
            <Input
              styleWr={{ width: '136px', marginTop: '16px' }}
              placeholder="update"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
          </div>
          <div className='flex center'>
            <Button
              title={"Hủy"}
              onClick={() => handleRequest(confirm)}
              style={{
                width: '130px',
                marginRight: '56px'
              }}
            // disabled={confirm === 'reject' && validateComment ? false : true}
            />
            <Button
              title={loading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : "Lưu"}
              onClick={() => handleRequest(confirm)}
              disabled={confirm === 'update' ? false : true}
              style={{ width: '130px' }}
            />
          </div>
        </div>
      )}
      {query.id === 'create' && (
        <div className={`${styles['confirm-box']}`}>
          <div>
            <p className={`${styles['text-note']}`}>
              Nhập ‘create’ để tạo mới
            </p>
            <Input
              styleWr={{ width: '136px', marginTop: '16px' }}
              placeholder="create"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
          </div>
          <div className='flex center'>
            <Button
              title={"Hủy"}
              onClick={() => router.push('/product/ccq')}
              style={{
                width: '130px',
                marginRight: '56px'
              }}
            />
            <Button
              title={loading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : "Lưu"}
              onClick={() => handleRequest(confirm)}
              disabled={confirm === 'create' ? false : true}
              style={{ width: '130px' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default InfoProductCcq
