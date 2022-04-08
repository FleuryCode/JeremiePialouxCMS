import React, { useEffect, useState } from "react";
import './editTextSection.styles.scss';
// Redux
import { connect } from "react-redux";
import TextEditModule from "../textEditModule/textEditModule.component";


const EditTextSection = ({ textData }) => {

    const [aboutInfo, setAboutInfo] = useState('This Information Needs To Be Updated');
    const [homeInfo, setHomeInfo] = useState('This Information Needs To Be Updated Too');

    // Handling Text Box Change
    const onChangeHandle = (event) => {
        event.preventDefault();
        const { value, name } = event.target;
        switch (name) {
            case 'aboutInfo':
                setAboutInfo(value);
                break;
            case 'homeInfo':
                setHomeInfo(value);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setAboutInfo(textData.aboutInfo);
        setHomeInfo(textData.homeInfo);
    }, []);

    return (
        <div className="editTextSectionContainer">
            <h1 className="mb-3">Edit Text Section</h1>
            <div className="moduleContainer mb-5">
                <TextEditModule id={'aboutInfo'} name={'aboutInfo'} value={aboutInfo} placeholder={'About Information'} displayName={'About Info'} onChangeHandle={onChangeHandle} />
            </div>
            <div className="moduleContainer mb-5">
                <TextEditModule id={'homeInfo'} name={'homeInfo'} value={homeInfo} placeholder={'Home Information'} displayName={'Home Info'} onChangeHandle={onChangeHandle} />
            </div>

        </div>
    );
}

const mapStateToProps = (state) => ({
    textData: state.text.textData
});

export default connect(mapStateToProps)(EditTextSection);