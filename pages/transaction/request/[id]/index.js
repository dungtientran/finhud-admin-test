import React, { Fragment, useEffect, useState } from 'react';
import styles from '../../style.module.css';
import GoBackButton from '@/components/Button/GoBackButton';
import { Col, Row, Tabs, notification } from 'antd';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import axiosInstance from '@/utils/axiosIntance';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import moment from 'moment/moment';
import { LoadingOutlined } from '@ant-design/icons';
import CommentComponent from '@/components/CommentComponent/CommentComponent';
import CustomSkeletion from '@/components/Skeleton/CustomSkeletion';
import { getTransactionRequestDetails } from '@/apiClient/transaction';
const COLORMAP = {
    0: "text-orange",
    1: "text-green",
    2: "text-red",
};
function CustomerRequestDetail() {
    const [data, setData] = useState({})
    const { user } = useUser()
    const [api, contextHolder] = notification.useNotification();
    const [isApprove, setIsApprove] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const router = useRouter();
    const { id } = router.query;
    const getTransactionRequestDetail = async (id) => {
        setLoadingData(true);
        const res = await getTransactionRequestDetails(id);
        setData(res?.data);
        setLoadingData(false);
    }
    const handleRequest = async (confirm) => {
        if (loading) return;
        try {
            setLoading(true);
            const form = {
                id: data?.id,
                request_status_id: data?.request_status_id,
                request_type_id: data?.request_type_id,
                transaction_id: data?.transaction_id,
                user_id: data?.user_id,
                approve: true,
                admin_user_id: user?.id,
            }

            if (confirm === 'approve') {
                form.approve = true
            } else {
                form.approve = false
            }
            console.log('form', form);
            const res = await axiosInstance.post('/request/excute', form)
            console.log(res.data)
            if (res.data.code === 200) {
                setIsApprove(true)
                api['success']({
                    message: 'Thành công !',
                    description:
                        'Xử lí thành công !',
                });
                getTransactionRequestDetail(id)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            api['error']({
                message: 'Thất bại !',
                description: error.message,
            });
        }
    }
    const [confirm, setConfirm] = useState('');
    const [comment, setComment] = useState('');
    const [validateComment, setValidateComment] = useState(false);
    const getComment = (text) => setComment(text);
    useEffect(() => {
        if (confirm === 'reject') {
            { comment ? setValidateComment(true) : setValidateComment(false) };
        } else {
            setValidateComment(true);
        }
    }, [comment, confirm])
    useEffect(() => {
        getTransactionRequestDetail(id)
    }, [id])


    return (
        <div className='main-content'>
            {contextHolder}
            <div>
                <GoBackButton />
            </div>
            {loadingData
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
                                                {Number(data?.transaction?.purchased_price).toLocaleString()} VND
                                            </p>
                                        </div>
                                    </Col>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>NAV: </p>
                                            <p className={`${styles['value']}`}></p>
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
                                            <p className={`${styles['label']}`}>Hình thức thanh toán:</p>
                                            <p className={`${styles['value']} flex-1`}>Chuyển khoản</p>
                                        </div>
                                    </Col>
                                    <Col xl={12}>
                                        <div className='flex'>
                                            <p className={`${styles['label']}`}>Trạng thái thanh toán</p>
                                            <p className={`${styles['value']} flex-1 `}>{data?.transaction?.status?.name} </p>
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
                                            <p className={`${styles['value']} flex-1 ${COLORMAP[data?.request_status_id]}`}>{data?.request_status?.name} </p>
                                        </div>
                                    </Col>
                                </Row>

                            </Row>
                        </div>
                        <div className={`${styles['account-history']}`}>
                            {!isApprove && data?.request_status_id == 0 ? (
                                <div className={`${styles['confirm-box']}`}>
                                    <CommentComponent
                                        getComment={getComment}
                                        validateComment={validateComment}
                                    />
                                    <div>
                                        <p className={`${styles['text-note']}`}>
                                            Nhập ‘approve’ để phê duyệt, ‘reject' để từ chối:
                                        </p>
                                        <Input
                                            styleWr={{ width: '136px', marginTop: '16px' }}
                                            placeholder="approve"
                                            value={confirm}
                                            onChange={e => setConfirm(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex center'>
                                        <Button
                                            title={loading && confirm === 'reject' ? <LoadingOutlined style={{ fontSize: '20px' }} /> : "Từ chối"}
                                            onClick={() => handleRequest(confirm)}
                                            style={{
                                                width: '130px',
                                                marginRight: '56px'
                                            }}
                                            disabled={confirm === 'reject' && validateComment ? false : true}
                                        />
                                        <Button
                                            title={loading && confirm === 'approve' ? <LoadingOutlined style={{ fontSize: '20px' }} /> : "Phê duyệt"}
                                            onClick={() => handleRequest(confirm)}
                                            disabled={confirm === 'approve' ? false : true}
                                            style={{ width: '130px' }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <Fragment>
                                    <p className={`${styles['account-history-title']}`}>
                                        Lịch sử
                                    </p>
                                    <div className={`${styles['history-list']}`}>
                                        {data?.requestLogs?.map((item, index) => (
                                            <div className={`flex ${styles['history-item']}`} key={index}>
                                                <p className={`${styles['history-time']}`}>{moment(item.created_at).format("DD/MM/YYYY, HH:mm:ss")}</p>
                                                <p className={`${styles['history-action']}`}>{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </Fragment>
                            )}
                        </div>
                    </div>
                )}
        </div>
    )
}

export default CustomerRequestDetail

