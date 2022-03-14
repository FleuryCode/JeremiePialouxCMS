import React from "react";
import './addImageButton.styles.scss';
import PlusIcon from '../../assets/plusSignIcon.svg';

const AddImageButton = () => {
    return (
        <div className="addImageButtonContainer">
            <img src={PlusIcon} alt="Add image button" />
        </div>
    );
}

export default AddImageButton;