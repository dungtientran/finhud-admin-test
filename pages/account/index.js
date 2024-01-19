import Button from '@/components/Button/Button'
import GoBackButton from '@/components/Button/GoBackButton'
import { Col, Row } from 'antd'
import React, { useState } from 'react'
import styles from './style.module.css'
import ButtonGray from '@/components/Button/ButtonGray'
import { useRouter } from 'next/router'
import useUser from '@/hooks/useUser'

function Account() {
    const [data, setData] = useState({
        username: 'huynh.nguyen@finhub.com.vn',
        name: 'Phạm Văn Phương Huỳnh',
        role: 'NV giao dịch',
        id: '2222',
        phone: '0886640994',
        status: 'active',
        createdAt: '20-03-2023, 15:15:16'
    })
    const {user} = useUser()
    const router = useRouter()
    return (
    <div className='main-content'>
        <div className="flex space-between">
            <div className={`${styles['sort']}`}>
                <GoBackButton />
            </div>
            <div>
                <ButtonGray title="Thay đổi mật khẩu" handleClick={()=> {
                    router.push('/account/change-password');
                }}/>
                <ButtonGray title="Chọn ảnh đại diện" handleClick={()=> {
                }} style={{marginLeft: '39px'}}/>
            </div>
        </div>
        <div className={`${styles['account']}`}>
            <div className={`${styles['account-info']}`}>
                <Row style={{width: '100%'}} gutter={[0, 20]}>
                    <Row style={{width: '100%'}}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>ID:</p>
                                <p className={`${styles['value']}`}>{user?.id}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Tài khoản:</p>
                                <p className={`${styles['value']}`}>{user?.email}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{width: '100%'}}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Tên:</p>
                                <p className={`${styles['value']}`}>{user?.name}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Điện thoại:</p>
                                <p className={`${styles['value']}`}>{user?.phone}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{width: '100%'}}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Vai trò:</p>
                                <p className={`${styles['value']}`}>{user?.role?.name}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Thời gian tạo:</p>
                                <p className={`${styles['value']}`}>{user?.created_at}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{width: '100%'}}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Trạng thái:</p>
                                <p className={`${styles['value']}`}>{user?.admin_user_status?.name}</p>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </div>
        </div>
    </div>
  )
}

export default Account