import React, { useEffect } from 'react'
import styles from './style.module.css'
import Sidebar from '../SideBar/Sidebar'
import { Col, Row, notification } from 'antd'
import Navbar from '../NavBar/Navbar'
import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router'
import {firebaseCloudMessaging } from '@/firebase/firebase';
import axiosInstance from '@/utils/axiosIntance'
import { LoadingOutlined } from '@ant-design/icons'
function Layout({children}) {

  const { user,loggedOut, loading } = useUser();
  const router = useRouter()

  // firebase notifications
  async function setToken() {
    try {
      const token = await firebaseCloudMessaging.init()
      if (token) {
        await listen()
        if (token !== user?.fcm_token){
          await axiosInstance.post('/admin/update-fcm-token',{
            fcm_token: token
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function listen() {
    console.log('message functions')
    await firebaseCloudMessaging.onMessage()
  }
  // if logged in, redirect to the dashboard
  useEffect(() => {
    if (loading) return
    if(user && !loading) {
      setToken()
    } else {
      router.push('/login')
    }
  }, [user, loggedOut, loading]);

  return (
    <>
     
      {loading &&(
        <div className='loading wr'> 
          <p><LoadingOutlined  style={{fontSize: '50px', color: 'var(--orange)'}}/></p>
        </div>
      )}
      
      {user && (
        <div className={`${styles['main']}`}>
        <Row className={`${styles['row']}`} wrap={false}>
          <Col flex="276px">
            <Sidebar/>
          </Col>
          <Col flex="auto">
            <div className={`${styles['content']}`}>
              <Navbar />
              {children}
            </div>
          </Col>
        </Row>
      </div>
      )}
    </>

  )
}

export default Layout