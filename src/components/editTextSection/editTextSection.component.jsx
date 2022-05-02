import React, { useEffect, useState } from "react";
import './editTextSection.styles.scss';
// Redux
import { connect } from "react-redux";
import TextEditModule from "../textEditModule/textEditModule.component";


const EditTextSection = ({ textData }) => {
    // LangClick
    const [language, setLanguage] = useState('FR');

    const [aboutInfo, setAboutInfo] = useState(textData.aboutInfo);
    const [homeInfo, setHomeInfo] = useState(textData.homeInfo);
    const [aboutInfoEn, setAboutInfoEn] = useState(textData.aboutInfoEn);
    const [homeInfoEn, setHomeInfoEn] = useState(textData.homeInfoEn);

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
            case 'aboutInfoEn':
                setAboutInfoEn(value);
                break;
            case 'homeInfoEn':
                setHomeInfoEn(value);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setAboutInfo(textData.aboutInfo);
        setHomeInfo(textData.homeInfo);
    }, []);

    const onLangClick = (lang) => {
        setLanguage(lang);
    }

    return (
        <div className="editTextSectionContainer">
            <div className="headerSection">
                <h1 className="mb-3">Section d'Éditer</h1>
                <div className="langSwitch">
                    <h6 onClick={() => onLangClick('FR')} className={`${(language === 'FR') ? 'activeLang' : ''} frLang`}>FR</h6>
                    <div className="">-</div>
                    <h6 onClick={() => onLangClick('EN')} className={`${(language === 'EN') ? 'activeLang' : ''} enLang`}>EN</h6>
                </div>
            </div>
            <div>

            </div>
            {
                (language === 'FR') ?
                    <div>
                        <div className="moduleContainer mb-5">
                            <TextEditModule id={'aboutInfo'} name={'aboutInfo'} value={aboutInfo} placeholder={'Information de Bio'} displayName={'Info Bio'} onChangeHandle={onChangeHandle} />
                        </div>
                        <div className="moduleContainer mb-5">
                            <TextEditModule id={'homeInfo'} name={'homeInfo'} value={homeInfo} placeholder={'Information de Home'} displayName={'Info Home'} onChangeHandle={onChangeHandle} />
                        </div>
                    </div>

                    :
                    <div>
                        <div className="moduleContainer mb-5">
                            <TextEditModule id={'aboutInfoEn'} name={'aboutInfoEn'} value={aboutInfoEn} placeholder={'About Information'} displayName={'About Info'} onChangeHandle={onChangeHandle} />
                        </div>
                        <div className="moduleContainer mb-5">
                            <TextEditModule id={'homeInfoEn'} name={'homeInfoEn'} value={homeInfoEn} placeholder={'Home Information'} displayName={'Home Info'} onChangeHandle={onChangeHandle} />
                        </div>
                    </div>

            }


        </div>
    );
}

const mapStateToProps = (state) => ({
    textData: state.text.textData
});

export default connect(mapStateToProps)(EditTextSection);