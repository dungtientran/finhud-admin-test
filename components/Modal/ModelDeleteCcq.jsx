import React, { useState } from 'react';
import { Modal } from 'antd';
import styles from './style.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useRouter } from 'next/router';
import { LoadingOutlined } from '@ant-design/icons';

import { deleteProductCCQ } from '@/apiClient/product';

const ModelDeleteCcq = ({ open, setOpen, id, name }) => {
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleRequest = async (confirm) => {
    if (confirm === 'update') {
      setLoading(true);
      const res = await deleteProductCCQ(id);
      if (res?.code === 200) {
        router.push('/product/ccq');
      }
    }
    setLoading(false);
  }

  return (
    <>
      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        className={styles.modal_del_ccq}
      >
        <div className={styles.box_bin}>
          <img src="/icons/bin.svg" alt="bin" />
        </div>

        <div className={styles.box_bin}>
          <p>
            Bạn có chắc chắn muốn xoá sản phẩm chứng chỉ quỹ {name}?
          </p>
        </div>

        <div className={`${styles['confirm-box']}`}>
          <div>
            <p className={`${styles['text-note']}`}>
              Nhập ‘update’ để xác nhận thay đổi
            </p>
            <Input
              styleWr={{ width: '136px', marginTop: '16px' }}
              placeholder="update"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
          </div>
          <div className='flex center'>
            <Button
              title={"Hủy"}
              onClick={() => handleRequest(confirm)}
              style={{
                width: '130px',
                marginRight: '56px',
              }}
            // disabled={confirm === 'reject' && validateComment ? false : true}
            />
            <Button
              title={loading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : "Lưu"}
              onClick={() => handleRequest(confirm)}
              disabled={confirm === 'update' ? false : true}
              style={{ width: '130px' }}

            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModelDeleteCcq;