import React, { useEffect, useState } from 'react';
import styles from '../../style.module.css';
import GoBackButton from '@/components/Button/GoBackButton';
import ChangeButton from '@/components/Button/ChangeButton';
import { Col, Row, notification } from 'antd';
import Input from '@/components/Input/Input';
import { useRouter } from 'next/router';
import axiosInstance from '@/utils/axiosIntance';
import moment from 'moment';
import Button from '@/components/Button/Button';
import { LoadingOutlined } from '@ant-design/icons';
import InputSelect from '@/components/Input/InputSelect';

const roleOptions = [
    {
        label: 'NV kiểm soát',
        value: 0
    },
    {
        label: 'NV báo cáo',
        value: 2
    },
    {
        label: 'NV hệ thống',
        value: 3
    },
    {
        label: 'NV quản trị',
        value: 4
    },
    {
        label: 'NV IT',
        value: 5
    }
]

function AccountDetail() {
    const [data, setData] = useState()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: '',
        name: '',
        role_id: '',
        phone: '',
        admin_user_status_id: 1
    });
    const [editMode, setEditMode] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const { id } = router.query

    const getUserInfo = async (id) => {
        const res = await axiosInstance.get('/admin/admin-user/info?user_id=' + id)
        if (res.data.code === 200) {
            const resp = res.data.data;
            setData(resp)
            setForm({
                email: resp.email,
                name: resp.name,
                role_id: resp.role_id,
                phone: resp.phone,
                admin_user_status_id: resp.admin_user_status_id
            })
        }
    }

    const handleUpdateAccount = async () => {

        for (let key in form) {
            if (form[key] === '') {
                return api['error']({
                    message: 'Thất bại !',
                    description: 'Vui lòng điền đầy đủ thông tin!',
                });
            }
        }
        setLoading(true)
        // const formData = {
        //     request: {
        //         admin_user_request: user?.id,
        //         request_status_id: 0,
        //         request_type_id: 6
        //     },
        //     requestData: {
        //         email: form.email,
        //         role_id: form.role_id,
        //         temporary_password: form.password,
        //         phone: form.phone,
        //         admin_user_status_id: form.admin_user_status_id,
        //         name: form.name
        //     }
        // }
        // const res = await axiosInstance.post('/request/create-system', formData)
        // console.log(res)
        // if (res.data.code === 200) {
        api['success']({
            message: 'Thành công !',
            description: 'Tạo yêu cầu thành công!',
        })
        // } else {
        //     api['error']({
        //         message: 'Thất bại !',
        //         description: res.data.message,
        //     })
        // }

        setLoading(false)
    }

    useEffect(() => {
        getUserInfo(id)
    }, [id])
    return (
        <div className='main-content'>
            {contextHolder}
            <div className={styles['header-line']}>
                <GoBackButton />
                <ChangeButton currentValue={editMode} onClick={setEditMode} />
            </div>
            <div className={`${styles['box']}`}>
                <div className={`${styles['account-info']}`}>
                    <Row style={{ width: '100%' }} gutter={[0, 20]}>
                        <Row style={{ width: '100%' }}>
                            <Col xl={12}>
                                <div className='flex'>
                                    <p className={`${styles['label']}`}>ID:</p>
                                    <p className={`${styles['value']}`}>{data?.id}</p>
                                </div>
                            </Col>
                            <Col xl={12}>
                                <div className='flex'>
                                    <p className={`${styles['label']}`}>Tài khoản:</p>
                                    {!editMode && <p className={`${styles['value']}`}>{data?.email}</p>}
                                    {editMode && <Input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />}
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ width: '100%' }}>
                            <Col xl={12}>
                                <div className='flex'>
                                    <p className={`${styles['label']}`}>Tên:</p>
                                    {!editMode && <p className={`${styles['value']}`}>{data?.name}</p>}
                                    {editMode && <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />}
                                </div>
                            </Col>
                            <Col xl={12}>
                                <div className='flex'>
                                    <p className={`${styles['label']}`}>Điện thoại:</p>
                                    {!editMode && <p className={`${styles['value']}`}>{data?.phone}</p>}
                                    {editMode && <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />}
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ width: '100%' }}>
                            <Col xl={12}>
                                <div className='flex'>
                                    <p className={`${styles['label']}`}>Vai trò:</p>
                                    {!editMode && <p className={`${styles['value']}`}>{data?.role?.name}</p>}
                                    {editMode && <InputSelect
                                        options={roleOptions}
                                        optionDefaultLabel={'Chọn vai trò'}
                                        onChange={(e) => setForm({
                                            ...form, role_id: e.target.value
                                        })}
                                    />}
                                </div>
                            </Col>
                            <Col xl={12}>
                                <div className='flex'>
                                    <p className={`${styles['label']}`}>Thời gian tạo:</p>
                                    <p className={`${styles['value']}`}>{moment(data?.created_at).format("DD/MM/YYYY, hh:mm:ss")}</p>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ width: '100%' }}>
                            <Col xl={12}>
                                <div className='flex'>
                                    <p className={`${styles['label']}`}>Trạng thái:</p>
                                    {!editMode && <p className={`${styles['value']}`}>{data?.admin_user_status?.name}</p>}
                                    {editMode && <>
                                        <div className='flex al-ct'>
                                            <input type="radio"
                                                name='status'
                                                id="status-check"
                                                defaultChecked={true}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        setForm({
                                                            ...form,
                                                            admin_user_status_id: 1,
                                                        })
                                                    }
                                                }}
                                            />
                                            <label htmlFor='status-check' className='label-circle'></label>
                                            <label htmlFor='status-check'>Đang sử dụng</label>
                                        </div>
                                        <div className='flex al-ct' style={{ marginLeft: '12px' }}>
                                            <input type="radio" name='status' id="status-not-check"
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        setForm({
                                                            ...form,
                                                            admin_user_status_id: 0,
                                                        })
                                                    }
                                                }}
                                            />
                                            <label htmlFor='status-not-check' className='label-circle'></label>
                                            <label htmlFor='status-not-check'>Vô hiệu hóa</label>
                                        </div>
                                    </>}
                                </div>
                            </Col>

                        </Row>
                    </Row>
                </div>
                {editMode && <>
                    <p className={`${styles['text-note']}`}>
                        Nhập ‘update’ để xác nhận thay đổi:
                    </p>
                    <Input
                        styleWr={{ width: '136px', marginTop: '16px' }}
                        placeholder="update"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                    />

                    <div className='flex center'>
                        <Button
                            title="Hủy"
                            onClick={() => setEditMode(false)}
                            style={{ width: '130px', marginRight: '56px' }}
                            disabled={loading}
                        />
                        <Button
                            title={loading ? <LoadingOutlined /> : "Gửi"}
                            onClick={handleUpdateAccount}
                            disabled={confirm == 'update' && loading == false ? false : true}
                            style={{ width: '130px' }}
                        />
                    </div>
                </>}
                {/* <div className={`${styles['account-history']}`}>
                <p className={`${styles['account-history-title']}`}>
                    Lịch sử
                </p>
                <div className={`${styles['history-list']}`}>
                    {history?.map((item,index) =>(
                        <div className={`flex ${styles['history-item']}`} key={index}>
                            <p className={`${styles['history-time']}`}>{item.time}</p>
                            <p className={`${styles['history-action']}`}>{item.action}</p>
                        </div>
                    ))}
                </div>
            </div> */}
            </div>
        </div>
    )
}

export default AccountDetail