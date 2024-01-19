import React from 'react';
import style from './style.module.css';

const InputSelectDayCCQ = ({value, onChange}) => {
    return (
        <div className={style.input_select_dayccq}>
            <input
                type="text"
                name=""
                id="inputSelectDayCCQ"
                value={value}
                onChange={onChange}
            />
            <label htmlFor='inputSelectDayCCQ'>
                ngày làm việc sau ngày đóng sổ lệnh
            </label>
        </div>
    )
}

export default InputSelectDayCCQ
