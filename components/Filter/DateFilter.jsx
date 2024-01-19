import React, { forwardRef, useEffect, useRef, useState } from 'react'
import styles from "./style.module.css";
import { FiChevronDown } from 'react-icons/fi';
import { useRouter } from 'next/router';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';

const DateFilter = ({ title }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const router = useRouter();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const createdDateRef = useRef();
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button style={{
            backgroundColor: 'white',
            width: '170px',
            border: "1px solid #DADADA",
            height:'32px',
            marginTop:'5px',
            borderRadius: '4px',
            display: 'flex',
            alignItems:'center',
            justifyContent: 'space-between',
            padding: '0 8px',
            color:'#b9b9b9'
        }}
            onClick={onClick} ref={ref}>
            {startDate ? moment(startDate).format("DD/MM/YYYY") : 'Select Date'}
            {/* {value} */}
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </button>
    ));
    const ExampleCustomInput2 = forwardRef(({ value, onClick }, ref) => (
        <button style={{
            backgroundColor: 'white',
            width: '170px',
            border: "1px solid #DADADA",
            height:'32px',
            marginTop:'5px',
            borderRadius: '4px',
            display: 'flex',
            alignItems:'center',
            justifyContent: 'space-between',
            padding: '0 8px',
            color:'#b9b9b9'
        }}
            onClick={onClick} ref={ref}>
            {endDate ? moment(endDate).format("DD/MM/YYYY") : 'Select Date'}
            {/* {value} */}
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </button>
    ));
    const handleSelectStartDate = (date) => {
        setStartDate(date);
    }
    const handleSelectEndDate = (date) => {
        setEndDate(date);
    }
    useEffect(() => {
        let handleClickOutSide = (e) => {
            if (!createdDateRef?.current?.contains(e.target)) {
                setShowDatePicker(false)
            };
        };
        document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        }
    }, []);

    // console.log('startDate', startDate);
    useEffect(() => {
        if (startDate && endDate) {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, start_date: `${moment(startDate).format("MM/DD/YYYY")}`, end_date: `${moment(endDate).format("MM/DD/YYYY")}` },
          })
        }
      }, [startDate,endDate]);
    
    useEffect(() => {
        if(!router.query.start_date && !router.query.end_date) {
            setEndDate(null);
            setStartDate(null);
        }
    }, [router.query]);

    return (
        <div ref={createdDateRef}
        >
            <div
                className={`${styles["select"]}`}
                onClick={() => {
                    setShowDatePicker(true);
                }}

            >
                <p
                className={startDate && endDate ? "text-blue" : "text"}
                >
                    {title}
                </p>
                <FiChevronDown className={`${styles["chevron-down"]}`} />
                {showDatePicker && (
                    <ul className={`${styles["select-list-date"]}`}>
                        <li style={{ paddingTop: '3px' }}
                            className={`${styles["select-date"]}`}
                        >
                            Ngày bắt đầu
                         
                            <div>
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleSelectStartDate}
                                    maxDate={endDate}
                                    customInput={<ExampleCustomInput />}
                                />
                            </div>

                        </li>
                        <li className={`${styles["select-date"]}`}>
                            Ngày kết thúc
                            <div>
                                <DatePicker
                                    selected={endDate}
                                    onChange={handleSelectEndDate}
                                    minDate={startDate}
                                    customInput={<ExampleCustomInput2 />}
                                />
                            </div>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default DateFilter
