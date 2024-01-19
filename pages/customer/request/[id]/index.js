import React, { useEffect, useState } from 'react';
import styles from '../../style.module.css';
import GoBackButton from '@/components/Button/GoBackButton';
import { Col, Row, Tabs, notification } from 'antd';
import Image from 'next/image';
import kycAva from '../../../../asset/image/kyc-ava.png';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import axiosInstance from '@/utils/axiosIntance';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import moment from 'moment/moment';
import { LoadingOutlined } from '@ant-design/icons';
import CommentComponent from '@/components/CommentComponent/CommentComponent';
import { getCustomerRequetsDetails } from '@/apiClient/customerAccount';

const onChange = (key) => {
    console.log(key);
};

const Tab2 = ({ data }) => {
    console.log("data________________tab2", data);
    return (
        <>
            <div className={`${styles['account-info']}`}>
                <Row style={{ width: '100%' }} gutter={[0, 20]}>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Loại thẻ:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.gov_id_type?.name}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Số thẻ:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.gov_id}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Họ và tên:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.name}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Ngày sinh:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.date_of_birth}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Giới tính:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.gender}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Quốc tịch:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.nationality}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Quê quán:</p>
                                <p className={`${styles['value']} flex-1 text-green`}>{data?.request?.user?.hometown}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Nơi thường trú:</p>
                                <p className={`${styles['value']} flex-1 text-green`}>{data?.request?.user?.address}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Ngày cấp:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.gov_id_issue_date}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Ngày hết hạn:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.gov_id_issue_date}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Nơi cấp:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.gov_id_issue_place}</p>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </div>
            <div style={{ marginTop: '25px' }}>
                <Row style={{ width: '100%' }}>
                    <Row style={{ width: '100%' }}>
                        <Col span={8}>
                            <p className='text-small text-center'>Ảnh chân dung</p>
                        </Col>
                        <Col span={8}>
                            <p className='text-small text-center'>Ảnh thẻ mặt trước</p>

                        </Col>
                        <Col span={8}>
                            <p className='text-small text-center'>Ảnh thẻ mặt sau</p>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} className={`${styles['kyc-img']}`}>
                        <Col span={8}>
                            <div className={`${styles['kyc-avatar']}`}>
                                {data?.request?.user?.portrait_url ? (
                                    <Image
                                        width={364}
                                        height={205}
                                        className={`${styles['kyc-chip-img']}`}
                                        alt=""
                                        src={data?.request?.user?.portrait_url}
                                    />
                                ) : (
                                    <Image
                                        src={kycAva}
                                        width={164}
                                        height={176}
                                        className={`${styles['kyc-avatar-image']}`}
                                        alt='kyc avatar'
                                    />
                                )}

                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={`${styles['kyc-chip']}`}>
                                {data?.request?.user?.gov_id_front_url ? (
                                    <Image
                                        width={364}
                                        height={205}
                                        className={`${styles['kyc-chip-img']}`}
                                        alt=""
                                        src={data?.request?.user?.gov_id_front_url}
                                    />
                                ) : (
                                    <div className={`${styles['kyc-chip-img']}`}></div>
                                )}

                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={`${styles['kyc-chip']}`}>
                                {data?.request?.user?.gov_id_back_url ? (
                                    <Image
                                        width={364}
                                        height={205}
                                        className={`${styles['kyc-chip-img']}`}
                                        alt=""
                                        src={data?.request?.user?.gov_id_back_url}
                                    />
                                ) : (
                                    <div className={`${styles['kyc-chip-img']}`}></div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Row>
            </div >
        </>
    )
}
const Tab1 = ({ data, handleRequest, isApprove, loading }) => {
    const [confirm, setConfirm] = useState('');
    const [comment, setComment] = useState('');
    const [validateComment, setValidateComment] = useState(false);
    const getComment = (text) => setComment(text)
    useEffect(() => {
        if (confirm === 'reject') {
            { comment ? setValidateComment(true) : setValidateComment(false) }
        } else {
            setValidateComment(true)
        }
    }, [comment, confirm])

    return (
        <>
            <div className={`${styles['account-info']}`}>
                <Row style={{ width: '100%' }} gutter={[0, 20]}>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Mã KH:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.id}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Tên KH:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.name}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Email:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.email}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Điện thoại:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.phone_number}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Ngày sinh:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.date_of_birth}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Giới tính:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.gender}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Quốc tịch:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.nationality}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Địa chỉ liên hệ:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.address}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Thời gian tạo:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.created_date}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Trạng thái:</p>
                                <p className={`${styles['value']} flex-1 ${data?.request?.request_status?.id == 0 ? 'text-red' : 'text-green'}`}>
                                    {data?.request?.request_status?.name}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </div>
            {!isApprove && data?.request?.request_status_id == 0 && (
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
            )}
            <div className={`${styles['account-history']}`}>
                <p className={`${styles['account-history-title']}`}>
                    Lịch sử
                </p>
                <div className={`${styles['history-list']}`}>
                    {data?.request?.requestLogs?.map((item, index) => (
                        <div className={`flex ${styles['history-item']}`} key={index}>
                            <p className={`${styles['history-time']}`}>{moment(item.created_at).format("DD/MM/YYYY, HH:mm:ss")}</p>
                            <p className={`${styles['history-action']}`}>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
const ChangeInfoTab = ({ data, handleRequest, isApprove, loading }) => {
    const [confirm, setConfirm] = useState('');
    const renderPreview = () => {
        if (data?.request?.user?.status_change_phone) {
            return (
                <Row style={{ width: '100%' }} gutter={[0, 20]}>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Điện thoại :</p>
                                <p className={`${styles['value']} flex-1`}>{data?.old_user?.phone_number}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Điện thoại :</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.phone_number}</p>
                            </div>
                        </Col>
                    </Row>
                </Row>
            )
        } else if (data?.request?.user?.status_change_address) {
            return (
                <Row style={{ width: '100%' }} gutter={[0, 20]}>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Địa chỉ liên hệ:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.old_user?.address}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Địa chỉ liên hệ:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.address}</p>
                            </div>
                        </Col>
                    </Row>
                </Row>
            )
        } else if (data?.request?.user?.status_change_bank) {
            return (
                <Row style={{ width: '100%' }} gutter={[0, 20]}>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Tên chủ tài khoản:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.old_user?.bank_account_holder_name}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Tên chủ tài khoản:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.bank_account_holder_name}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Số tài khoản:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.old_user?.bank_account_number}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Số tài khoản:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.bank_account_number}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Ngân hàng:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.old_user?.bank?.name}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Ngân hàng:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.bank?.name}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Chi nhánh:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.old_user?.bank_branch}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Chi nhánh:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.bank_branch}</p>
                            </div>
                        </Col>
                    </Row>
                </Row>
            )
        }
    }
    return (
        <>
            <div className={`${styles['account-info']}`}>
                <Row style={{ width: '100%' }} gutter={[0, 20]}>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Mã KH:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.id}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Tên KH:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.name}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Email:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.email}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Điện thoại:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.request?.user?.phone_number}</p>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </div>
            {data?.request?.request_status_id == 0 && (
                <div className={`${styles['preview-change']}`}>
                    <Row style={{ width: '100%', marginTop: '20px', marginBottom: '30px' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <p className={`${styles['value']} text-orange`}>Thông tin hhiện tại</p>
                        </Col>
                        <Col xl={12}>
                            <p className={`${styles['value']} text-orange`}>Thông tin thay đổi</p>
                        </Col>
                    </Row>
                    {renderPreview()}
                </div>
            )}
            {!isApprove && data?.request?.request_status_id == 0 && (
                <div className={`${styles['confirm-box']}`}>
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
                            disabled={confirm === 'reject' ? false : true}
                        />
                        <Button
                            title={loading && confirm === 'approve' ? <LoadingOutlined style={{ fontSize: '20px' }} /> : "Phê duyệt"}
                            onClick={() => handleRequest(confirm)}
                            disabled={confirm === 'approve' ? false : true}
                            style={{ width: '130px' }}
                        />
                    </div>
                </div>
            )}
            <div className={`${styles['account-history']}`}>
                <p className={`${styles['account-history-title']}`}>
                    Lịch sử
                </p>
                <div className={`${styles['history-list']}`}>
                    {data?.request?.requestLogs?.map((item, index) => (
                        <div className={`flex ${styles['history-item']}`} key={index}>
                            <p className={`${styles['history-time']}`}>{moment(item.created_at).format("DD/MM/YYYY, HH:mm:ss")}</p>
                            <p className={`${styles['history-action']}`}>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
function CustomerRequestDetail() {
    const [data, setData] = useState({})
    const { user } = useUser()
    const [api, contextHolder] = notification.useNotification();

    // set khi handle xong request approve hoac reject de khong cho nhan nhieu lan

    const [isApprove, setIsApprove] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const { id, type } = router.query


    const getRequestDetail = async (id) => {
        const res = await getCustomerRequetsDetails(id);
        console.log(res)
        if (res?.code === 200) {
            setData(res?.data)
        }
    }

    const handleRequest = async (confirm) => {
        if (loading) return;
        try {
            setLoading(true)
            const form = {
                id: data?.request?.id,
                request_status_id: data?.request?.request_status_id,
                request_type_id: data?.request?.request_type_id,
                transaction_id: data?.request?.transaction_id,
                user_id: data?.request?.user_id,
                approve: true,
                admin_user_id: user?.id,
            }
            if (confirm === 'approve') {
                form.approve = true
            } else {
                form.approve = false
            }
            // console.log('form_______', form);
            const res = await axiosInstance.post('/request/excute', form)
            console.log(res)
            if (res.data.code === 200) {
                setIsApprove(true)
                api['success']({
                    message: 'Thành công !',
                    description:
                        'Xử lí thành công !',
                });
            }
            setLoading(false);
        } catch (error) {
            setLoading(false)
            api['error']({
                message: 'Thất bại !',
                description: error.message,
            });
        }
    }
    let items;
    // nếu là yêu cầu thay đổi thông tin thì tab khác , chi tiết ở design figma
    if (type == 1) {
        items = [
            {
                key: '1',
                label: `Thông tin`,
                children: <ChangeInfoTab
                    data={data}
                    handleRequest={handleRequest}
                    isApprove={isApprove}
                    loading={loading}
                />,
            }
        ];
    } else {
        items = [
            {
                key: '1',
                label: `Thông tin`,
                children: <Tab1 data={data} handleRequest={handleRequest} isApprove={isApprove} loading={loading} />,
            },
            {
                key: '2',
                label: `KYC`,
                children: <Tab2 data={data} />,
            },
            {
                key: '3',
                label: `RT & TTKB`,
                children: `Khách hàng không thuộc danh sách rửa tiền và tài trợ khủng bố`,
            },
        ];
    }

    useEffect(() => {
        getRequestDetail(id)
    }, [id])

    return (
        <div className='main-content'>
            {contextHolder}
            <div>
                <GoBackButton />
            </div>
            <div className={`${styles['account']}`}>
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default CustomerRequestDetail