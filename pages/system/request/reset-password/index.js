import GoBackButton from '@/components/Button/GoBackButton'
import { Col, Row, notification } from 'antd'
import React, { useState } from 'react'

import styles from '../../style.module.css'
import Input from '@/components/Input/Input'
import InputPassword from '@/components/Input/InputPassword'
import Button from '@/components/Button/Button'
import InputSelect from '@/components/Input/InputSelect'
import { useRouter } from 'next/router'
import axiosInstance from '@/utils/axiosIntance'
import { LoadingOutlined } from '@ant-design/icons'
import useUser from '@/hooks/useUser'

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

function ResetPasswordRequest() {
    const router = useRouter()
    const [form, setForm] = useState({
        username: '',
        name: '',
        role_id: '',
    })
    const [loading, setLoading]  = useState(false)
    const [confirm, setConfirm] = useState('')
    const [api ,contextHolder] = notification.useNotification();

    const {user} = useUser()

    const handleSubmitRequest = async () => {
        
        for (let key in form) {
            if(form[key] === ''){
                return api['error']({
                    message: 'Thất bại !',
                    description: 'Vui lòng điền đầy đủ thông tin!',
                });
            }
        }
        setLoading(true) 
        const formData = {
            request: {
                admin_user_request: user?.id,
                request_status_id: 0,
                request_type_id: 8
            },
            requestData: {
                email: form.username,
                role_id: form.role_id,
                name: form.name
            }
        }
        console.log(formData)
        const res = await axiosInstance.post('/request/create-system', formData)
        if(res.data.code === 200) {
            api['success']({
                message: 'Thành công !',
                description: 'Gửi yêu cầu thành công!',
            });
        } else {
            api['error']({
                message: 'Thất bại!',
                description: "Có lỗi trong quá trình gửi yêu cầu!",
            });
        }

        setLoading(false)
    }
    return (
    <div className='main-content'>
        {contextHolder}
        <div>
            <GoBackButton />
        </div>
        <div className={`${styles['box']}`}>

        <div className={`${styles['account']}`}>
            <div className={`${styles['create-account']}`}>
                <Row style={{width: '100%'}} gutter={[0, 20]}>
                    <Row style={{width: '100%'}}>
                        <Col xl={12}>
                            <div className='flex al-ct'>
                                <p className={`${styles['form-label']}`}>ID:</p>
                                <Input value={form.id}/>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex al-ct'>
                                <p className={`${styles['form-label']}`}>Account:</p>
                                <Input value={form.username} onChange={e => setForm({...form, username: e.target.value})}/>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{width: '100%'}}>
                        <Col xl={12}>
                            <div className='flex al-ct'>
                                <p className={`${styles['form-label']}`}>Tên: </p>
                                <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex al-ct'>
                                <p className={`${styles['form-label']}`}>Vai trò: </p>
                                <InputSelect
                                 options={roleOptions} 
                                 optionDefaultLabel={'Chọn vai trò'}
                                 onChange={(e) => setForm({
                                    ...form, role_id: e.target.value
                                 })}
                                />
                            </div>
                        </Col>
                    </Row>
                </Row>
                <p className={`${styles['text-note']}`}>
                    Nhập ‘password' để xác nhận thay đổi:
                </p>
                <Input 
                    styleWr={{width: '136px', marginTop: '16px'}} 
                    placeholder="password" 
                    value={confirm} 
                    onChange={e => setConfirm(e.target.value)}
                />

                <div className='flex center'>
                    <Button title={loading ? <LoadingOutlined /> : "Hủy"} onClick={() => {}} style={{width: '130px', marginRight: '56px'}} />
                    <Button
                        title={loading ? <LoadingOutlined /> : "Gửi"} 
                        onClick={handleSubmitRequest} 
                        disabled={confirm === 'password' && !loading ? false : true} 
                        style={{width: '130px'}} 
                    />
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ResetPasswordRequest