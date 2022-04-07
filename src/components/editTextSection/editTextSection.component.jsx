import React, { useState } from "react";
import './editTextSection.styles.scss';
// Redux
import { connect } from "react-redux";
import TextEditModule from "../textEditModule/textEditModule.component";


const EditTextSection = (textData) => {
    const mainTextData = textData.textData;
    // const textKeys = Object.keys(mainTextData);
    // console.log(textKeys);
    const [aboutInfo, setAboutInfo] = useState('This Information Needs To Be Updated');

    // Handling Text Box Change
    const onChangeHandle = (event) => {
        event.preventDefault();
        const { value, name } = event.target;
        switch (name) {
            case 'aboutInfo':
                setAboutInfo(value);
                break;

            default:
                break;
        }
    }
    return (
        <div className="editTextSectionContainer">
            <h1>Edit Text Section</h1>
            <TextEditModule id={'aboutInfo'} name={'aboutInfo'} value={aboutInfo} placeholder={'About Information'} displayName={'About Info'} onChangeHandle={onChangeHandle} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    textData: state.text.textData
});

export default connect(mapStateToProps)(EditTextSection);