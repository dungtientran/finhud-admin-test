import ChangePasswordForm from '@/components/Login/ChangePasswordForm'
import LoginForm from '@/components/Login/LoginForm'
import LoginLeft from '@/components/Login/LoginLeft'
import OTPForm from '@/components/Login/OTPForm'
import useUser from '@/hooks/useUser'
import client from '@/utils/aws-config'
import axiosInstance from '@/utils/axiosIntance'
import { AdminSetUserPasswordCommand, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider'
import { Col, Row, notification } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


function Login() {
    const { user, mutate, loggedOut } = useUser();
    const router = useRouter()
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(true)
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')

    const [api, contextHolder] = notification.useNotification();


    const handleLogin = async (username, password) => {
        setUsername(username)
        setLoading(true)
        try {
            console.log(username, password)
            const input = {
                AuthFlow: "USER_PASSWORD_AUTH",
                AuthParameters: {
                    USERNAME: username,
                    PASSWORD: password
                },
                ClientId: process.env.CLIENT_ID,
            };
            const command = new InitiateAuthCommand(input);
            const response = await client.send(command);
            console.log('login', response)
            if (response?.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
                setShowLoginForm(false);
                setShowChangePassword(true)
            } else if (response?.AuthenticationResult) {
                api['success']({
                    message: 'Thành công!',
                    description: 'Đăng nhập thành công',
                });
                localStorage.setItem('token', response.AuthenticationResult.AccessToken);
                mutate()
            }
            setLoading(false)
            console.log(response)
        } catch (error) {
            console.log('error', error.message)
            api['error']({
                message: 'Thất bại !',
                description: error.message,
            });
            setLoading(false)
        }
    }

    const handleChangePassword = async (password) => {
        try {
            console.log('change password')
            // const input = { 
            //     UserPoolId: process.env.USERPOOL_ID, 
            //     Username: username, 
            //     Password: password, 
            //     Permanent: true,
            // };
            // const command = new AdminSetUserPasswordCommand(input);
            // const response = await client.send(command);
            const response = await axiosInstance.post('/admin/admin-change-password', {
                email: username,
                password: password
            })
            if (response.data.code === 200) {
                setShowLoginForm(true);
                setShowChangePassword(false)
            }
            api['success']({
                message: 'Thành công!',
                description: 'Thay đổi mật khẩu thành công!',
            });
            console.log(response.data)
        } catch (error) {
            console.log(error.message)
            api['error']({
                message: 'Thất bại !',
                description: error.message,
            });
        }
    }

    useEffect(() => {
        if (user?.id) {
            console.log('user', user)
            router.push('/system/account')
        }
    }, [user])
    return (
        <>
            {contextHolder}
            <Row style={{ height: '100vh' }}>

                <Col flex="59.72%">
                    <LoginLeft />
                </Col>
                <Col flex="auto">
                    {showLoginForm && <LoginForm handleLogin={handleLogin} loading={loading} />}
                    {showChangePassword && <ChangePasswordForm handleChangePassword={handleChangePassword} />}
                    {/* <OTPForm /> */}
                </Col>
            </Row>
        </>
    )
}

export default Login

Login.getLayout = (page) => {
    return (
        <>
            {page}
        </>
    )
}