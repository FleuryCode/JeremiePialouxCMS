import React, { useEffect, useState } from "react";
import CustomInput from "../customInput/customInput.component";
import './individualImage.styles.scss';

const IndividualImage = ({ data, index }) => {
    // console.log(data.images[index]);
    const pickedImage = data.images[index];

    const [title, setTitle] = useState('');
    useEffect(() => {
        setTitle(pickedImage.title);
    }, [pickedImage]);

    // On Change
    const onInputChange = (event) => {
        const { value, name } = event.target;
        if (name === 'title') {
            setTitle(value);
        } //Make this a switch
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
                </div>


            </div>
        </div>
    );
}

export default IndividualImage;