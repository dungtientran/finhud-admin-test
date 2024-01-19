import React, { useState } from 'react'
import styles from '../style.module.css'
import { Col, Row, notification} from 'antd'
import GoBackButton from '@/components/Button/GoBackButton'
import InputPassword from '@/components/Input/InputPassword'
import { BsCheck2 } from 'react-icons/bs'
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import { ChangePasswordCommand } from '@aws-sdk/client-cognito-identity-provider'
import client from '@/utils/aws-config'

function ChangePassword() {
    const [confirm, setConfirm] = useState('')
    const [api, contextHolder] = notification.useNotification();
    const [form, setForm] = useState({
        password:'',
        newPassword: '',
        reNewPassword: '',
    })
    const [passwordRule, setPasswordRule] = useState({
        rule1: false,
        rule2: false,
        rule3: false,
    })

    const checkPasswordRule = (value) => {
        const newCheck = {
            ...passwordRule
        }
        if(value.length >= 8) {
            newCheck.rule1= true
        } else {
            newCheck.rule1 = false
        }

        if (value.match(/[A-Z]/)) {
            newCheck.rule2 = true

        } else {
            newCheck.rule2= false
        }

        if (value.match(/[~!@#$%^&*]/)) {
            newCheck.rule3 = true
        } else {
            newCheck.rule3 = false
        }
        setPasswordRule(newCheck)
    }

    const ChangePassword = async() => {
        try {
            if (
                !passwordRule.rule1 ||
                !passwordRule.rule2 ||
                !passwordRule.rule3
            ) {
                api['error']({
                    message: 'Thất bại',
                    description: 'Mật khẩu phải đúng điều kiện'
                });
            } else if (
                form.newPassword !== form.reNewPassword
            ){
                api['error']({
                    message: 'Thất bại',
                    description: 'Nhập lai mật khẩu không khớp'
                });
            } else {
                const input = { // ChangePasswordRequest
                    PreviousPassword: form.password, // required
                    ProposedPassword: form.newPassword, // required
                    AccessToken: localStorage.getItem('token'), // required
                };
                const command = new ChangePasswordCommand(input);
                const response = await client.send(command);
                if(response.$metadata.httpStatusCode === 200){
                   console.log('change password successfully')
                   api['success']({
                    message: 'Thành công !',
                    description:
                      'Thay đổi mật khẩu thành công !',
                  });
                }
            }
            
        } catch (error) {
            console.log(error);
            api['error']({
                message: 'Thất bại',
                description: error.message
            });
        }
    }

    return (
    <>
    {contextHolder}
    <div className='main-content'>
        <div className="flex space-between">
            <div className={`${styles['sort']}`}>
                <GoBackButton />
            </div>
           
        </div>
        <div className={`${styles['account']}`}>
            <div className={`${styles['account-info']}`}>
                <Row style={{width: '100%'}} gutter={[0, 20]}>
                    <Col xl={12}>
                        <Row style={{width: '100%'}} gutter={[0,20]}>
                            <Col xl={24}>
                                <div className='flex al-ct'>
                                    <p className={`${styles['form-label']}`}>Mật khẩu hiện tại:</p>
                                    <InputPassword value={form.password} onChange={e => setForm({...form, password: e.target.value})}/>
                                </div>
                            </Col>
                            <Col xl={24}>
                                <div className='flex al-ct'>
                                    <p className={`${styles['form-label']}`}>Mật khẩu mới:</p>
                                    <InputPassword value={form.newPassword} onChange={e => {
                                        setForm({...form, newPassword: e.target.value})
                                        checkPasswordRule(e.target.value)
                                    }}/>
                                </div>
                            </Col>
                            <Col xl={24}>
                                <div className='flex al-ct'>
                                    <p className={`${styles['form-label']}`}>Nhập lại mật khẩu:</p>
                                    <InputPassword value={form.reNewPassword} onChange={e => setForm({...form, reNewPassword: e.target.value})}/>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={12}>
                        <div className={`${styles['password-rules']}`}>
                            <div className={`${styles['password-rule']}`}>
                                <p className={`${styles['password-rule-text']} ${passwordRule.rule1? styles['rule-checked'] : ''}`}>
                                    <BsCheck2 className={`${styles['password-rule-icon']}`} /> Mật khẩu tối thiểu 8 kí tự.
                                </p>
                            </div>
                            <div className={`${styles['password-rule']}`}>
                                <p className={`${styles['password-rule-text']} ${passwordRule.rule2? styles['rule-checked'] : ''}`}>
                                    <BsCheck2 className={`${styles['password-rule-icon']}`}/> Mật khẩu bao gồm cả chữ cái hoa và chữ cái thường
                                </p>
                            </div>
                            <div className={`${styles['password-rule']}`}>
                                <p className={`${styles['password-rule-text']} ${passwordRule.rule3? styles['rule-checked'] : ''}`}>
                                    <BsCheck2 className={`${styles['password-rule-icon']}`}/> Mật khẩu bao gồm ít nhất một kí tự đặc biệt ~!@#$%^&*
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>

            </div>
            <p className={`${styles['text-note']}`} style={{marginTop: '84px'}} >
                Nhập ‘password' để xác nhận tạo tài khoản:
            </p>
            <Input 
                styleWr={{width: '136px', marginTop: '16px'}} 
                placeholder="password" 
                value={confirm} 
                onChange={e => setConfirm(e.target.value)}
            />

            <div className='flex center'>
                <Button title="Hủy" onClick={() => {}} style={{width: '130px', marginRight: '56px'}} />
                <Button
                    title="Xác nhận" 
                    onClick={ChangePassword} 
                    disabled={confirm === 'password' ? false : true} 
                    style={{width: '171px'}} 
                />
            </div>
        </div>
    </div>
    </>
  )
}

export default ChangePassword