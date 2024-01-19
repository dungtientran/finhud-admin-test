import React, { useState } from 'react'
import styles from '../../style.module.css'
import GoBackButton from '@/components/Button/GoBackButton'
import InputSelect from '@/components/Input/InputSelect'
import { useRouter } from 'next/router'
import Button from '@/components/Button/Button'

function CreateRequest() {
    const router = useRouter()
    const [target, setTarget] = useState('')
    const options = [
        {
            label: 'Tạo tài khoản',
            value: '/system/request/create'
        },
        {
            label: 'Cập nhật tài khoản',
            value: '/system/request/update'
        },
        {
            label: 'Đặt lại mật khẩu',
            value: '/system/request/reset-password'
        },
    ]
    const optionSelect = e => {
        setTarget(e.target.value)
        // router.push(e.target.value)
    }
    const handleSubmit = () => {
        if(target) {
            router.push(target)
        }
    }
    return (
    <div className='main-content'>
        <div>
            <GoBackButton />
        </div>
        <div className={`${styles['box']}`}>
            <div className='flex al-ct space-between'>
                <div className='flex al-ct'>
                    <p className={`${styles['form-label']}`}>Loại yêu cầu </p>
                    <InputSelect options={options} onChange={optionSelect} />
                </div>
                <Button  title={'Tạo yêu cầu'} onClick={handleSubmit}/>
            </div>
        </div>
    </div>
  )
}

export default CreateRequest