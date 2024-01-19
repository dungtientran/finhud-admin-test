import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import Button from '../Button/Button'
import OTPInput from 'react-otp-input'
function OTPForm({handleLogin}) {
    const [otp, setOtp] = useState('');

    const [timer, setTimer] = useState(30);
    const [error, setError] = useState(false)

    useEffect(()=>{
        const timeout = setTimeout(()=> {
            if(timer >= 1){
                setTimer(x => x - 1)
            }
        },1000)
        return () => clearTimeout(timeout)
    },[timer])

    return (
    <div className={`${style['login-form']}`}>

        <p className={`${style['title']}`}>Nhập mã OTP</p>
        <p className={`${style['text']}`} style={{marginTop: '25px'}}>Nhập mã OTP được gửi đến số 0886640994</p>

        <div className={`${style['form']}`}>
            <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span style={{display: 'inline-block', width: '14px'}}> </span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={`${style['otp-input']}`}
            />
        </div>
        {!error ? (
            <>
            <p className={`${style['text']}`} style={{marginTop: '50px', marginBottom: '0px'}}>
                Mã sẽ có hiệu lực trong <span style={{color: 'var(--orange)'}}>{timer}s</span>
            </p>
            <p className={`${style['resend-otp']}`} onClick={() => setTimer(30)}>Gửi lại mã</p>
        </>
         ) : (
            <p className={`${style['error']}`}>Mã OTP không chính xác, vui lòng nhập lại!</p>
        )}

        <Button
            title="Đăng nhập"
            style={{marginTop: '62px'}}
            disabled={otp.length < 6 ? true: false}
        />
    </div>
  )
}

export default OTPForm