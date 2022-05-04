import React, { useEffect, useState } from "react";
import './editTextSection.styles.scss';
// Redux
import { connect } from "react-redux";
import TextEditModule from "../textEditModule/textEditModule.component";


const EditTextSection = ({ textData }) => {
    // LangClick
    const [language, setLanguage] = useState('FR');

    const [homeInfo, setHomeInfo] = useState(textData.homeInfo);
    const [homeInfoEn, setHomeInfoEn] = useState(textData.homeInfoEn);
    const [peinture, setPeinture] = useState(textData.peinture);
    const [peintureEn, setPeintureEn] = useState(textData.peintureEn);
    const [abstrait, setAbstrait] = useState(textData.abstrait);
    const [abstraitEn, setAbstraitEn] = useState(textData.abstraitEn);
    const [matiere, setMatiere] = useState(textData.matiere);
    const [matiereEn, setMatiereEn] = useState(textData.matiereEn);
    const [lumiere, setLumiere] = useState(textData.lumiere);
    const [lumiereEn, setLumiereEn] = useState(textData.lumiereEn);

    // Handling Text Box Change
    const onChangeHandle = (event) => {
        event.preventDefault();
        const { value, name } = event.target;
        switch (name) {
            case 'homeInfo':
                setHomeInfo(value);
                break;
            case 'homeInfoEn':
                setHomeInfoEn(value);
                break;
            case 'peinture':
                setPeinture(value);
                break;
            case 'peintureEn':
                setPeintureEn(value);
                break;
            case 'abstrait':
                setAbstrait(value);
                break;
            case 'abstraitEn':
                setAbstraitEn(value);
                break;
            case 'matiere':
                setMatiere(value);
                break;
            case 'matiereEn':
                setMatiereEn(value);
                break;
            case 'lumiere':
                setLumiere(value);
                break;
            case 'lumiereEn':
                setLumiereEn(value);
                break;
            default:
                break;
        }
    }

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
                        <div className="editSectionDivider my-5">
                            <h2>Section Home</h2>
                        </div>
                        <div className="moduleContainer mb-5">
                            <TextEditModule id={'homeInfo'} name={'homeInfo'} value={homeInfo} placeholder={'Information Homepage'} displayName={'Info Homepage'} onChangeHandle={onChangeHandle} />
                        </div>
                        <div className="editSectionDivider my-5">
                            <h2>Section Bio</h2>
                        </div>
                        <div className="moduleContainer mb-5">
                            <TextEditModule id={'peinture'} name={'peinture'} value={peinture} placeholder={'Information peinture'} displayName={'Info Peinture'} onChangeHandle={onChangeHandle} />
                        </div>
                        <div className="moduleContainer mb-5">
                            <TextEditModule id={'abstrait'} name={'abstrait'} value={abstrait} placeholder={'Information de abstrait'} displayName={'Info Abstrait'} onChangeHandle={onChangeHandle} />
                        </div>
                        <div className="moduleContainer mb-5">
                            <TextEditModule id={'matiere'} name={'matiere'} value={matiere} placeholder={'Information de matiere'} displayName={'Info Matiere'} onChangeHandle={onChangeHandle} />
                        </div>
                        <div className="moduleContainer mb-5">
                            <TextEditModule id={'lumiere'} name={'lumiere'} value={lumiere} placeholder={'Information de lumiere'} displayName={'Info Lumiere'} onChangeHandle={onChangeHandle} />
                        </div>
                    </div>

                    :
                    <div>
                        <div className="editSectionDivider my-5">
                            <h2>Home Section</h2>
                        </div>
                        <div className="moduleContainer mb-5">
                            <TextEditModule id={'homeInfoEn'} name={'homeInfoEn'} value={homeInfoEn} placeholder={'Homepage Information'} displayName={'Homepage Info'} onChangeHandle={onChangeHandle} />
                        </div>
                        <div className="editSectionDivider my-5">
                            <h2>About Section</h2>
                        </div>
                        <div className="moduleContainer mb-5">
                            <TextEditModule id={'peintureEn'} name={'peintureEn'} value={peintureEn} placeholder={'Painting Information'} displayName={'Painting Info'} onChangeHandle={onChangeHandle} />
                        </div>
                        <div className="moduleContainer mb-5">
                            <TextEditModule id={'abstraitEn'} name={'abstraitEn'} value={abstraitEn} placeholder={'Abstract Information'} displayName={'Abstract Info'} onChangeHandle={onChangeHandle} />
                        </div>
                        <div className="moduleContainer mb-5">
                            <TextEditModule id={'matiereEn'} name={'matiereEn'} value={matiereEn} placeholder={'Material Information'} displayName={'Material Info'} onChangeHandle={onChangeHandle} />
                        </div>
                        <div className="moduleContainer mb-5">
                            <TextEditModule id={'lumiereEn'} name={'lumiereEn'} value={lumiereEn} placeholder={'Light and Color Information'} displayName={'Light & Color Info'} onChangeHandle={onChangeHandle} />
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