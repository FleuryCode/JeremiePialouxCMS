import React from "react";
import './textEditModule.styles.scss';
import CustomButton from "../customButton/customButton.component";
import CustomTextBox from "../customTextBox/customTextBox.component";
// Redux
import { setTextData } from "../../redux/text/text.actions";
import { connect } from "react-redux";
// Firebase
import { db } from "../../firebase/firebase.utils";
import { doc, updateDoc } from "firebase/firestore";

const TextEditModule = ({ id, name, value, placeholder, displayName, onChangeHandle, setTextData, textData, specificClass }) => {
    const handleUpdateClick = async () => {
        const textRef = doc(db, 'Text', 'textData');
        await updateDoc(textRef, {
            [name]: value
        });
        textData[name] = value;
        setTextData(textData);
        
    };
    return (
        <div className={`textEditModuleContainer container-fluid`}>
            <div className="row">
                <div className="col-12">
                    <label htmlFor="aboutInfo"><h5>{displayName}</h5></label>
                </div>
                <div className="col-12">
                    <CustomTextBox className="infoTextBox" id={id} name={name} value={value} placeholder={placeholder} onChange={onChangeHandle} specificClass={specificClass} />
                </div>
                <div className="col-5">
                    <CustomButton handleClick={handleUpdateClick} text={`Update ${displayName}`} />
                </div>
            </div>



        </div>
    );
}

const mapStateToProps = (state) => ({
    textData: state.text.textData
});

const mapDispatchToProps = (dispatch) => ({
    setTextData: textInfo => dispatch(setTextData(textInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(TextEditModule);