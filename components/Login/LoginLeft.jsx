import React from 'react'
import style from './style.module.css'
function LoginLeft() {
  return (
    <div className={`${style['login-left-section']}`}>
        <div className={`${style['login-left-content']}`}>
            <h2 className={`${style['name']}`}>FinHub</h2>
            <p className={`${style['slogan']}`}>Khách hàng - Sáng tạo - Cải tiến - Cam kết - Cộng tác</p>
        </div>
    </div>
  )
}

export default LoginLeft