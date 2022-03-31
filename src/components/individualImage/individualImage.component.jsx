import React, { useEffect, useState } from "react";
import CustomInput from "../customInput/customInput.component";
import CustomTextBox from "../customTextBox/customTextBox.component";
import './individualImage.styles.scss';

const IndividualImage = ({ data, index }) => {
    // console.log(data.images[index]);
    const pickedImage = data.images[index];

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
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
                    <CustomInput id={'title'} type={'text'} name={'title'} value={title} onChange={onInputChange} />
                    <CustomTextBox id={'description'} name={'description'} value={description} onChange={onInputChange} />
                </div>


            </div>
        </div>
    );
}

export default IndividualImage;