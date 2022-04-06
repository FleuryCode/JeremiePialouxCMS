import React from "react";
import './editTextSection.styles.scss';
// Redux
import { connect } from "react-redux";
import TextEditModule from "../textEditModule/textEditModule.component";


const EditTextSection = (textData) => {
    const mainTextData = textData.textData;
    // const textKeys = Object.keys(mainTextData);
    // console.log(textKeys);
    return(
        <div className="editTextSectionContainer">
            <h1>Edit Text Section</h1>
            <TextEditModule displayName={'About Info'} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    textData: state.text.textData
});

export default connect(mapStateToProps)(EditTextSection);