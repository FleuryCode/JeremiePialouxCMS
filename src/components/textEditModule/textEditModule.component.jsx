import React from "react";
import CustomButton from "../customButton/customButton.component";
import CustomTextBox from "../customTextBox/customTextBox.component";
import './textEditModule.styles.scss';

const TextEditModule = ({ id, name, value, placeholder, displayName, onChangeHandle }) => {
    return (
        <div className="textEditModuleContainer container-fluid">
            <div className="row">
                <div className="col-12">
                    <label htmlFor="aboutInfo"><h5>{displayName}</h5></label>
                </div>
                <div className="col-12">
                    <CustomTextBox id={id} name={name} value={value} placeholder={placeholder} onChange={onChangeHandle} />
                </div>
                <div className="col-5">
                    <CustomButton text={`Update ${displayName}`} />
                </div>
            </div>



        </div>
    );
}

export default TextEditModule;