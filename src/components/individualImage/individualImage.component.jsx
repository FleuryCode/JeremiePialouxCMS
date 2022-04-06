import React, { useEffect, useState } from "react";
import './individualImage.styles.scss';
import CustomInput from "../customInput/customInput.component";
import CustomTextBox from "../customTextBox/customTextBox.component";
import CustomButton from '../customButton/customButton.component'
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg';
// Firebase
import { doc, updateDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import { db, storage } from '../../firebase/firebase.utils';
// Redux
import { connect } from "react-redux";
import { setPortfolioData } from "../../redux/portfolio/portfolio.actions";
import { uploadBytes } from "firebase/storage";

const IndividualImage = ({ data, index, setPortfolioData, deleteClick, isDeleting }) => {

    const pickedImage = data[index];

    const [title, setTitle] = useState(pickedImage.title);
    const [description, setDescription] = useState(pickedImage.description);
    const [creationDate, setCreationDate] = useState(pickedImage.creationDate);
    const [height, setHeight] = useState(pickedImage.realHeight);
    const [width, setWidth] = useState(pickedImage.realWidth);
    const [technique, setTechnique] = useState(pickedImage.technique);
    const [updating, setUpdating] = useState(false);
    const [addingImages, setAddingImages] = useState(false);

    useEffect(() => {
        setTitle(pickedImage.title);
        setDescription(pickedImage.description);
        setCreationDate(pickedImage.creationDate);
        setHeight(pickedImage.realHeight);
        setWidth(pickedImage.realWidth);
        setTechnique(pickedImage.technique);
    }, [index])

    // On Change
    const onInputChange = (event) => {
        event.preventDefault();
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
        const dbRef = doc(db, 'Portfolio', `${pickedImage.imageName}`);
        setUpdating(true);
        await updateDoc(dbRef, {
            title: title,
            description: description,
            creationDate: creationDate,
            realHeight: height,
            realWidth: width,
            technique: technique,
            link: title.replace(/\.[^/.]+$/, "").toLowerCase().replace(/ /g, '')
        });

        data[index].title = title;
        data[index].description = description;
        data[index].creationDate = creationDate;
        data[index].realHeight = height;
        data[index].realWidth = width;
        data[index].technique = technique;
        data[index].link = title.replace(/\.[^/.]+$/, "").toLowerCase().replace(/ /g, '');
        setPortfolioData(data);
        setUpdating(false);
    };

    // Adding Extra Images
    const hiddenFileRef = React.useRef(null);

    const addExtraImagesClick = () => {
        hiddenFileRef.current.click();
    };

    const multiExtraAdd = async (event) => {
        setAddingImages(true);
        const docRef = doc(db, 'Portfolio', `${pickedImage.imageName}`);
        if (event.target.files && event.target.files[0]) {
            const fileArray = event.target.files;

            for (let i = 0; i < fileArray.length; i++) {
                const metadata = {
                    contentType: fileArray[i].type
                };
                const storageRef = ref(storage, `Portfolio/${fileArray[i].name}`);
                await uploadBytes(storageRef, fileArray[i], metadata)
                .then(async(snapshot) => {
                    let updatedArray = pickedImage.otherImages;
                    updatedArray.push(`${fileArray[i].name}`);
                    await updateDoc(docRef, {
                        otherImages: updatedArray
                    });

                })
                .catch((error) => {
                    console.log(error)
                });
                
            };
            // After Loop
            setAddingImages(false);
            console.log('Finished Adding Images', pickedImage.otherImages);
        };
    };


    return (
        <div className="individualImageContainer">
            <div className="heroImageContainer">
                <img className="mb-3" src={pickedImage.src} alt="" />
                <input
                onChange={multiExtraAdd}
                type="file"
                id="addExtraImages"
                accept="image/*"
                multiple="multiple"
                style={{display: 'none'}}
                ref={hiddenFileRef}
                />
                <CustomButton handleClick={addExtraImagesClick} text={'Ajouter Images'} />
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
                        <div onClick={() => deleteClick(data, index)} className="deleteButtonContainer me-auto ms-5">
                            {
                                isDeleting ?
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    :
                                    <DeleteIcon />
                            }

                        </div>
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

const mapDispatchToProps = (dispatch) => ({
    setPortfolioData: data => dispatch(setPortfolioData(data))
});

export default connect(null, mapDispatchToProps)(IndividualImage);