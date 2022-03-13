import React from 'react';
import './customInput.styles.scss';

const CustomInput = ({ type, name, placeholder, onChange }) => {
    return (
        <div className="customInputContainer">
            <input className='customInput' type={type} name={name} placeholder={placeholder} onChange={onChange} />
        </div>
    );
}

export default CustomInput;