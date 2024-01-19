import React from 'react';
import styles from './style.module.css';

const ChartProduct = ({ dataProductCcq, isEdit ,edit, fundForm, setIsEdit}) => {
  return (
    <div
      style={{ minHeight: '500px' }}
    >
      <div className={`${styles.chart_CCQ}`}
      >
        <div>
          <p>
            Giá gần nhất:
          </p>
          <p>
            AUM:
          </p>
          <p className={styles.chart_text}>
            Biểu đồ tăng trưởng NAV:
          </p>

        </div>
        <div className={styles.value}>
          <p >
            12,000 VND
          </p>
          <p>
            1,000,000,000,000 VND
          </p>
          <p className={`text-red ${styles.chart_percent}`}>
            -25.27%
          </p>
        </div>
      </div>
      <div className={styles.chart_CCQ_container}>
      
      </div>
    </div>
  )
}

export default ChartProduct
