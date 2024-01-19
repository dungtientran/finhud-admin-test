import GoBackButton from '@/components/Button/GoBackButton';
import React, { useEffect, useState } from 'react';
import styles from '../../style.module.css';
import { Col, Row } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import CustomSkeletion from '@/components/Skeleton/CustomSkeletion';
import { getTransactionOrderDetails } from '@/apiClient/transaction';

function TransactionDetail() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { id } = router.query;
    const getData = async () => {
        setLoading(true);
        const res = await getTransactionOrderDetails(id);
        if (res.code === 200) {
            setData(res?.data);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='main-content'>
            <div>
                <GoBackButton />
            </div>
            {loading
                ?
                <div style={{ marginTop: '50px' }}>
                    <CustomSkeletion />
                </div>
                :
                (
                    <div className={`${styles['box']}`}>
                        <div className={`${styles['box-content']}`}>
                            <Row style={{ width: '100%' }} gutter={[0, 30]}>
                                <Row style={{ width: '100%' }} gutter={[20, 0]}>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>Loại lệnh: </p>
                                            <p className={`${styles['value']} text-green`}>
                                                {data?.transaction?.type_id === "1" ? 'Bán' : 'Mua'}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>Mã lệnh:</p>
                                            <p className={`${styles['value']} flex-1`}>{data?.transaction?.id}</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ width: '100%' }} gutter={[20, 0]}>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>Mã KH: </p>
                                            <p className={`${styles['value']} flex-1`}>{data?.transaction?.user_id}</p>
                                        </div>
                                    </Col>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>Tên KH:</p>
                                            <p style={{ color: '#1751F0' }} className={`${styles['value']} flex-1`}>{data?.transaction?.user?.name}</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ width: '100%' }} gutter={[20, 0]}>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>Tên CCQ:</p>
                                            <p className={`${styles['value']} flex-1`}>{data?.transaction?.fund?.name}</p>
                                        </div>
                                    </Col>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>Công ty QLQ: </p>
                                            <p className={`${styles['value']} flex-1`}>{data?.transaction?.fund?.company}</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ width: '100%' }} gutter={[20, 0]}>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>Giá trị giao dịch: </p>
                                            <p className={`${styles['value']}`}>
                                                {(Number(data?.transaction?.amount) * Number(data?.transaction?.purchased_price)).toLocaleString()} VND
                                            </p>
                                        </div>
                                    </Col>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>NAV: </p>
                                            <p className={`${styles['value']}`}>

                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ width: '100%' }} gutter={[20, 0]}>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>Số lượng CCQ:</p>
                                            <p className={`${styles['value']} flex-1`}>{data?.transaction?.amount}</p>
                                        </div>
                                    </Col>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>Phí giao dịch:</p>
                                            <p className={`${styles['value']} flex-1`}>
                                                {(Number(data?.transaction?.fee) * Number(data?.transaction?.purchased_price)).toLocaleString()} VND
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ width: '100%' }} gutter={[20, 0]}>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>Ngày đặt:</p>
                                            <p className={`${styles['value']} flex-1`}>
                                                {moment(data?.transaction?.created_date).format("DD/MM/YYYY, HH:mm:ss")}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>Phiên khớp lệnh:</p>
                                            <p className={`${styles['value']} flex-1`}>
                                                {moment(data?.transaction?.close_date).format("DD/MM/YYYY, HH:mm:ss")}
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ width: '100%' }} gutter={[20, 0]}>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>Hình thức thanh toán: </p>
                                            <p className={`${styles['value']} flex-1`}>Chuyển khoản</p>
                                        </div>
                                    </Col>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>Trạng thái thanh toán</p>
                                            <p className={`${styles['value']} flex-1`}>{data?.transaction?.status?.name} </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ width: '100%' }} gutter={[20, 0]}>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>NV kiểm sát:</p>
                                            <p className={`${styles['value']} flex-1`}>Nguyễn Thị B (ID xxxxx)</p>
                                        </div>
                                    </Col>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>Trạng thái phê duyệt:</p>
                                            <p className={`${styles['value']} flex-1`}>Đợi phê duyệt </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ width: '100%' }} gutter={[20, 0]}>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>Trạng thái lệnh:</p>
                                            <p className={`${styles['value']} ${data?.transaction?.status_id == 5 ? 'text-green' : 'text-orange'}`}>
                                                {data?.transaction?.status?.name}
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </Row>
                        </div>
                        <div className={`${styles['account-history']}`}>
                            <p className={`${styles['account-history-title']}`}>
                                Lịch sử
                            </p>
                            <div className={`${styles['history-list']}`}>
                                {data?.requestLogs?.map((item, index) => (
                                    <div className={`flex ${styles['history-item']}`} key={index}>
                                        <p className={`${styles['history-time']}`}>{moment(item?.created_at).format("DD/MM/YYYY, HH:mm:ss")}</p>
                                        <p className={`${styles['history-action']}`}>{item?.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default TransactionDetail

