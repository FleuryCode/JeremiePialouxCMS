import React, { useEffect, useState } from "react";
import CustomInput from "../customInput/customInput.component";
import CustomTextBox from "../customTextBox/customTextBox.component";
import './individualImage.styles.scss';

const IndividualImage = ({ data, index }) => {
    // console.log(data.images[index]);
    const pickedImage = data.images[index];

    // Add placeholders! Do Use Effect. Change metadata.
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [creationDate, setCreationDate] = useState('Fevrier 2022');
    const [height, setHeight] = useState('100 cm');
    const [width, setWidth] = useState('50 cm');

    useEffect(() => {
        setTitle(pickedImage.title);
        setDescription(pickedImage.description);
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
            default:
                break;
        }
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
                    <CustomInput id={'creationDate'} type={'text'} name={'creationDate'} value={creationDate} onChange={onInputChange} />
                    <div className="dimensionContainer">
                        <div className="heightBox">
                            <label className="inputLabel" htmlFor="height">Hauteur</label>
                            <CustomInput id={'height'} type={'text'} name={'height'} value={height} onChange={onInputChange} />
                        </div>
                        <div className="widthBox ms-auto">
                            <label className="inputLabel" htmlFor="height">Largeur</label>
                            <CustomInput id={'width'} type={'text'} name={'width'} value={width} onChange={onInputChange} />
                        </div>
                    </div>
                    <label className="inputLabel" htmlFor="description">Description</label>
                    <CustomTextBox id={'description'} name={'description'} value={description} onChange={onInputChange} />
                </div>


            </div>
        </div>
    );
}

export default IndividualImage;