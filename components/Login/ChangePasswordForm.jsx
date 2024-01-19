import React, { useState } from 'react'
import style from './style.module.css'
import InputPassword from '../Input/InputPassword'
import Button from '../Button/Button'
import {BsCheck2} from 'react-icons/bs'
function ChangePasswordForm({handleChangePassword}) {
    const [form, setForm] = useState({
        password: '',
        newPassword: '',
        rePassword: '',
    })
    const [changePasswordSuccess, setChangePasswordSuccess] = useState(false)

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

    const handleClick = () => {
        if(
            !passwordRule.rule1 ||
            !passwordRule.rule2 ||
            !passwordRule.rule3
        ) {
            return
        } else if (form.newPassword != form.rePassword){
            return
        } else {
            handleChangePassword(form.newPassword)
        }
    }
    return (
    <>
    <div className={`${style['login-form']}`}>
        {changePasswordSuccess ? (
            <div className={`${style['change-password-sucess']}`}>
                <p className={`${style['title']}`}>Thay đổi mật khẩu thành công!</p>
                <p className={`${style['text']}`} style={{marginTop: '70px'}}>
                    Xin hãy sử dụng mật khẩu mới cho lần đăng nhập tiếp theo.
                </p>
                <Button
                    title="Đăng nhập"
                    onClick={() => {

                    }}
                    style={{marginTop: '108px'}}
                />
            </div>
        ): (
            <>
                <p className={`${style['title']}`}>Thay đổi mật khẩu</p>
                <div className={`${style['form']}`}>
                    
                    <InputPassword
                    label="Mật khẩu cũ" 
                    value={form.password} 
                    onChange={e => setForm({...form, password: e.target.value})}
                    />
                    <InputPassword
                    styleWr={{marginTop: '10px'}}
                    label="Mật khẩu mới" 
                    value={form.newPassword} 
                    onChange={e => {
                        setForm({...form, newPassword: e.target.value})
                        checkPasswordRule(e.target.value)
                    }}
                    />
                    <InputPassword
                    styleWr={{marginTop: '10px'}}
                    label="Nhập lại mật khẩu mới" 
                    value={form.rePassword} 
                    onChange={e => setForm({...form, rePassword: e.target.value})}
                    />
                    <div className={`${style['password-rules']}`}>
                        <div className={`${style['password-rule']}`}>
                            <p className={`${style['password-rule-text']} ${passwordRule.rule1? style['rule-checked'] : ''}`}>
                                <BsCheck2 className={`${style['password-rule-icon']}`} /> Mật khẩu tối thiểu 8 kí tự.
                            </p>
                        </div>
                        <div className={`${style['password-rule']}`}>
                            <p className={`${style['password-rule-text']} ${passwordRule.rule2? style['rule-checked'] : ''}`}>
                                <BsCheck2 className={`${style['password-rule-icon']}`}/> Mật khẩu bao gồm cả chữ cái hoa và chữ cái thường
                            </p>
                        </div>
                        <div className={`${style['password-rule']}`}>
                            <p className={`${style['password-rule-text']} ${passwordRule.rule3? style['rule-checked'] : ''}`}>
                                <BsCheck2 className={`${style['password-rule-icon']}`}/> Mật khẩu bao gồm ít nhất một kí tự đặc biệt ~!@#$%^&*
                            </p>
                        </div>
                    </div>
                    <Button
                        title="Đăng nhập"
                        onClick={() => handleClick()}
                        style={{marginTop: '25px'}}
                        disabled={!form.rePassword || !form.newPassword || !form.password ? true: false}
                    />
                </div>
            </>
        )}
        
    </div>
    </>
  )
}

export default ChangePasswordForm