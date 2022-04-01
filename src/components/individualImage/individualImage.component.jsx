import React, { useEffect, useState } from "react";
import CustomInput from "../customInput/customInput.component";
import CustomTextBox from "../customTextBox/customTextBox.component";
import './individualImage.styles.scss';
// Firebase
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase.utils';

const IndividualImage = ({ data, index }) => {
    // console.log(data.images[index]);
    const pickedImage = data.images[index];

    // Add placeholders! Do Use Effect. Change metadata.
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [technique, setTechnique] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        setTitle(pickedImage.title);
        setDescription(pickedImage.description);
        setCreationDate(pickedImage.creationDate);
        setHeight(pickedImage.realHeight);
        setWidth(pickedImage.realWidth);
        setTechnique(pickedImage.technique);
    }, [pickedImage]);

    // On Change
    const onInputChange = (event) => {
        const { value, name } = event.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'creationDate':
                setCreationDate(value);
                break;
            case 'height':
                setHeight(value);
                break;
            case 'width':
                setWidth(value);
                break;
            case 'technique':
                setTechnique(value);
                break;
            default:
                break;
        }
    };

    // Save Button
    const saveButtonHandle = async () => {
        const dbRef = doc(db, 'Portfolio', 'MainPortfolio');
        setUpdating(true);
        let updatedData = data;
        updatedData.images[index] = {
            id: data.images[index].id,
            key: data.images[index].key,
            height: data.images[index].height,
            width: data.images[index].width,
            link: data.images[index].link,
            imageName: data.images[index].imageName,
            otherImages: data.images[index].otherImages,
            title: title,
            description: description,
            creationDate: creationDate,
            realHeight: height,
            realWidth: width,
            technique: technique
        }
        await updateDoc(dbRef, updatedData);
        setUpdating(false);
    }
    return (
        <div className="individualImageContainer">
            <div className="heroImageContainer">
                <img src={pickedImage.src} alt="" />
            </div>
            <div className="individualImageInfoContainer">
                <h4>{title}</h4>
                <div className="individualImageInput">
                    <label className="inputLabel" htmlFor="title">Titre</label>
                    <CustomInput id={'title'} type={'text'} name={'title'} value={title} onChange={onInputChange} />
                    <label className="inputLabel" htmlFor="creationDate">Date de Creation</label>
                    <CustomInput id={'creationDate'} type={'text'} name={'creationDate'} value={creationDate} onChange={onInputChange} placeholder={'Fevrier 2022'} />
                    <div className="dimensionContainer">
                        <div className="heightBox">
                            <label className="inputLabel" htmlFor="height">Hauteur</label>
                            <CustomInput id={'height'} type={'text'} name={'height'} value={height} onChange={onInputChange} placeholder={'100 cm'} />
                        </div>
                        <div className="widthBox ms-auto">
                            <label className="inputLabel" htmlFor="height">Largeur</label>
                            <CustomInput id={'width'} type={'text'} name={'width'} value={width} onChange={onInputChange} placeholder={'50 cm'} />
                        </div>
                    </div>
                    <label className="inputLabel" htmlFor="technique">Technique</label>
                    <CustomTextBox id={'technique'} name={'technique'} value={technique} onChange={onInputChange} placeholder={'Technique'} />
                    <label className="inputLabel" htmlFor="description">Description</label>
                    <CustomTextBox id={'description'} name={'description'} value={description} onChange={onInputChange} placeholder={'Description'} />
                    <div className="dataSaveButton">
                        <div className={`${updating ? 'd-flex' : 'd-none'} spinner-border`} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <h5 onClick={saveButtonHandle}>Sauvegarder</h5>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default IndividualImage;