import React from 'react'
import styles from './style.module.css'
import { IoChevronBackSharp } from 'react-icons/io5'
import { useRouter } from 'next/router'

function GoBackButton({onClick}) {
  const router = useRouter()
  return (
    <button onClick={()=>{
      router.back()
    }} className={`${styles['goback-btn']}`}>
        <IoChevronBackSharp className={`${styles['back-icon']}`}/><span className={`${styles['goback-btn-text']}`}>  Quay Lại</span>
    </button>
  )
}

export default GoBackButton