import React from "react";
import './customTextBox.styles.scss';

const CustomTextBox = ({name, id, value, onChange, placeholder, specificClass}) => {
    return(
        <div className={`customTextBoxContainer ${specificClass}`}>
            <textarea onChange={onChange} name={name} id={id} value={value} placeholder={placeholder}></textarea>
        </div>
    );
}

export default CustomTextBox;