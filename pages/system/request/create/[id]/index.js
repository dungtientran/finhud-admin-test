import React, { useEffect, useState } from 'react'
import styles from '../../../style.module.css'
import GoBackButton from '@/components/Button/GoBackButton'
import { Col, Row, Steps, notification } from 'antd'
import {SlCheck} from 'react-icons/sl'
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import { useRouter } from 'next/router'
import axiosInstance from '@/utils/axiosIntance'
import useUser from '@/hooks/useUser'
import moment from 'moment'
import { LoadingOutlined } from '@ant-design/icons'



function RequestDetail() {
    const [confirm, setConfirm] = useState('')
    const [step, setStep] = useState(0)
    const [stepItem, setStepItem] = useState([])
    const [isConfirm, setIsConfirm] = useState(false)


    const [data, setData] = useState({})
    const {user} = useUser()
    const [api ,contextHolder] = notification.useNotification();
    

    // set khi handle xong request approve hoac reject de khong cho nhan nhieu lan

    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const { id, type} = router.query


    const getRequestDetail = async (id) => {
        const res = await axiosInstance.get('/request/system-request/detail?requestId=' + id)
        console.log(res)
        if(res.data.code === 200) {
            setData(res?.data?.data?.request)
            if(res.data?.data?.request?.request_status_id == 0) {
                console.log('1')
                const stepItems = [
                    {
                      title: 'Tạo yêu cầu',
                      icon: <SlCheck style={{width: '40px', height: '40px', transform: 'translateY(-2px)', display: 'inline-block'}} />,
                      description: moment(res?.data?.data?.request?.created_at).format("DD/MM/YYYY, hh:mm:ss"),
                      subTitle: res?.data?.data?.request?.admin_user_request_adminUser?.name
                    },
                    {
                      title: 'Phê duyệt yêu cầu',
                      icon: <SlCheck style={{width: '40px', height: '40px', transform: 'translateY(-2px)', display: 'inline-block'}}/>,
                    },
                ]
                setStepItem(stepItems)

            } else if(res.data?.data?.request?.request_status_id == 1)   {
                console.log('2')

                const stepItems = [
                    {
                      title: 'Tạo yêu cầu',
                      icon: <SlCheck style={{width: '40px', height: '40px', transform: 'translateY(-2px)', display: 'inline-block'}} />,
                      description: moment(res?.data?.data?.request?.created_at).format("DD/MM/YYYY, hh:mm:ss"),
                      subTitle: res?.data?.data?.request?.admin_user_request_adminUser?.name
                    },
                    {
                      title: 'Phê duyệt yêu cầu',
                      icon: <SlCheck style={{width: '40px', height: '40px', transform: 'translateY(-2px)', display: 'inline-block'}}/>,
                      description: moment(res?.data?.data?.request?.updated_at).format("DD/MM/YYYY, hh:mm:ss"),
                      subTitle: res?.data?.data?.request?.admin_user_approve_adminUser?.name
                    },
                ]
                setStepItem(stepItems)
                setStep(1)
            }
        }
    }

    const handleRequest = async () => {
        setLoading(true)
        const formData = {
            request: {
                ...data,
                admin_user_approve: user?.id
            }
        }   
        if (confirm === 'approve') {
            formData.approve = true
        } else {
            formData.approve = false
        }
        console.log(formData)
        const res = await axiosInstance.post('/request/excute-system-request', formData)
        if(res.data.code == 200){
            setIsConfirm(true)
            setStep(1)
            api['success']({
                message: 'Thành công !',
                description: 'Xử li thành công!',
            });
        } else {
            api['error']({
                message: 'Thất bại!',
                description: "Có lỗi trong quá trình xử lí!",
            });
        }
        setLoading(false)
    }
    useEffect(()=>{
        getRequestDetail(id)
    },[id])
    return (
    <div className='main-content'>
        {contextHolder}
        <div>
            <GoBackButton />
        </div>
        <div className={`${styles['box']}`}>
            <div className={`${styles['request-info']}`}>
                <Row style={{width: '100%'}} gutter={[0, 20]}>
                    <Row style={{width: '100%'}}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Tài khoản:</p>
                                <p className={`${styles['value']}`}>{data?.admin_request_data?.email}</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Tên:</p>
                                <p className={`${styles['value']}`}>{data?.admin_request_data?.name}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{width: '100%'}}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Vai trò:</p>
                                <p className={`${styles['value']}`}>
                                    {data?.admin_request_data?.role.name}
                                </p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Điện thoại:</p>
                                <p className={`${styles['value']}`}>
                                    {data?.admin_request_data?.phone}
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{width: '100%'}}>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Mật khẩu:</p>
                                <p className={`${styles['value']}`}>********</p>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className='flex'>
                                <p className={`${styles['label']}`}>Trạng thái:</p>
                                <p className={`${styles['value']}`}>
                                    {data?.admin_request_data?.admin_user_status?.name}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </div>
            {stepItem && (
                <div className={`${styles['request-step']}`}>
                    <Steps current={step} labelPlacement="vertical" items={stepItem} style={{width: '50%'}} />
                </div>  
            )}
            {!isConfirm && data?.request_status_id == 0 && (
                <>
                    <div style={{borderTop: '1px solid #E0E0E0'}}>
                    <p className={`${styles['text-note']}`}>
                        Nhập ‘approve’ để phê duyệt, ‘reject' để từ chối:
                    </p>
                    <Input 
                        styleWr={{width: '136px', marginTop: '16px'}} 
                        placeholder="approve" 
                        value={confirm} 
                        onChange={e => setConfirm(e.target.value)}
                    />
                    </div>
                    <div className='flex center'>
                        <Button
                            title={confirm === 'reject' && loading ? <LoadingOutlined />:"Từ chối"}
                            onClick={handleRequest} 
                            style={{width: '130px',
                            marginRight: '56px'}} 
                            disabled={confirm === 'reject' && !loading ? false : true} 
                        />
                        <Button
                            title={confirm === 'approve' && loading ? <LoadingOutlined />:"Phê duyệt" }
                            onClick={handleRequest} 
                            disabled={confirm === 'approve' && !loading? false : true} 
                            style={{width: '130px'}} 
                        />
                    </div>
                </>
            )}
        </div>
    </div>
  )
}

export default RequestDetail