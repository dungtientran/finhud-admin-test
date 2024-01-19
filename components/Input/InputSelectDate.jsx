import React, { useEffect, useRef, useState } from 'react'
import style from './style.module.css'
import { generateDate, months } from '@/utils/calendar';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import cn from '@/utils/cn';
import dayjs from 'dayjs';

const InputSelectDate = ({getDate}) => {
    const [showBoxSelectDate, setShowBoxSelectDate] = useState(false);
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState('');
    const boxRef = useRef();

    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    useEffect(() => {
        let handleClickOutSide = (e) => {
            if (!boxRef?.current?.contains(e.target)) {
                setShowBoxSelectDate(false)
            };
        };
        document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        }
    }, []);

    const selectDays = `${selectDate}/${today.month()}/${today.year()}`
    const selectDaysfFilter = `${today.month()}/${selectDate}//${today.year()}`
    // console.log('hahaha', selectDays);
    // console.log('show', showBoxSelectDate);

    useEffect(() => {
        if(selectDate) {
            getDate(selectDaysfFilter)
        }
    }, [selectDate]);

    return (
        <div>
            <div
                className={`${style["selecdate_box_input"]}`}
                onClick={() => setShowBoxSelectDate(true)}
                ref={boxRef}
            >
                <p style={{ fontSize: '14px' }}>{selectDate ? selectDays : 'Select date'}</p>
                <span>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 7V4H22V7H10V4H9V7H4V28H28V7H23ZM27.0001 26.92H5V14H27L27.0001 26.92ZM5 13V8H9.06008V9.64002H10V8H22V9.64002H23V8H27V13H5Z" fill="#B9B9B9" />
                        <path d="M15.3394 15.92H13.3594V17.92H15.3394V15.92Z" fill="#B9B9B9" />
                        <path d="M11.9605 19.7H9.98047V21.7H11.9605V19.7Z" fill="#B9B9B9" />
                        <path d="M15.3394 19.7H13.3594V21.7H15.3394V19.7Z" fill="#B9B9B9" />
                        <path d="M8.56984 19.7H6.58984V21.7H8.56984V19.7Z" fill="#B9B9B9" />
                        <path d="M11.9605 23.49H9.98047V25.49H11.9605V23.49Z" fill="#B9B9B9" />
                        <path d="M15.3394 23.49H13.3594V25.49H15.3394V23.49Z" fill="#B9B9B9" />
                        <path d="M8.56984 23.49H6.58984V25.49H8.56984V23.49Z" fill="#B9B9B9" />
                        <path d="M22.1402 15.92H20.1602V17.92H22.1402V15.92Z" fill="#B9B9B9" />
                        <path d="M25.5191 15.92H23.5391V17.92H25.5191V15.92Z" fill="#B9B9B9" />
                        <path d="M18.7395 15.92H16.7695V17.92H18.7395V15.92Z" fill="#B9B9B9" />
                        <path d="M22.1402 19.7H20.1602V21.7H22.1402V19.7Z" fill="#B9B9B9" />
                        <path d="M25.5191 19.7H23.5391V21.7H25.5191V19.7Z" fill="#B9B9B9" />
                        <path d="M18.7395 19.7H16.7695V21.7H18.7395V19.7Z" fill="#B9B9B9" />
                        <path d="M18.7395 23.49H16.7695V25.49H18.7395V23.49Z" fill="#B9B9B9" />
                    </svg>
                </span>
                {showBoxSelectDate && (
                    <div className={`${style["selecdate_box"]}`}>
                        <div className={`${style["selectdate_box_head"]}`}>
                            <b
                                style={{ fontSize: '20px' }}
                                onClick={() => {
                                    setToday(today.month(today.month() - 1));
                                }}
                            >
                                <MdKeyboardArrowLeft />
                            </b>
                            <b>{months[today.month()]}, {today.year()}</b>
                            <b
                                style={{ fontSize: '20px' }}
                                onClick={() => {
                                    setToday(today.month(today.month() + 1));
                                }}
                            >
                                <MdKeyboardArrowRight />
                            </b>
                        </div>
                        <div className={`${style["selectdate_box_days"]}`}>
                            {days?.map((item, index) => (
                                <b key={index}>
                                    {item}
                                </b>
                            ))}
                        </div>
                        <div className={`${style["selectdate_box_calendar"]}`}>
                            {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => (
                                <div
                                    key={index}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    className={
                                        cn(currentMonth ? "" : `${style["selectdate_text_gray"]}`,
                                            today ? `${style["selectdate_today"]}` : `${style["selectdate_day"]}`
                                        )}
                                    onClick={() => {
                                        setSelectDate(`${date.date()}`)
                                    }}
                                >
                                    <p>
                                        {date.date()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default InputSelectDate
