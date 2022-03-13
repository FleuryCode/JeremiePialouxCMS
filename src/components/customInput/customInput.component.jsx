import React from 'react';
import './customInput.styles.scss';

const CustomInput = ({id, type, name, placeholder, value, onChange }) => {
    return (
        <div className="customInputContainer">
            <input className='customInput' id={id} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    );
}

export default CustomInput;