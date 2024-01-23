import React, { useEffect, useReducer, useState } from 'react';
import InputComponent from '../Input/InputComponent';
import styles from './style.module.css';
import { useRouter } from 'next/router';
import DropdownCheckbox from '../Dropdown/DropdownCheckbox';
import InputSelectDayCCQ from '../Input/InputSelectDayCCQ';

const days = [
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
]

const TradingSchedule = ({ isEdit, dataProductCcq, edit, fundForm }) => {
    const { query } = useRouter();
    // const day_trading = tradingSchedule?.day_trading?.split(',');
    const [dayTrading, setDayTrading] = useState([]);
    useEffect(() => {
        if (dataProductCcq || isEdit) {
            let daysTrading = []
            days.filter((day, index) => {
                dataProductCcq?.day_available_key?.map((dayAvailable) => {
                    if (index + 1 === dayAvailable) {
                        return daysTrading.push(day)
                    }
                })
                return day
            })
            
             setDayTrading(daysTrading);
        }
    }, [dataProductCcq])

    const handleSelectDay = (days_select) => {
        // console.log('days_select', days_select);
        let daySelect_key = [];
        days.filter((day, index) => {
            days_select?.map((dayAvailable) => {
                if (day === dayAvailable) {
                    return daySelect_key.push(index+1)
                }
            })
            return day
        })
        edit({ ...fundForm, day_available_key: daySelect_key})
    }

    return (
        <div
            style={{ minHeight: '500px' }}
            className={`${styles.trading_schedule}`}
        >
            <div>
                <p className={styles.trading_schedule_l}>Ngày giao dịch:</p>
                {isEdit || query.id === 'create' ? (
                    <div >
                        <DropdownCheckbox
                            listcheck={dayTrading}
                            handleSelectDay={handleSelectDay}
                        />
                    </div>
                ) : (
                    <div className={styles?.day_trading}>
                        {dayTrading?.map((item, index) => (
                            <p className={styles.text_trading_schedule} key={index}>
                                {item}
                            </p>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <p className={styles.trading_schedule_l}>Thời gian đóng sổ lệnh: </p>
                {isEdit || query.id === 'create' ? (
                    <div >
                        <InputComponent
                            value={fundForm?.order_closing_time}
                            placeholder={'00:00'}
                            onChange={e => edit({ ...fundForm, order_closing_time: e.target.value })}
                        />
                    </div>
                ) : (
                    <p className={styles.text_trading_schedule}>
                        {dataProductCcq?.order_closing_time}
                    </p>
                )}
            </div>
            <div>
                <p className={styles.trading_schedule_l}>Thời gian thanh toán:</p>
                {isEdit || query.id === 'create' ? (
                    <div >
                        <InputComponent
                            value={fundForm?.time_available}
                            placeholder={'00:00'}
                            onChange={e => edit({ ...fundForm, time_available: e.target.value })}
                        />
                    </div>
                ) : (
                    <p className={styles.text_trading_schedule}>
                        {dataProductCcq?.time_available}
                    </p>
                )}
            </div>
            <div>
                <p className={styles.trading_schedule_l}>Ngày khớp lệnh:</p>
                {isEdit || query.id === 'create' ? (
                    <div >
                        <InputSelectDayCCQ
                            value={fundForm?.order_matching_date}
                            onChange={e => edit({ ...fundForm, order_matching_date: e.target.value })}
                        />
                    </div>
                ) : (
                    <p className={styles.text_trading_schedule}>
                        {dataProductCcq?.order_matching_date || 1} ngày làm việc sau ngày đóng sổ lệnh
                    </p>
                )}
            </div>
            <div>
                <p className={styles.trading_schedule_l}>Ngày nhận CCQ:</p>
                {isEdit || query.id === 'create' ? (
                    <InputSelectDayCCQ
                        value={fundForm?.date_receiving_ccq}
                        onChange={e => edit({ ...fundForm, date_receiving_ccq: e.target.value })}
                    />
                ) : (
                    <p className={styles.text_trading_schedule}>
                        {dataProductCcq?.date_receiving_ccq || 1} ngày làm việc sau ngày đóng sổ lệnh
                    </p>
                )}
            </div>
            <div>
                <p className={styles.trading_schedule_l}>Ngày nhận tiền bán:</p>
                {isEdit || query.id === 'create' ? (
                    <div>
                        <InputSelectDayCCQ
                            value={fundForm?.payment_received_date}
                            onChange={e => edit({ ...fundForm, payment_received_date: e.target.value })}
                        />
                    </div>
                ) : (
                    <p className={styles.text_trading_schedule}>
                        {dataProductCcq?.payment_received_date || 1} ngày làm việc sau ngày đóng sổ lệnh
                    </p>
                )}
            </div>
        </div>
    )
}

export default TradingSchedule
