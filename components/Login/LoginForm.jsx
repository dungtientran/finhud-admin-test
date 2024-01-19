import React, { useState } from 'react'
import style from './style.module.css'
import Input from '../Input/Input'
import InputPassword from '../Input/InputPassword'
import Button from '../Button/Button'
import { LoadingOutlined } from '@ant-design/icons'
function LoginForm({ handleLogin, loading }) {
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  return (
    <div className={`${style['login-form']}`}>

      <p className={`${style['title']}`}>Đăng nhập</p>

      <div className={`${style['form']}`}>
        <Input
          label="Email"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          placeholder='Nhập email'
          styleWr={style.input}
        />
        <InputPassword
          styleWr={{ marginTop: '30px' }}
          label="Mật khẩu"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          placeholder='Nhập mật khẩu'
        />
        <Button
          title={loading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : "Đăng nhập"}
          onClick={() => {
            handleLogin(form.username, form.password)
          }}
          style={{ marginTop: '86px' }}
          disabled={!form.username || !form.password || loading ? true : false}
        />
      </div>
    </div>
  )
}

export default LoginForm