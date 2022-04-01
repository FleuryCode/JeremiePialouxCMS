import React from "react";
import './customTextBox.styles.scss';

const CustomTextBox = ({name, id, value, onChange, placeholder}) => {
    return(
        <div className="customTextBoxContainer">
            <textarea onChange={onChange} name={name} id={id} value={value} placeholder={placeholder}></textarea>
        </div>
    );
}

export default CustomTextBox;