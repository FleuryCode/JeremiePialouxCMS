import React from "react";
import CustomButton from "../customButton/customButton.component";
import CustomTextBox from "../customTextBox/customTextBox.component";
import './textEditModule.styles.scss';

const TextEditModule = ({ id, name, value, placeholder, dbName, displayName }) => {
    const onChangeHandle = () => {
        console.log('Hey');
    };
    return (
        <div className="textEditModuleContainer container-fluid">
            <div className="row">
                <div className="col-12">
                    <label htmlFor="aboutInfo"><h5>{displayName}</h5></label>
                </div>
                <div className="col-12">
                    <CustomTextBox />
                </div>
                <div className="col-5">
                    <CustomButton text={`Update ${displayName}`} />
                </div>
            </div>



        </div>
    );
}

export default TextEditModule;