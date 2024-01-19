import React, { useEffect, useState } from 'react';
import styles from '../../style.module.css';
import GoBackButton from '@/components/Button/GoBackButton';
import { Col, Row, Tabs } from 'antd';
import Image from 'next/image';
import kycAva from '../../../../asset/image/kyc-ava.png';
import { useRouter } from 'next/router';
import moment from 'moment';
import { getCustomerAccountDetails } from '@/apiClient/customerAccount';
const onChange = (key) => {
    console.log(key);
};
const Tab3 = ({ data }) => {
    return (
        <>
            <div className={`${styles['account-info']}`} style={{ borderBottom: 'none' }}>
                <Row style={{ width: '100%' }} gutter={[0, 20]}>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Tên chủ tài khoản:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.bank_account_holder_name}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Số tài khoản:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.bank_account_number}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Ngân hàng:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.bank?.name}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Chi nhánh:</p>
                                <p className={`${styles['value']} flex-1 text-green`}>{data?.customer?.bank_branch}</p>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </div>
        </>
    )
}
const Tab2 = ({ data }) => {
    return (
        <>
            <div className={`${styles['account-info']}`}>
                <Row style={{ width: '100%' }} gutter={[0, 20]}>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Loại thẻ:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.gov_id_type?.name}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Số thẻ:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.gov_id}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Họ và tên:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.name}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Ngày sinh:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.date_of_birth}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Giới tính:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.gender}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Quốc tịch:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.nationality}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Quê quán:</p>
                                <p className={`${styles['value']} flex-1 text-green`}>{data?.customer?.address}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Nơi thường trú:</p>
                                <p className={`${styles['value']} flex-1 text-green`}>{data?.customer?.address}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Ngày cấp:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.gov_id_issue_date}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Ngày hết hạn:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.gov_id_issue_date}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Nơi cấp:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.gov_id_issue_place}</p>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </div>
            <div style={{ marginTop: '25px' }}>
                <Row style={{ width: '100%' }}>
                    <Row style={{ width: '100%' }}>
                        <Col flex="22%">
                            <p className='text-small text-center'>Ảnh chân dung</p>
                        </Col>
                        <Col flex="39%">
                            <p className='text-small text-center'>Ảnh thẻ mặt trước</p>

                        </Col>
                        <Col flex="39%">
                            <p className='text-small text-center'>Ảnh thẻ mặt sau</p>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} className={`${styles['kyc-img']}`}>
                        <Col flex="22%">
                            <div className={`${styles['kyc-avatar']}`}>
                                {data?.customer?.portrait_url ? (
                                    <Image
                                        width={364}
                                        height={205}
                                        className={`${styles['kyc-chip-img']}`}
                                        alt=""
                                        src={data?.customer?.portrait_url}
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
                        <Col flex="39%">
                            <div className={`${styles['kyc-chip']}`}>
                                {data?.customer?.gov_id_front_url ? (
                                    <Image
                                        width={364}
                                        height={205}
                                        className={`${styles['kyc-chip-img']}`}
                                        alt=""
                                        src={data?.customer?.gov_id_front_url}
                                    />
                                ) : (
                                    <div className={`${styles['kyc-chip-img']}`}></div>
                                )}

                            </div>
                        </Col>
                        <Col flex="39%">
                            <div className={`${styles['kyc-chip']}`}>
                                {data?.customer?.gov_id_back_url ? (
                                    <Image
                                        width={364}
                                        height={205}
                                        className={`${styles['kyc-chip-img']}`}
                                        alt=""
                                        src={data?.customer?.gov_id_back_url}
                                    />
                                ) : (
                                    <div className={`${styles['kyc-chip-img']}`}></div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Row>
            </div>
        </>
    )
}

const Tab1 = ({ data }) => {
    return (
        <>
            <div className={`${styles['account-info']}`}>
                <Row style={{ width: '100%' }} gutter={[0, 20]}>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Mã KH:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.id}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Tên KH:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.name}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Email:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.email}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Điện thoại:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.phone_number}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Địa chỉ liên hệ:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.address}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Thời gian tạo:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.created_date}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Trạng thái TK:</p>
                                <p className={`${styles['value']} flex-1 text-green`}>
                                    {
                                        data?.cognitoMetadata?.UserStatus === "CONFIRMED" &&
                                            data?.cognitoMetadata?.Enabled === true ? 'Đang sử dụng' :
                                            data?.cognitoMetadata?.UserStatus === "UNCONFIRMED" &&
                                                data?.cognitoMetadata?.Enabled === true ? 'Mở tài khoản' : 'Khóa'
                                    }
                                </p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Trạng thái KYC:</p>
                                <p className={`${styles['value']} flex-1  ${data?.customer?.validated === 2 ? 'text-green' : 'text-red'}`}>
                                    {data?.customer?.validated === 2 ? 'Đã xác thực' : 'Chưa xác thực'}
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} gutter={[20, 0]}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Yêu cầu hiện tại:</p>
                                <p className={`${styles['value']} flex-1`}>{data?.customer?.requestType || 'Không có'}</p>
                            </div>
                        </Col>
                        {/* <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Trạng thái yêu cầu:</p>
                                <p className={`${styles['value']} flex-1`}>Không có</p>
                            </div>
                        </Col> */}
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
                            <p className={`${styles['history-time']}`}>{moment(item.created_at).format("DD/MM/YYYY, HH:mm:ss")}</p>
                            <p className={`${styles['history-action']}`}>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

function AccountDetail() {
    const [data, setData] = useState()

    const items = [
        {
            key: '1',
            label: `Thông tin`,
            children: <Tab1 data={data} />,
        },
        {
            key: '2',
            label: `KYC`,
            children: <Tab2 data={data} />,
        },
        {
            key: '3',
            label: `TK NH`,
            children: <Tab3 data={data} />,
        },
        {
            key: '4',
            label: `RT & TTKB`,
            children: `Khách hàng không thuộc danh sách rửa tiền và tài trợ khủng bố`,
        },
    ];
    const router = useRouter();
    const { id } = router.query;
    const getUserData = async (id) => {
        const res = await getCustomerAccountDetails(id);
        console.log(res)
        if (res?.code === 200) {
            setData(res?.data);
        }
    }
    useEffect(() => {
        getUserData(id);
    }, [id])

    console.log("data________________________", data);
    return (
        <div className='main-content'>
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

export default AccountDetail