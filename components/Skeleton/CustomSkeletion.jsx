import { Skeleton } from 'antd'
import React from 'react'

function CustomSkeletion(props) {
  return (
    <div className='skeleton-wr' {...props}>
        <Skeleton.Input className='skeleton-item' active size="large" />
        <Skeleton.Input className='skeleton-item' active size="large" />
        <Skeleton.Input className='skeleton-item' active size="large" />
        <Skeleton.Input className='skeleton-item' active size="large" />
        <Skeleton.Input className='skeleton-item' active size="large" />
      </div>
  )
}

export default CustomSkeletion